import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: string;
  sender: 'visitor' | 'admin' | 'bot';
  message: string;
  timestamp: Date;
}

interface VisitorInfo {
  fullName: string;
  email: string;
  contactNumber: string;
  inquiry: string;
}

interface StoredMessage {
  sender: Message['sender'];
  message: string;
  timestamp: string;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';

const parseVisitorInfo = (storedInfo: string | null): VisitorInfo | null => {
  if (!storedInfo) return null;

  try {
    return JSON.parse(storedInfo) as VisitorInfo;
  } catch (error) {
    console.error('Error parsing stored visitor info:', error);
    return null;
  }
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<VisitorInfo>({
    fullName: '',
    email: '',
    contactNumber: '',
    inquiry: '',
  });
  const [visitorId] = useState(() => {
    const stored = localStorage.getItem('visitorId');
    if (stored) return stored;
    const newId = `visitor_${crypto.randomUUID()}`;
    localStorage.setItem('visitorId', newId);
    return newId;
  });
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedInfo = localStorage.getItem(`visitorInfo_${visitorId}`);
    const parsedInfo = parseVisitorInfo(storedInfo);
    let reconnectTimer: ReturnType<typeof setTimeout> | undefined;
    let shouldReconnect = true;

    if (parsedInfo) {
      setFormData({
        fullName: parsedInfo.fullName || '',
        email: parsedInfo.email || '',
        contactNumber: parsedInfo.contactNumber || '',
        inquiry: parsedInfo.inquiry || '',
      });
      setShowForm(false);
    } else {
      setShowForm(true);
    }

    const connectWS = () => {
      const socket = new WebSocket(WS_URL);
      ws.current = socket;

      socket.onopen = () => {
        console.log('WebSocket connected');

        socket.send(
          JSON.stringify({
            type: 'visitor_connect',
            visitorId,
            visitorInfo: parsedInfo,
          })
        );

        fetch(`${BACKEND_URL}/api/messages/${visitorId}`)
          .then((res) => res.json())
          .then((data: StoredMessage[]) => {
            const formattedMessages = data.map((msg) => ({
              id: `${msg.timestamp}-${Math.random()}`,
              sender: msg.sender,
              message: msg.message,
              timestamp: new Date(msg.timestamp),
            }));
            setMessages(formattedMessages);
          })
          .catch((error) => console.error('Error loading messages:', error));
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === 'bot_message' || data.type === 'admin_message') {
          const newMessage: Message = {
            id: `${Date.now()}-${Math.random()}`,
            sender: data.type === 'bot_message' ? 'bot' : 'admin',
            message: data.message,
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, newMessage]);
          setIsLoading(false);
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      socket.onclose = () => {
        if (!shouldReconnect) return;

        console.log('WebSocket disconnected, retrying in 3 seconds...');
        reconnectTimer = setTimeout(connectWS, 3000);
      };
    };

    connectWS();

    return () => {
      shouldReconnect = false;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      ws.current?.close();
    };
  }, [visitorId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    const visitorInfo: VisitorInfo = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      contactNumber: formData.contactNumber.trim(),
      inquiry: formData.inquiry.trim(),
    };

    localStorage.setItem(`visitorInfo_${visitorId}`, JSON.stringify(visitorInfo));

    fetch(`${BACKEND_URL}/api/visitor-info`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitorId, visitorInfo }),
    }).catch((error) => console.error('Error saving visitor info:', error));

    setShowForm(false);
    setMessages([
      {
        id: `${Date.now()}-welcome`,
        sender: 'bot',
        message: `👋 Hi ${visitorInfo.fullName}! Welcome to our chat support. How can we help you today?`,
        timestamp: new Date(),
      },
    ]);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !ws.current || ws.current.readyState !== WebSocket.OPEN) return;

    const messageText = inputValue.trim();

    const newMessage: Message = {
      id: `${Date.now()}-${Math.random()}`,
      sender: 'visitor',
      message: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
    setIsLoading(true);

    ws.current.send(
      JSON.stringify({
        type: 'visitor_message',
        visitorId,
        message: messageText,
        visitorInfo: {
          fullName: formData.fullName,
          email: formData.email,
          contactNumber: formData.contactNumber,
          inquiry: formData.inquiry,
        },
      })
    );
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg z-40 transition-all hover:scale-110"
        title="Open chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-[380px] h-[700px] max-h-[85vh] max-w-[95vw] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-40 animate-in fade-in slide-in-from-bottom-4 overflow-hidden">          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <h3 className="font-semibold text-lg">Chat Support</h3>
            <p className="text-xs opacity-90">We typically reply within minutes</p>
          </div>

          {showForm ? (
            <div className="flex-1 p-6 bg-gray-50">
              <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Welcome to Chat Support</h4>
                <p className="text-sm text-gray-600">Please provide your full name to get started</p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      placeholder="Enter your full name"
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Enter your email"
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number *
                    </label>
                    <Input
                      id="contactNumber"
                      type="text"
                      value={formData.contactNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, contactNumber: e.target.value })
                      }
                      placeholder="Enter your contact number"
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 mb-2">
                      Inquiry *
                    </label>
                    <textarea
                      id="inquiry"
                      value={formData.inquiry}
                      onChange={(e) =>
                        setFormData({ ...formData, inquiry: e.target.value })
                      }
                      placeholder="What can we help you with?"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      required
                    />
                  </div>

                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={
                      !formData.fullName.trim() ||
                      !formData.email.trim() ||
                      !formData.contactNumber.trim() ||
                      !formData.inquiry.trim()
                    }>
                  Start Chat
                </Button>
              </form>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500 text-sm text-center">👋 Hi {formData.fullName}! How can we help you today?</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'visitor' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.sender === 'visitor'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : msg.sender === 'admin'
                            ? 'bg-green-50 text-gray-800 border-l-4 border-green-500 rounded-bl-none'
                            : 'bg-white text-gray-800 border border-gray-300 rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm break-words">{msg.message}</p>
                        {msg.sender !== 'visitor' && (
                          <p className="text-xs mt-1 opacity-70">
                            {msg.sender === 'admin' ? '👤 Admin' : '🤖 AI Assistant'}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-lg rounded-bl-none">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={sendMessage} className="border-t border-gray-200 bg-white p-4 flex gap-2 rounded-b-lg">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 text-sm"
                  disabled={isLoading}
                />
                <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 px-3" disabled={isLoading}>
                  <Send size={16} />
                </Button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
