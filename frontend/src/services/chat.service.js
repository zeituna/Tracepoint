// src/services/chat.service.js
import io from 'socket.io-client';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:5000';

// ─── Socket.IO Connection ──────────────────────────────────────
let socket = null;

export const connectSocket = (userId) => {
  if (!socket) {
    socket = io(WS_URL, {
      transports: ['websocket'],
      query: { userId }
    });
    
    socket.on('connect', () => {
      console.log('✅ Socket connected');
      socket.emit('user_online', userId);
    });
    
    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;

// ─── API Functions ──────────────────────────────────────────────
const getAuthToken = () => {
  return localStorage.getItem('accessToken') || localStorage.getItem('token');
};

const fetchWithAuth = async (url, options = {}) => {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const chatService = {
  // ─── Socket Functions ──────────────────────────────────────
  joinConversation: (conversationId) => {
    if (socket) {
      socket.emit('join_conversation', conversationId);
    }
  },

  sendMessageViaSocket: (data) => {
    if (socket) {
      socket.emit('send_message', data);
      return true;
    }
    return false;
  },

  markReadViaSocket: (data) => {
    if (socket) {
      socket.emit('mark_read', data);
    }
  },

  typingIndicator: (data) => {
    if (socket) {
      socket.emit('typing', data);
    }
  },

  onNewMessage: (callback) => {
    if (socket) {
      socket.on('new_message', callback);
    }
  },

  onUserTyping: (callback) => {
    if (socket) {
      socket.on('user_typing', callback);
    }
  },

  onUsersOnline: (callback) => {
    if (socket) {
      socket.on('users_online', callback);
    }
  },

  onNewMessageNotification: (callback) => {
    if (socket) {
      socket.on('new_message_notification', callback);
    }
  },

  // ─── REST API Functions ────────────────────────────────────
  getUsers: async () => {
    try {
      return await fetchWithAuth(`${API_BASE}/users`);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      return [];
    }
  },

  getConversations: async (userId) => {
    try {
      return await fetchWithAuth(`${API_BASE}/chat/conversations/${userId}`);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
      return [];
    }
  },

  getMessages: async (conversationId) => {
    try {
      return await fetchWithAuth(`${API_BASE}/chat/messages/${conversationId}`);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      return [];
    }
  },

  createConversation: async (userId, subject, targetUserId) => {
    try {
      return await fetchWithAuth(`${API_BASE}/chat/conversations`, {
        method: 'POST',
        body: JSON.stringify({ userId, subject, targetUserId })
      });
    } catch (error) {
      console.error('Failed to create conversation:', error);
      throw error;
    }
  },

  markAsRead: async (conversationId, userId) => {
    try {
      return await fetchWithAuth(`${API_BASE}/chat/messages/read`, {
        method: 'PUT',
        body: JSON.stringify({ conversationId, userId })
      });
    } catch (error) {
      console.error('Failed to mark messages as read:', error);
      return { success: true };
    }
  }
};