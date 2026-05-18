import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LogOut, Lock } from 'lucide-react';

interface Visitor {
  id: string;
  lastMessage: string;
  unread: number;
  timestamp: string;
  visitorInfo?: {
    fullName: string;
    email: string;
    contactNumber: string;
    inquiry: string;
  };
}

interface ChatMessage {
  sender: 'visitor' | 'admin' | 'bot';
  message: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  lastMessage: string;
  unread: number;
  timestamp: string;
  visitorInfo?: Visitor['visitorInfo'];
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';


export function AdminChat() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(() => localStorage.getItem('adminToken'));
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [selectedVisitorId, setSelectedVisitorId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const selectedVisitorIdRef = useRef<string | null>(null);

  useEffect(() => {
    selectedVisitorIdRef.current = selectedVisitorId;
  }, [selectedVisitorId]);

  const getAuthHeaders = useCallback((token = adminToken) => ({
    Authorization: `Bearer ${token}`,
  }), [adminToken]);

  const handleLogout = useCallback(async () => {
    if (adminToken) {
      fetch(`${BACKEND_URL}/api/admin/logout`, {
        method: 'POST',
        headers: getAuthHeaders(adminToken),
      }).catch((error) => console.error('Error logging out:', error));
    }

    setIsAuthenticated(false);
    setAdminToken(null);
    localStorage.removeItem('adminToken');
    ws.current?.close();
    setVisitors([]);
    setSelectedVisitorId(null);
    setMessages([]);
  }, [adminToken, getAuthHeaders]);

  const loadAllConversations = useCallback(async () => {
    if (!adminToken) return;

    try {
      console.log('Loading all conversations...');
      const response = await fetch(`${BACKEND_URL}/api/conversations`, {
        headers: getAuthHeaders(),
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      const conversations = (await response.json()) as Conversation[];
      console.log('Loaded conversations:', conversations);

      setVisitors(conversations.map(conv => ({
        id: conv.id,
        lastMessage: conv.lastMessage,
        unread: conv.unread,
        timestamp: conv.timestamp,
        visitorInfo: conv.visitorInfo,
      })));
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  }, [adminToken, getAuthHeaders, handleLogout]);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const statusResponse = await fetch(`${BACKEND_URL}/api/admin/status`);
        const status = (await statusResponse.json()) as { hasAdmin: boolean };
        setHasAdmin(status.hasAdmin);

        if (!status.hasAdmin || !adminToken) return;

        const verifyResponse = await fetch(`${BACKEND_URL}/api/admin/verify`, {
          headers: getAuthHeaders(adminToken),
        });

        if (verifyResponse.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('adminToken');
          setAdminToken(null);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setLoginError('Unable to connect to admin service');
      }
    };

    checkAdminStatus();
  }, [adminToken, getAuthHeaders]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const endpoint = hasAdmin ? '/api/admin/login' : '/api/admin/setup';
      const response = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const result = (await response.json()) as { success: boolean; token?: string; error?: string };

      if (!response.ok || !result.token) {
        setLoginError(result.error || 'Invalid password');
        return;
      }

      localStorage.setItem('adminToken', result.token);
      setAdminToken(result.token);
      setHasAdmin(true);
      setIsAuthenticated(true);
      setLoginError('');
      setTimeout(() => loadAllConversations(), 100);
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError('Unable to connect to admin service');
    }
  };

