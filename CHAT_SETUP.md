# Chat Feature Implementation Guide

## Quick Start

### Step 1: Get OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Create a new API key
4. Copy the key (keep it secret!)

### Step 2: Configure Backend
1. Open `chat-backend/.env`
2. Replace `sk-your-api-key-here` with your actual OpenAI API key:
   ```env
   OPENAI_API_KEY=sk-xxx...
   PORT=3001
   ```

### Step 3: Install Backend Dependencies
```bash
cd chat-backend
npm install
cd ..
```

### Step 4: Start the Backend Server
Open a terminal and run:
```bash
cd chat-backend
npm start
```

You should see:
```
Server running on port 3001
WebSocket server running on ws://localhost:3001
```

### Step 5: Start the Frontend (Keep the backend terminal open!)
Open a NEW terminal in the root directory and run:
```bash
npm run dev
```

### Step 6: Test the Chat
1. Visit `http://localhost:8080`
2. Click the chat button (bottom-right)
3. Send a test message
4. Since admin is offline, you'll get a chatbot response

### Step 7: Test Admin Panel
1. Open another browser tab/window
2. Visit `http://localhost:8080/admin-chat`
3. You'll see the conversation from Step 3
4. Send a reply from the admin panel
5. Go back to the first tab - you'll see the admin's message in real-time!

---

## File Structure

```
aaa/
├── src/
│   ├── components/
│   │   ├── ChatWidget.tsx          ← Floating chat button (NEW)
│   │   └── ... (other components)
│   ├── pages/
│   │   ├── AdminChat.tsx           ← Admin dashboard (NEW)
│   │   └── ... (other pages)
│   ├── App.tsx                     ← Updated with ChatWidget & AdminChat route
│   └── ... (other files)
├── chat-backend/                   ← NEW Backend server
│   ├── server.js                   ← Main server file
│   ├── package.json
│   ├── .env                        ← Your API keys (don't share!)
│   └── README.md
├── package.json
└── ... (other files)
```

---

## How It Works

### When Visitor Sends a Message:
1. Message goes to backend via WebSocket
2. Backend checks if admin is online
3. **If Admin Online**: Message sent to admin in real-time
4. **If Admin Offline**: OpenAI ChatGPT responds automatically

### When Admin Sends a Reply:
1. Admin types message in `/admin-chat`
2. Message sent via WebSocket to backend
3. Backend broadcasts to the specific visitor's browser
4. Visitor sees the reply in real-time

---

## Key Features

✅ **Real-time Messaging** - WebSocket connection  
✅ **Admin Dashboard** - Manage all conversations  
✅ **AI Chatbot Fallback** - OpenAI GPT-3.5-turbo  
✅ **Message History** - All messages stored  
✅ **Unique Visitors** - Tracked by localStorage ID  
✅ **Auto-reconnect** - Handles connection drops  

---

## Customization Tips

### Change Chat Button Position
In `src/components/ChatWidget.tsx`:
```tsx
className="fixed bottom-4 right-4 ..." // Change bottom-4 right-4 to position it elsewhere
```

### Change AI Chatbot Behavior
In `chat-backend/server.js`:
```javascript
{
  role: 'system',
  content: 'You are a helpful customer support assistant. Keep responses concise and friendly.'
  // ^ Change this to customize chatbot personality
}
```

### Change Chat Window Size
In `src/components/ChatWidget.tsx`:
```tsx
className="fixed bottom-20 right-4 w-96 max-h-96 ..." // w-96 = width, max-h-96 = height
```

---

## Troubleshooting

### "WebSocket is closed"
- ✅ Make sure backend is running (`npm start` in chat-backend)
- ✅ Check terminal for errors
- ✅ Verify port 3001 is not in use

### No response from chatbot
- ✅ Check OpenAI API key in `.env` is correct
- ✅ Verify you have API credits (check OpenAI dashboard)
- ✅ Check browser console for errors (F12)

### Admin dashboard is blank
- ✅ Make sure backend is running
- ✅ Open `/admin-chat` while backend is running
- ✅ Send a test message from the chat widget first

### "CORS error"
- ✅ This is usually fixed if backend is running on port 3001
- ✅ Check `BACKEND_URL` in ChatWidget.tsx is `http://localhost:3001`

---

## Production Deployment

When deploying:

1. **Update URLs in ChatWidget.tsx and AdminChat.tsx**:
   ```tsx
   const BACKEND_URL = 'https://your-backend-domain.com';
   const WS_URL = 'wss://your-backend-domain.com'; // Note: wss not ws
   ```

2. **Deploy Backend** (Node.js server)
   - Can use: Heroku, Render, AWS, DigitalOcean, etc.
   - Set environment variables on hosting platform

3. **Deploy Frontend** (React app)
   - Run: `npm run build`
   - Deploy the `dist` folder to Netlify, Vercel, GitHub Pages, etc.

4. **Update CORS** in backend
   ```javascript
   app.use(cors({
     origin: 'https://your-frontend-domain.com'
   }));
   ```

---

## Next Steps

- Add database to persist messages beyond server restart
- Add authentication to admin panel (password protection)
- Add email notifications to admin for new messages
- Add typing indicators
- Support for file uploads
- Mobile app version

---

**Need help?** Check the logs in both terminals - they usually tell you what's wrong!
