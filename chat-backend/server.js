import express from 'express';
import { WebSocketServer } from 'ws';
import { OpenAI } from 'openai';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { MongoClient } from 'mongodb';
import dns from 'dns';
import { createHash, pbkdf2Sync, randomBytes, timingSafeEqual } from 'crypto';

dotenv.config();

if (process.env.DNS_SERVERS) {
  dns.setServers(
    process.env.DNS_SERVERS.split(',')
      .map((server) => server.trim())
      .filter(Boolean)
  );
}

const app = express();
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://localhost:8080')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'));
    },
  })
);
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const db = client.db(process.env.MONGODB_DB || 'aaaamericancpa-chat');
const messagesCol = db.collection('messages');
const adminUsersCol = db.collection('adminUsers');
const adminSessionsCol = db.collection('adminSessions');
await messagesCol.createIndex({ visitorId: 1, timestamp: 1 });
await adminUsersCol.createIndex({ username: 1 }, { unique: true });
await adminSessionsCol.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const SESSION_TTL_MS = 24 * 60 * 60 * 1000;
const AUTH_ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
const MAX_AUTH_ATTEMPTS = 8;
const authAttempts = new Map();

function getClientIp(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
}

function rateLimitAuth(req, res, next) {
  const ip = getClientIp(req);
  const now = Date.now();
  const current = authAttempts.get(ip) || { count: 0, resetAt: now + AUTH_ATTEMPT_WINDOW_MS };

  if (current.resetAt <= now) {
    current.count = 0;
    current.resetAt = now + AUTH_ATTEMPT_WINDOW_MS;
  }

  current.count += 1;
  authAttempts.set(ip, current);

  if (current.count > MAX_AUTH_ATTEMPTS) {
    return res.status(429).json({ success: false, error: 'Too many login attempts. Try again later.' });
  }

  next();
}

function resetAuthAttempts(req) {
  authAttempts.delete(getClientIp(req));
}

function isNonEmptyString(value, maxLength = 5000) {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength;
}

function isValidVisitorId(visitorId) {
  return typeof visitorId === 'string' && /^visitor_[a-zA-Z0-9_-]{8,80}$/.test(visitorId);
}

function normalizeVisitorInfo(info) {
  if (!info || typeof info !== 'object') return null;

  return {
    fullName: isNonEmptyString(info.fullName, 120) ? info.fullName.trim() : '',
    email: isNonEmptyString(info.email, 254) ? info.email.trim() : '',
    contactNumber: isNonEmptyString(info.contactNumber, 40) ? info.contactNumber.trim() : '',
    inquiry: isNonEmptyString(info.inquiry, 1000) ? info.inquiry.trim() : '',
  };
}

function validateChatMessage({ visitorId, message }) {
  if (!isValidVisitorId(visitorId)) {
    return 'Invalid visitor id';
  }

  if (!isNonEmptyString(message, 2000)) {
    return 'Message must be between 1 and 2000 characters';
  }

  return null;
}

function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  const hash = pbkdf2Sync(password, salt, 120000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

function verifyPassword(password, passwordHash, salt) {
  const attemptedHash = hashPassword(password, salt).hash;
  return timingSafeEqual(Buffer.from(attemptedHash, 'hex'), Buffer.from(passwordHash, 'hex'));
}

function hashToken(token) {
  return createHash('sha256').update(token).digest('hex');
}

function getBearerToken(req) {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');
  return scheme === 'Bearer' ? token : null;
}

async function createAdminSession(username) {
  const token = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await adminSessionsCol.insertOne({
    tokenHash: hashToken(token),
    username,
    expiresAt,
    createdAt: new Date(),
  });

  return { token, expiresAt };
}

async function getAdminSession(token) {
  if (!token) return null;

  return adminSessionsCol.findOne({
    tokenHash: hashToken(token),
    expiresAt: { $gt: new Date() },
  });
}

async function requireAdmin(req, res, next) {
  const session = await getAdminSession(getBearerToken(req));

  if (!session) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  req.admin = session;
  next();
}

// Store active admin connection
let adminSocket = null;
// Store all visitor connections
const visitorSockets = new Map();

// Store visitor information
const visitorInfo = {};

app.get('/api/admin/status', async (req, res) => {
  const hasAdmin = (await adminUsersCol.countDocuments({ username: 'admin' })) > 0;
  res.json({ hasAdmin });
});

app.post('/api/admin/setup', rateLimitAuth, async (req, res) => {
  const { password } = req.body;

  if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
    return res.status(400).json({ success: false, error: 'Password must be at least 8 characters' });
  }

  const hasAdmin = (await adminUsersCol.countDocuments({ username: 'admin' })) > 0;
  if (hasAdmin) {
    return res.status(409).json({ success: false, error: 'Admin user already exists' });
  }

  const { salt, hash } = hashPassword(password);
  await adminUsersCol.insertOne({
    username: 'admin',
    passwordHash: hash,
    salt,
    createdAt: new Date(),
  });

  const session = await createAdminSession('admin');
  resetAuthAttempts(req);
  res.json({ success: true, token: session.token, expiresAt: session.expiresAt });
});