  useEffect(() => {
    // Only connect to WebSocket when authenticated
    if (!isAuthenticated || !adminToken) return;

    let reconnectTimer: ReturnType<typeof setTimeout> | undefined;
    let shouldReconnect = true;

    const connectWS = () => {
      ws.current = new WebSocket(WS_URL);

      ws.current.onopen = () => {
        console.log('Admin connected');
        setIsConnected(true);
        ws.current?.send(
          JSON.stringify({
            type: 'admin_login',
            token: adminToken,
          })
        );

        // Load all existing conversations
        loadAllConversations();
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === 'new_visitor_message') {
          const { visitorId, message, timestamp, visitorInfo: vInfo } = data;
          const activeVisitorId = selectedVisitorIdRef.current;

          // Update or add visitor to list
          setVisitors(prev => {
            const existing = prev.findIndex(v => v.id === visitorId);
            const newVisitor = {
              id: visitorId,
              lastMessage: message,
              unread: activeVisitorId === visitorId ? 0 : 1,
              timestamp: timestamp,
              visitorInfo: vInfo,
            };

            if (existing > -1) {
              const updated = [...prev];
              updated[existing] = {
                ...updated[existing],
                lastMessage: message,
                unread: activeVisitorId === visitorId ? 0 : updated[existing].unread + 1,
                timestamp,
                visitorInfo: vInfo || updated[existing].visitorInfo,
              };
              return updated;
            }
            return [newVisitor, ...prev];
          });

          // If this visitor is selected, add message to chat
          if (activeVisitorId === visitorId) {
            setMessages(prev => [
              ...prev,
              {
                sender: 'visitor',
                message,
                timestamp,
              },
            ]);
          }
        } else if (data.type === 'admin_login_failed') {
          handleLogout();
        }
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      };

      ws.current.onclose = () => {
        if (!shouldReconnect) return;

        console.log('WebSocket disconnected');
        setIsConnected(false);
        reconnectTimer = setTimeout(connectWS, 3000);
      };
    };

    connectWS();

    return () => {
      shouldReconnect = false;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      ws.current?.close();
    };
  }, [isAuthenticated, adminToken, handleLogout, loadAllConversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const selectVisitor = async (visitorId: string) => {
    setSelectedVisitorId(visitorId);
    setMessages([]);

    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/messages/${visitorId}`, {
        headers: getAuthHeaders(),
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      const data = await response.json();
      setMessages(data);

      // Mark messages as read
      await fetch(`${BACKEND_URL}/api/mark-read/${visitorId}`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });

      // Mark as read locally
      setVisitors(prev =>
        prev.map(v =>
          v.id === visitorId ? { ...v, unread: 0 } : v
        )
      );
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !selectedVisitorId || !ws.current) return;

    const messageText = inputValue.trim();

    ws.current.send(
      JSON.stringify({
        type: 'admin_reply',
        visitorId: selectedVisitorId,
        message: messageText,
      })
    );

    setMessages(prev => [
      ...prev,
      {
        sender: 'admin',
        message: messageText,
        timestamp: new Date().toISOString(),
      },
    ]);

    setInputValue('');
  };

  // Login Form Component
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="text-center mb-6">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Access</h2>
            <p className="text-gray-600 mt-2">
              {hasAdmin === false ? 'Create the first admin password' : 'Enter the admin password to continue'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full"
                required
              />
            </div>

            {loginError && (
              <p className="text-red-600 text-sm text-center">{loginError}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {hasAdmin === false ? 'Create Admin Account' : 'Access Admin Panel'}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 mt-24">
      {/* Sidebar - Visitors List */}
      <div className="w-80 bg-white border-r border-gray-300 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-300 flex justify-between items-center">
          <div>
            <h2 className="font-bold text-lg">Conversations</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <p className="text-xs text-gray-600">
                {isConnected ? 'Connected' : 'Disconnected'}
              </p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} />
          </Button>
        </div>

        {/* Visitors List */}
        <div className="flex-1 overflow-y-auto">
          {visitors.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              No conversations yet
            </div>
          ) : (
            visitors.map(visitor => (
              <div
                key={visitor.id}
                onClick={() => selectVisitor(visitor.id)}
                className={`p-4 border-b border-gray-200 cursor-pointer transition-colors ${
                  selectedVisitorId === visitor.id
                    ? 'bg-blue-50 border-l-4 border-blue-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">
                      {visitor.visitorInfo?.fullName || visitor.id.replace('visitor_', 'V-')}
                    </p>
                    {visitor.visitorInfo?.email && (
                      <p className="text-xs text-gray-500 truncate">
                        {visitor.visitorInfo.email}
                      </p>
                    )}
                    <p className="text-xs text-gray-600 truncate mt-1">
                      {visitor.lastMessage}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(visitor.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  {visitor.unread > 0 && (
                    <Badge className="bg-red-500 text-white text-xs">
                      {visitor.unread}
                    </Badge>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      {selectedVisitorId ? (
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-50 to-white p-4 border-b border-gray-300">
            {(() => {
              const visitor = visitors.find(v => v.id === selectedVisitorId);
              return (
                <>
                  <h3 className="font-semibold text-lg">
                    {visitor?.visitorInfo?.fullName || selectedVisitorId.replace('visitor_', 'Visitor ')}
                  </h3>
                  {visitor?.visitorInfo && (
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>📧 {visitor.visitorInfo.email}</p>
                      <p>📱 {visitor.visitorInfo.contactNumber}</p>
                      <p>❓ {visitor.visitorInfo.inquiry}</p>
                    </div>
                  )}
                  {!visitor?.visitorInfo && (
                    <p className="text-sm text-gray-600">Active conversation</p>
                  )}
                </>
              );
            })()}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-sm">No messages yet</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-sm px-4 py-2 rounded-lg ${
                      msg.sender === 'admin'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : msg.sender === 'bot'
                        ? 'bg-yellow-50 text-gray-800 border border-yellow-300 rounded-bl-none'
                        : 'bg-white text-gray-800 border border-gray-300 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm break-words">{msg.message}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                      {msg.sender !== 'admin' &&
                        ` • ${msg.sender === 'bot' ? '🤖 AI' : '👤 Visitor'}`}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={sendReply}
            className="border-t border-gray-300 bg-white p-4 flex gap-2"
          >
            <Input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Type your reply..."
              className="flex-1"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6">
              Send
            </Button>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-500">
          <div className="text-center">
            <p className="text-lg font-medium">Select a conversation</p>
            <p className="text-sm mt-1">Choose a visitor to start chatting</p>
          </div>
        </div>
      )}
    </div>
  );
}
