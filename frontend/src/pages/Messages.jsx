import React, { useState, useEffect } from 'react';
import { Send, Trash2, CheckCircle, Clock, Users, Bell, X } from 'lucide-react';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState({ recipient_id: '', content: '' });
  const [notification, setNotification] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch unread count
  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:5000/api/messages/unread/count', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUnreadCount(data.unread_count || 0);
      }
    } catch (err) {
      console.error('Error fetching unread count:', err);
    }
  };

  // Fetch messages
  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:5000/api/messages', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
        // Show notification for new unread messages
        const unread = data.filter(m => !m.is_read);
        if (unread.length > 0) {
          setNotification(`📨 You have ${unread.length} new message${unread.length > 1 ? 's' : ''}`);
          setTimeout(() => setNotification(null), 5000);
        }
      }
    } catch (err) {
      console.error('Fetch messages error:', err);
    }
  };

  // Fetch users for dropdown
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:5000/api/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (err) {
      console.error('Fetch users error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchUsers();
    fetchUnreadCount();

    // Check for new messages every 15 seconds
    const interval = setInterval(() => {
      fetchMessages();
      fetchUnreadCount();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Send message
  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newMessage)
      });
      if (response.ok) {
        const data = await response.json();
        setMessages([data.data, ...messages]);
        setNewMessage({ recipient_id: '', content: '' });
        alert('✅ Message sent successfully!');
        fetchUnreadCount();
      }
    } catch (err) {
      console.error('Send error:', err);
      alert('Error sending message');
    }
  };

  // Mark as read
  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:5000/api/messages/${id}/read`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setMessages(messages.map(m => m.id === id ? { ...m, is_read: true } : m));
        fetchUnreadCount();
        alert('✅ Message marked as read');
      }
    } catch (err) {
      console.error('Mark read error:', err);
      alert('Error marking message as read');
    }
  };

  // DELETE - Remove message - FIXED
  const handleDelete = async (id) => {
    if (!window.confirm('⚠️ Are you sure you want to delete this message?')) return;
    
    try {
      const token = localStorage.getItem('accessToken');
      console.log('🗑️ Deleting message ID:', id);
      
      const response = await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('📡 Response status:', response.status);
      const data = await response.json();
      console.log('📦 Response data:', data);
      
      if (response.ok) {
        setMessages(messages.filter(m => m.id !== id));
        alert('✅ Message deleted successfully!');
        fetchUnreadCount();
        fetchMessages(); // Refresh the list
      } else {
        alert(data.error || '❌ Failed to delete message');
      }
    } catch (err) {
      console.error('❌ Delete error:', err);
      alert('Error deleting message. Check console for details.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Notification Banner */}
      {notification && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <Bell className="text-blue-500" size={20} />
            <span className="text-blue-700">{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-blue-400 hover:text-blue-600">
            <X size={18} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
          <p className="text-gray-500">
            {unreadCount > 0 ? (
              <span className="text-red-500 font-medium">{unreadCount} unread messages</span>
            ) : (
              'No unread messages'
            )}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
          <Clock size={20} className="text-gray-600" />
          <span className="font-medium">{unreadCount}</span>
          <span className="text-gray-500 text-sm">unread</span>
        </div>
      </div>

      {/* Send Message Form */}
      <div className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Send className="text-emerald-500" size={18} />
          New Message
        </h3>
        <form onSubmit={handleSend} className="flex flex-col md:flex-row gap-4">
          <select
            value={newMessage.recipient_id}
            onChange={(e) => setNewMessage({ ...newMessage, recipient_id: e.target.value })}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          >
            <option value="">Select Recipient</option>
            {users.filter(u => u.id !== 4).map(user => (
              <option key={user.id} value={user.id}>{user.username} ({user.email})</option>
            ))}
          </select>
          <input
            type="text"
            value={newMessage.content}
            onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
            placeholder="Type your message..."
            className="flex-2 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/30"
          >
            <Send size={18} />
            Send
          </button>
        </form>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <span className="font-medium text-gray-700">All Messages</span>
          <span className="text-sm text-gray-500">{messages.length} total</span>
        </div>

        {messages.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-300 mb-3" />
            <p>No messages yet</p>
            <p className="text-sm text-gray-400">Send a message to get started</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {messages.map((msg) => {
              const sender = users.find(u => u.id === msg.sender_id);
              const recipient = users.find(u => u.id === msg.recipient_id);
              const isUnread = !msg.is_read;

              return (
                <div
                  key={msg.id}
                  className={`p-4 hover:bg-gray-50 transition ${isUnread ? 'bg-blue-50/50 border-l-4 border-blue-500' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-gray-800">
                          From: {sender?.username || msg.sender_id}
                        </span>
                        <span className="text-gray-400 text-sm">→</span>
                        <span className="text-gray-600 text-sm">
                          To: {recipient?.username || msg.recipient_id}
                        </span>
                        {isUnread && (
                          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                            New
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-gray-700">{msg.content}</p>
                      <span className="text-xs text-gray-400">
                        {new Date(msg.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex gap-1 ml-4">
                      {isUnread && (
                        <button
                          onClick={() => markAsRead(msg.id)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Mark as read"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