app.post('/api/admin/login', rateLimitAuth, async (req, res) => {
  const { password } = req.body;
  const admin = await adminUsersCol.findOne({ username: 'admin' });

  if (!admin || !password || !verifyPassword(password, admin.passwordHash, admin.salt)) {
    return res.status(401).json({ success: false, error: 'Invalid password' });
  }

  const session = await createAdminSession('admin');
  resetAuthAttempts(req);
  res.json({ success: true, token: session.token, expiresAt: session.expiresAt });
});

app.get('/api/admin/verify', requireAdmin, async (req, res) => {
  res.json({ success: true });
});

app.post('/api/admin/logout', requireAdmin, async (req, res) => {
  await adminSessionsCol.deleteOne({ _id: req.admin._id });
  res.json({ success: true });
});

// REST endpoint to get or store messages
app.post('/api/messages', async (req, res) => {
  const { visitorId, message, sender, visitorInfo: info } = req.body;

  if (sender !== 'visitor') {
    return res.status(400).json({ success: false, error: 'Only visitor messages can be posted here' });
  }

  const validationError = validateChatMessage({ visitorId, message });
  if (validationError) {
    return res.status(400).json({ success: false, error: validationError });
  }

  const safeVisitorInfo = normalizeVisitorInfo(info);

  await messagesCol.insertOne({
    visitorId,
    sender,
    message: message.trim(),
    timestamp: new Date(),
    read: sender !== 'visitor',
    visitorInfo: safeVisitorInfo || visitorInfo[visitorId] || null,
  });

  res.json({ success: true });
});

app.get('/api/messages/:visitorId', async (req, res) => {
  const { visitorId } = req.params;
  if (!isValidVisitorId(visitorId)) {
    return res.status(400).json({ success: false, error: 'Invalid visitor id' });
  }

  const history = await messagesCol
    .find({ visitorId })
    .sort({ timestamp: 1 })
    .toArray();

  res.json(history || []);
});

app.get('/api/admin/messages/:visitorId', requireAdmin, async (req, res) => {
  const { visitorId } = req.params;
  if (!isValidVisitorId(visitorId)) {
    return res.status(400).json({ success: false, error: 'Invalid visitor id' });
  }

  const history = await messagesCol
    .find({ visitorId })
    .sort({ timestamp: 1 })
    .toArray();

  res.json(history || []);
});

// Get all conversations for admin
app.get('/api/conversations', requireAdmin, async (req, res) => {
  const conversations = await messagesCol
    .aggregate([
      { $sort: { visitorId: 1, timestamp: -1 } },
      {
        $group: {
          _id: '$visitorId',
          lastMessage: { $first: '$message' },
          timestamp: { $first: '$timestamp' },
          visitorInfo: { $first: '$visitorInfo' },
          unread: {
            $sum: {
              $cond: [
                { $and: [{ $eq: ['$sender', 'visitor'] }, { $eq: ['$read', false] }] },
                1,
                0,
              ],
            },
          },
          messageCount: { $sum: 1 },
        },
      },
      { $sort: { timestamp: -1 } },
    ])
    .toArray();

  res.json(
    conversations.map((conv) => ({
      id: conv._id,
      lastMessage: conv.lastMessage,
      timestamp: conv.timestamp,
      unread: conv.unread,
      visitorInfo: conv.visitorInfo,
      messageCount: conv.messageCount,
    }))
  );
});

// Mark messages as read for a visitor
app.post('/api/mark-read/:visitorId', requireAdmin, async (req, res) => {
  const { visitorId } = req.params;
  if (!isValidVisitorId(visitorId)) {
    return res.status(400).json({ success: false, error: 'Invalid visitor id' });
  }

  await messagesCol.updateMany(
    { visitorId, sender: 'visitor' },
    { $set: { read: true } }
  );

  res.json({ success: true });
});

// Endpoint to store visitor information
app.post('/api/visitor-info', (req, res) => {
  const { visitorId, visitorInfo: info } = req.body;
  if (!isValidVisitorId(visitorId)) {
    return res.status(400).json({ success: false, error: 'Invalid visitor id' });
  }

  const safeVisitorInfo = normalizeVisitorInfo(info);
  if (!safeVisitorInfo?.fullName || !safeVisitorInfo.email || !safeVisitorInfo.contactNumber || !safeVisitorInfo.inquiry) {
    return res.status(400).json({ success: false, error: 'Visitor information is incomplete' });
  }

  visitorInfo[visitorId] = safeVisitorInfo;
  console.log(`Visitor info stored for ${visitorId}:`, safeVisitorInfo);
  res.json({ success: true });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', adminOnline: adminSocket !== null });
});

// Create HTTP server
const server = http.createServer(app);

