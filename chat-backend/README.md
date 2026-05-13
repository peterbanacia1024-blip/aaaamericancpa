# Chat Backend Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key (get it from https://platform.openai.com/api-keys)

## Installation

### 1. Install Backend Dependencies
```bash
cd chat-backend
npm install
```

### 2. Configure Environment Variables
Edit the `.env` file and add your OpenAI API key:
```env
OPENAI_API_KEY=sk-your-actual-api-key-here
PORT=3001
```

### 3. Start the Backend Server
```bash
npm start
```

You should see:
```
Server running on port 3001
WebSocket server running on ws://localhost:3001
```

## Frontend Setup

### 1. Install Frontend Dependencies
In the root directory:
```bash
npm install
```

### 2. Start the Frontend Server
In the root directory:
```bash
npm run dev
```

The frontend will be available at `http://localhost:8080`

## How to Use

### For Visitors (Chat Widget)
1. Navigate to your website (http://localhost:8080)
2. Click the chat button in the bottom-right corner
3. Type your message and press Send
4. If you're the admin and online, you'll get a response immediately
5. If admin is offline, the AI chatbot will respond

### For Admin
1. Make sure the backend server is running
2. Open your browser and go to `http://localhost:8080/admin-chat`
3. You'll see a list of visitors who have started conversations
4. Click on a visitor to see their messages
5. Type your reply and send it
6. The visitor will receive your message in real-time

## Architecture

```
┌─────────────────────────────────────┐
│        Frontend (React)              │
│  - ChatWidget (floating button)      │
│  - AdminChat (admin dashboard)       │
└──────────┬──────────────────────────┘
           │
           │ WebSocket + HTTP
           │
┌──────────▼──────────────────────────┐
│     Backend (Node.js + Express)      │
│  - WebSocket server for real-time    │
│  - REST API for message history      │
│  - OpenAI API integration            │
└─────────────────────────────────────┘
```

## Features

✅ **Real-time Chat**: WebSocket connection for instant messaging
✅ **Admin Dashboard**: View all visitors and their conversations
✅ **AI Chatbot**: OpenAI GPT-3.5-turbo responds when admin is offline
✅ **Message History**: All messages are stored and retrieved
✅ **Auto-reconnect**: Automatic reconnection on connection loss
✅ **Visitor Tracking**: Unique visitor ID using localStorage

## Troubleshooting

### WebSocket Connection Refused
- Make sure backend is running on port 3001
- Check firewall settings
- Verify `WS_URL` in ChatWidget.tsx matches your setup

### OpenAI API Error
- Verify your API key is correct in `.env`
- Check you have sufficient API credits
- Review OpenAI error messages in server console

### Messages Not Persisting
- Currently uses in-memory storage
- Messages are lost on server restart
- To persist: implement database (MongoDB/PostgreSQL)

## Next Steps

1. **Add Database**: Replace in-memory storage with MongoDB or PostgreSQL
2. **User Authentication**: Add login for admin panel
3. **Notifications**: Email/SMS alerts for new messages
4. **Rich Messages**: Support for images, attachments
5. **Analytics**: Track conversation metrics
6. **Multi-admin**: Support multiple admins

## Environment Variables Reference

```env
OPENAI_API_KEY     # Your OpenAI API key
PORT               # Server port (default: 3001)
```
