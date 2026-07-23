import React, { useState } from 'react';
import { MessageSquare, Send, UserPlus, Users } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, message: 'Welcome to TracePoint Chat!', sender: 'admin', time: '10:30 AM' },
    { id: 2, message: 'How can we help you today?', sender: 'admin', time: '10:31 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      message: newMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setNewMessage('');
  };

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gradient-to-br from-slate-50/80 to-gray-100/80 min-h-screen">
      <PageHeader
        icon={MessageSquare}
        title="Live Chat"
        subtitle="Real-time communication with admin and support team"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition shadow-sm">
            <UserPlus size={16} />
            New Chat
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-220px)] min-h-[400px]">
        {/* Users List - Left Sidebar */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Users size={18} className="text-emerald-500" />
              Users
              <span className="text-xs text-gray-400 ml-auto">5 online</span>
            </h3>
          </div>
          <div className="overflow-y-auto h-[calc(100%-60px)]">
            {['Admin', 'John Doe', 'Jane Smith', 'Michael Ochieng', 'Sarah Wanjiku'].map((name, i) => (
              <button
                key={i}
                className="w-full p-3 text-left hover:bg-gray-50 transition border-b border-gray-50 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-medium text-sm">
                  {name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">{name}</p>
                  <p className="text-xs text-gray-400">Online</p>
                </div>
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-medium">
                A
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Admin</h3>
                <p className="text-xs text-emerald-500">Online</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                    msg.sender === 'user'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-emerald-100' : 'text-gray-400'}`}>
                    {msg.sender === 'user' ? 'You' : 'Admin'} • {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-100">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className={`px-6 py-2.5 rounded-xl font-medium transition ${
                  newMessage.trim()
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
EOFcat > Chat.jsx << 'EOF'
import React, { useState } from 'react';
import { MessageSquare, Send, UserPlus, Users } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, message: 'Welcome to TracePoint Chat!', sender: 'admin', time: '10:30 AM' },
    { id: 2, message: 'How can we help you today?', sender: 'admin', time: '10:31 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      message: newMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setNewMessage('');
  };

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gradient-to-br from-slate-50/80 to-gray-100/80 min-h-screen">
      <PageHeader
        icon={MessageSquare}
        title="Live Chat"
        subtitle="Real-time communication with admin and support team"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition shadow-sm">
            <UserPlus size={16} />
            New Chat
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-220px)] min-h-[400px]">
        {/* Users List - Left Sidebar */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Users size={18} className="text-emerald-500" />
              Users
              <span className="text-xs text-gray-400 ml-auto">5 online</span>
            </h3>
          </div>
          <div className="overflow-y-auto h-[calc(100%-60px)]">
            {['Admin', 'John Doe', 'Jane Smith', 'Michael Ochieng', 'Sarah Wanjiku'].map((name, i) => (
              <button
                key={i}
                className="w-full p-3 text-left hover:bg-gray-50 transition border-b border-gray-50 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-medium text-sm">
                  {name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">{name}</p>
                  <p className="text-xs text-gray-400">Online</p>
                </div>
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-medium">
                A
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Admin</h3>
                <p className="text-xs text-emerald-500">Online</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                    msg.sender === 'user'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-emerald-100' : 'text-gray-400'}`}>
                    {msg.sender === 'user' ? 'You' : 'Admin'} • {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-100">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className={`px-6 py-2.5 rounded-xl font-medium transition ${
                  newMessage.trim()
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