// WebSocket server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  ws.on('message', async (data) => {
    try {
      const parsed = JSON.parse(data);

      if (parsed.type === 'admin_login') {
        const session = await getAdminSession(parsed.token);
        if (!session) {
          ws.send(JSON.stringify({ type: 'admin_login_failed' }));
          return;
        }

        adminSocket = ws;
        ws.isAdmin = true;
        console.log('Admin connected');
        ws.send(JSON.stringify({ type: 'admin_logged_in' }));
      } else if (parsed.type === 'visitor_message') {
        const { visitorId, message, visitorInfo: vInfo } = parsed;
        const validationError = validateChatMessage({ visitorId, message });
        if (validationError) {
          ws.send(JSON.stringify({ type: 'error', error: validationError }));
          return;
        }

        const safeVisitorInfo = normalizeVisitorInfo(vInfo);

        console.log(`Message from visitor ${visitorId}: ${message}`);

        // Store message in backend
        await messagesCol.insertOne({
          visitorId,
          sender: 'visitor',
          message: message.trim(),
          timestamp: new Date(),
          read: false, // Mark as unread initially
          visitorInfo: safeVisitorInfo || visitorInfo[visitorId] || null,
        });

        // If admin is online, send to admin with visitor info
        if (adminSocket && adminSocket.readyState === 1) {
          // 1 = OPEN
          adminSocket.send(
            JSON.stringify({
              type: 'new_visitor_message',
              visitorId,
              message: message.trim(),
              timestamp: new Date().toISOString(),
              visitorInfo: safeVisitorInfo || visitorInfo[visitorId],
            })
          );
        } else {
          // Admin offline - use chatbot
          console.log(`Admin offline, using chatbot for visitor ${visitorId}`);
          const botReply = await getChatbotReply(message);

          await messagesCol.insertOne({
            visitorId,
            sender: 'bot',
            message: botReply,
            timestamp: new Date(),
            read: true, // Bot messages are always "read"
            visitorInfo: visitorInfo[visitorId] || safeVisitorInfo || null,
          });

          // Send bot reply to visitor
          if (visitorSockets.has(visitorId)) {
            const visitorWs = visitorSockets.get(visitorId);
            if (visitorWs.readyState === 1) {
              visitorWs.send(
                JSON.stringify({
                  type: 'bot_message',
                  message: botReply,
                })
              );
            }
          }
        }
      } else if (parsed.type === 'admin_reply') {
        if (!ws.isAdmin) {
          ws.send(JSON.stringify({ type: 'admin_login_failed' }));
          return;
        }

        const { visitorId, message } = parsed;
        const validationError = validateChatMessage({ visitorId, message });
        if (validationError) {
          ws.send(JSON.stringify({ type: 'error', error: validationError }));
          return;
        }

        console.log(`Admin reply to visitor ${visitorId}: ${message}`);

        // Store admin message
        await messagesCol.insertOne({
          visitorId,
          sender: 'admin',
          message: message.trim(),
          timestamp: new Date(),
          read: true, // Admin messages are always "read"
          visitorInfo: visitorInfo[visitorId] || null,
        });

        // Send to visitor
        if (visitorSockets.has(visitorId)) {
          const visitorWs = visitorSockets.get(visitorId);
          if (visitorWs.readyState === 1) {
            visitorWs.send(
              JSON.stringify({
                  type: 'admin_message',
                  message: message.trim(),
                })
              );
          }
        }
      } else if (parsed.type === 'visitor_connect') {
        const { visitorId, visitorInfo: vInfo } = parsed;
        if (!isValidVisitorId(visitorId)) {
          ws.send(JSON.stringify({ type: 'error', error: 'Invalid visitor id' }));
          return;
        }

        visitorSockets.set(visitorId, ws);
        const safeVisitorInfo = normalizeVisitorInfo(vInfo);
        if (safeVisitorInfo) {
          visitorInfo[visitorId] = safeVisitorInfo;
        }
        console.log(`Visitor ${visitorId} connected`, safeVisitorInfo ? `with info: ${safeVisitorInfo.fullName || 'Anonymous'}` : '');
      }
    } catch (error) {
      console.error('WebSocket message error:', error);
    }
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');

    // Remove visitor from map
    for (let [visitorId, socket] of visitorSockets.entries()) {
      if (socket === ws) {
        visitorSockets.delete(visitorId);
        console.log(`Visitor ${visitorId} disconnected`);
        break;
      }
    }

    if (adminSocket === ws) {
      adminSocket = null;
      console.log('Admin disconnected');
    }
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

async function getChatbotReply(userMessage) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful customer support assistant. Keep responses concise and friendly. Provide helpful information about services, pricing, and how to get in touch.',
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
      max_tokens: 150,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('ChatGPT error:', error);
    return "I apologize, but I'm having trouble responding right now. An admin will get back to you shortly.";
  }
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket server running on ws://0.0.0.0:${PORT}`);
});
