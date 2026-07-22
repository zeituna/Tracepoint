// src/pages/Chat.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, MessageSquare, User, Clock, CheckCheck, 
  ChevronLeft, Search, MoreVertical, Phone,
  Paperclip, Smile, Loader2, Users,
  AlertCircle, X, MessageCircle,
  UserPlus, RefreshCw, Mail, Phone as PhoneIcon,
  Shield, ShieldCheck, Circle, UserCheck, UserX
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { chatService, connectSocket, getSocket, disconnectSocket } from '../services/chat.service';

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);
  const [newChatSubject, setNewChatSubject] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [showUserList, setShowUserList] = useState(false);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [typingUser, setTypingUser] = useState(null);
  const [activeTab, setActiveTab] = useState('conversations'); // 'conversations' or 'users'
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem('user') || '{"id":"1", "role":"admin", "full_name":"Admin"}');
  const isAdmin = currentUser.role === 'admin';

  // ─── Scroll to bottom ──────────────────────────────────────────
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // ─── Initialize Socket ────────────────────────────────────────
  useEffect(() => {
    const socket = connectSocket(currentUser.id);
    
    chatService.onNewMessage((data) => {
      setMessages(prev => [...prev, data]);
      scrollToBottom();
    });

    chatService.onUserTyping(({ userId, isTyping }) => {
      setTypingUser(isTyping ? userId : null);
    });

    chatService.onUsersOnline((users) => {
      setOnlineUsers(users);
    });

    chatService.onNewMessageNotification((data) => {
      setConversations(prev => 
        prev.map(conv => 
          conv.id === data.conversationId 
            ? { ...conv, unread_count: (conv.unread_count || 0) + 1, last_message: data.message }
            : conv
        )
      );
    });

    return () => {
      disconnectSocket();
    };
  }, [currentUser.id, scrollToBottom]);

  // ─── Format timestamp ─────────────────────────────────────────
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '';
    
    const now = new Date();
    const diff = now - date;
    
    if (diff < 86400000) {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
    
    if (diff < 604800000) {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // ─── Format date for header ──────────────────────────────────
  const formatDateHeader = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '';
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const msgDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    if (msgDate.getTime() === today.getTime()) {
      return 'Today';
    }
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (msgDate.getTime() === yesterday.getTime()) {
      return 'Yesterday';
    }
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  // ─── Group messages by date ──────────────────────────────────
  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach(msg => {
      if (!msg.created_at) return;
      const date = new Date(msg.created_at);
      if (isNaN(date.getTime())) return;
      const key = date.toDateString();
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(msg);
    });
    return groups;
  };

  // ─── Load users ───────────────────────────────────────────────
  const loadUsers = useCallback(async () => {
    if (!isAdmin) return;
    try {
      const data = await chatService.getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load users:', err);
    }
  }, [isAdmin]);

  // ─── Load conversations ──────────────────────────────────────
  const loadConversations = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await chatService.getConversations(currentUser.id);
      setConversations(Array.isArray(data) ? data : []);
      setIsConnected(true);
    } catch (err) {
      setError('Failed to load conversations');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser.id]);

  // ─── Load messages for a conversation ──────────────────────
  const loadMessages = useCallback(async (conversationId) => {
    setIsLoading(true);
    try {
      const data = await chatService.getMessages(conversationId);
      setMessages(Array.isArray(data) ? data : []);
      scrollToBottom();
      
      chatService.joinConversation(conversationId);
      
      await chatService.markAsRead(conversationId, currentUser.id);
      chatService.markReadViaSocket({ conversationId, userId: currentUser.id });
    } catch (err) {
      setError('Failed to load messages');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser.id, scrollToBottom]);

  // ─── Handle selecting a conversation ──────────────────────
  const handleSelectConversation = async (conversation) => {
    setSelectedConversation(conversation);
    await loadMessages(conversation.id);
    setConversations(prev => 
      prev.map(c => 
        c.id === conversation.id 
          ? { ...c, unread_count: 0 } 
          : c
      )
    );
  };

  // ─── Handle selecting a user to chat with ──────────────────
  const handleSelectUser = (user) => {
    setSelectedUserId(user.id);
    setNewChatSubject(`Chat with ${user.full_name}`);
    
    // Check if conversation already exists
    const existingConv = conversations.find(c => c.user_id === user.id);
    if (existingConv) {
      setSelectedConversation(existingConv);
      loadMessages(existingConv.id);
      setShowUserList(false);
      setShowNewChat(false);
    } else {
      setShowNewChat(true);
      setShowUserList(false);
    }
  };

  // ─── Send message ──────────────────────────────────────────
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;
    
    const messageText = newMessage.trim();
    setNewMessage('');
    setIsSending(true);
    
    const messageData = {
      conversationId: selectedConversation.id,
      message: messageText,
      senderId: currentUser.id,
      senderType: isAdmin ? 'admin' : 'user',
      senderName: currentUser.full_name || (isAdmin ? 'Admin' : 'User')
    };
    
    const tempMessage = {
      id: `temp-${Date.now()}`,
      ...messageData,
      created_at: new Date().toISOString(),
      status: 'sending'
    };
    setMessages(prev => [...prev, tempMessage]);
    scrollToBottom();
    
    const sent = chatService.sendMessageViaSocket(messageData);
    
    if (sent) {
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === tempMessage.id 
              ? { ...msg, status: 'sent' }
              : msg
          )
        );
      }, 500);
    } else {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === tempMessage.id 
            ? { ...msg, status: 'failed' }
            : msg
        )
      );
      setError('Failed to send message');
    }
    
    setIsSending(false);
  };

  // ─── Handle typing indicator ──────────────────────────────
  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    if (selectedConversation) {
      chatService.typingIndicator({
        conversationId: selectedConversation.id,
        userId: currentUser.id,
        isTyping: e.target.value.length > 0
      });
    }
  };

  // ─── Create new conversation ──────────────────────────────
  const handleCreateConversation = async (e) => {
    e.preventDefault();
    if (!newChatSubject.trim()) return;
    
    try {
      const conversation = await chatService.createConversation(
        currentUser.id,
        newChatSubject.trim(),
        selectedUserId || null
      );
      setConversations(prev => [conversation, ...prev]);
      setSelectedConversation(conversation);
      setShowNewChat(false);
      setNewChatSubject('');
      setSelectedUserId('');
      await loadMessages(conversation.id);
    } catch (err) {
      setError('Failed to create conversation');
      console.error(err);
    }
  };

  // ─── Load conversations on mount ──────────────────────────
  useEffect(() => {
    loadConversations();
    if (isAdmin) {
      loadUsers();
    }
  }, [loadConversations, loadUsers, isAdmin]);

  // ─── Filter conversations ──────────────────────────────────
  const filteredConversations = Array.isArray(conversations) 
    ? conversations.filter(conv =>
        conv.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.last_message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.user_name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // ─── Filter users ──────────────────────────────────────────
  const filteredUsers = Array.isArray(users)
    ? users.filter(user =>
        user.full_name?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(userSearchTerm.toLowerCase())
      )
    : [];

  // ─── Message Component ─────────────────────────────────────
  const MessageBubble = ({ message, isOwn }) => {
    const isFailed = message.status === 'failed';
    const isSending = message.status === 'sending';
    const isAdminMessage = message.senderType === 'admin';
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
        className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
      >
        <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
          {!isOwn && message.senderName && (
            <p className="text-xs text-gray-400 mb-1 ml-1">
              {message.senderName}
              {isAdminMessage && <Shield size={12} className="inline ml-1 text-emerald-500" />}
            </p>
          )}
          <div
            className={`relative rounded-2xl px-4 py-2.5 ${
              isOwn
                ? isFailed
                  ? 'bg-red-100 text-red-700'
                  : isSending
                  ? 'bg-emerald-400/70 text-white'
                  : 'bg-emerald-500 text-white'
                : isAdminMessage
                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap break-words">
              {message.message}
            </p>
          </div>
          
          <div className={`flex items-center gap-1.5 mt-1 text-xs text-gray-400 ${isOwn ? 'justify-end' : 'justify-start'}`}>
            <span>{formatTime(message.created_at)}</span>
            {isOwn && (
              <span>
                {isFailed ? (
                  <span className="text-red-500">Failed</span>
                ) : isSending ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <CheckCheck size={14} className="text-emerald-500" />
                )}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  // ─── User List Component (for admin) ──────────────────────
  const UserList = () => {
    const [localSearch, setLocalSearch] = useState('');
    
    const filteredUserList = users.filter(user =>
      user.full_name?.toLowerCase().includes(localSearch.toLowerCase()) ||
      user.email?.toLowerCase().includes(localSearch.toLowerCase())
    );

    const onlineUserIds = onlineUsers || [];

    return (
      <div className="h-full flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Users size={18} className="text-emerald-500" />
            All Users
            <span className="text-xs text-gray-400 ml-2">
              ({users.length} total, {onlineUserIds.length} online)
            </span>
          </h3>
          <div className="relative mt-3">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto p-3">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            </div>
          ) : filteredUserList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Users size={48} className="mb-3 opacity-30" />
              <p className="text-sm">No users found</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredUserList.map((user) => {
                const isOnline = onlineUserIds.includes(String(user.id));
                const hasConversation = conversations.some(c => c.user_id === user.id);
                const unreadCount = conversations.find(c => c.user_id === user.id)?.unread_count || 0;
                
                return (
                  <motion.button
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => handleSelectUser(user)}
                    className="w-full p-3 text-left hover:bg-gray-50 rounded-xl transition border border-gray-100 hover:border-emerald-200 flex items-center gap-3 group"
                  >
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                        {user.full_name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      {isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    
                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-semibold text-gray-800 truncate">
                          {user.full_name}
                        </h4>
                        {unreadCount > 0 && (
                          <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-emerald-500 text-white text-xs font-medium rounded-full">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="truncate">{user.email}</span>
                        <span className="text-gray-300">•</span>
                        <span className={`text-xs ${isOnline ? 'text-emerald-500' : 'text-gray-400'}`}>
                          {isOnline ? 'Online' : 'Offline'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-700' 
                            : user.role === 'police'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {user.role || 'Volunteer'}
                        </span>
                        {hasConversation && (
                          <span className="text-xs text-gray-400">💬 Chat exists</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Action */}
                    <ChevronLeft size={18} className="text-gray-300 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── Conversation List Component ──────────────────────────
  const ConversationList = () => (
    <div className="h-full flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => loadConversations()}
            className="p-2 hover:bg-gray-100 rounded-xl transition"
            title="Refresh"
          >
            <RefreshCw size={18} className="text-gray-500" />
          </button>
        </div>
        
        {/* Tab Switcher for Admin */}
        {isAdmin && (
          <div className="flex gap-1 mt-3 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('conversations')}
              className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-lg transition ${
                activeTab === 'conversations'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <MessageSquare size={14} />
                Chats
              </span>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-lg transition ${
                activeTab === 'users'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Users size={14} />
                Users
                {users.length > 0 && (
                  <span className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">
                    {users.length}
                  </span>
                )}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Connection Status */}
      <div className={`px-4 py-1 text-xs text-center ${isConnected ? 'text-emerald-600' : 'text-yellow-600'} bg-gray-50`}>
        {isConnected ? '🟢 Connected' : '🟡 Connecting...'}
      </div>

      {/* Content based on active tab */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'users' && isAdmin ? (
          <div className="p-3">
            {filteredUsers.length === 0 && !isLoading ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
                <Users size={48} className="mb-3 opacity-30" />
                <p className="text-sm">No users found</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredUsers.map((user) => {
                  const isOnline = onlineUsers.includes(String(user.id));
                  const hasConversation = conversations.some(c => c.user_id === user.id);
                  const unreadCount = conversations.find(c => c.user_id === user.id)?.unread_count || 0;
                  
                  return (
                    <motion.button
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => handleSelectUser(user)}
                      className="w-full p-3 text-left hover:bg-gray-50 rounded-xl transition border border-gray-100 hover:border-emerald-200 flex items-center gap-3 group"
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                          {user.full_name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        {isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-semibold text-gray-800 truncate">
                            {user.full_name}
                          </h4>
                          {unreadCount > 0 && (
                            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-emerald-500 text-white text-xs font-medium rounded-full">
                              {unreadCount}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="truncate">{user.email}</span>
                          <span className="text-gray-300">•</span>
                          <span className={`text-xs ${isOnline ? 'text-emerald-500' : 'text-gray-400'}`}>
                            {isOnline ? 'Online' : 'Offline'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            user.role === 'admin' 
                              ? 'bg-purple-100 text-purple-700' 
                              : user.role === 'police'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {user.role || 'Volunteer'}
                          </span>
                          {hasConversation && (
                            <span className="text-xs text-gray-400">💬 Has chat</span>
                          )}
                        </div>
                      </div>
                      <ChevronLeft size={18} className="text-gray-300 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          // Conversations List
          <div className="p-2">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
                <MessageSquare size={48} className="mb-3 opacity-30" />
                <p className="text-sm">No conversations yet</p>
                {isAdmin && (
                  <p className="text-xs">Click on "Users" tab to start a chat</p>
                )}
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <motion.button
                  key={conv.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => handleSelectConversation(conv)}
                  className={`w-full p-3 text-left hover:bg-gray-50 rounded-xl transition border border-transparent hover:border-gray-200 ${
                    selectedConversation?.id === conv.id ? 'bg-emerald-50/50 border-emerald-200' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                      {conv.user_name?.charAt(0).toUpperCase() || conv.subject?.charAt(0).toUpperCase() || 'C'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-gray-800 truncate">
                          {conv.user_name || conv.subject || 'New Conversation'}
                        </h4>
                        {conv.last_message_at && (
                          <span className="text-xs text-gray-400 whitespace-nowrap">
                            {formatTime(conv.last_message_at)}
                          </span>
                        )}
                      </div>
                      {conv.last_message && (
                        <p className="text-sm text-gray-500 truncate">
                          {conv.last_message}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        {conv.unread_count > 0 && (
                          <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-emerald-500 text-white text-xs font-medium rounded-full">
                            {conv.unread_count}
                          </span>
                        )}
                        <span className="text-xs text-gray-400">
                          {conv.user_type === 'admin' ? 'Admin' : 'User'}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );

  // ─── Chat Window Component ────────────────────────────────
  const ChatWindow = () => (
    <div className="h-full flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {selectedConversation ? (
        <>
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedConversation(null)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-medium text-sm">
                {selectedConversation.user_name?.charAt(0).toUpperCase() || selectedConversation.subject?.charAt(0).toUpperCase() || 'C'}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  {selectedConversation.user_name || selectedConversation.subject || 'New Conversation'}
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-400">
                    {selectedConversation.user_type === 'admin' ? 'Admin' : 'User'}
                  </p>
                  {typingUser && (
                    <span className="text-xs text-emerald-500 animate-pulse">Typing...</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-xl transition">
                <Phone size={18} className="text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-xl transition">
                <MoreVertical size={18} className="text-gray-500" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <MessageSquare size={48} className="mb-3 opacity-30" />
                <p className="text-sm">No messages yet</p>
                <p className="text-xs">Start the conversation</p>
              </div>
            ) : (
              Object.entries(groupMessagesByDate(messages)).map(([date, msgs]) => (
                <div key={date}>
                  <div className="flex justify-center mb-4">
                    <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                      {formatDateHeader(date)}
                    </span>
                  </div>
                  {msgs.map((msg) => (
                    <MessageBubble
                      key={msg.id}
                      message={msg}
                      isOwn={msg.sender_id === currentUser.id}
                    />
                  ))}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-100 bg-white">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded-xl transition"
              >
                <Paperclip size={20} className="text-gray-400" />
              </button>
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={handleTyping}
                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                disabled={isSending}
              />
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded-xl transition"
              >
                <Smile size={20} className="text-gray-400" />
              </button>
              <button
                type="submit"
                disabled={!newMessage.trim() || isSending}
                className={`p-2.5 rounded-xl transition ${
                  newMessage.trim() && !isSending
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSending ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
          <MessageSquare size={64} className="mb-4 opacity-20" />
          <h3 className="text-xl font-semibold text-gray-600">No conversation selected</h3>
          <p className="text-sm text-center">
            {isAdmin 
              ? 'Click on a user from the Users tab to start chatting'
              : 'Select a conversation from the list to start chatting'}
          </p>
        </div>
      )}
    </div>
  );

  // ─── New Chat Modal ────────────────────────────────────────
  const NewChatModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-2">New Conversation</h3>
        <p className="text-sm text-gray-500 mb-4">
          {isAdmin ? 'Start a new conversation with a user' : 'Start a new conversation with admin'}
        </p>
        
        <form onSubmit={handleCreateConversation}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newChatSubject}
              onChange={(e) => setNewChatSubject(e.target.value)}
              placeholder="Enter conversation subject"
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              autoFocus
              required
            />
          </div>
          
          {isAdmin && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Select User <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              >
                <option value="">Select a user...</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.full_name} ({user.email})
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setShowNewChat(false);
                setSelectedUserId('');
                setNewChatSubject('');
              }}
              className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!newChatSubject.trim() || (isAdmin && !selectedUserId)}
              className="flex-1 px-4 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Chat
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gradient-to-br from-slate-50/80 to-gray-100/80 min-h-screen">
      <PageHeader
        icon={MessageSquare}
        title={isAdmin ? "Admin Chat" : "Live Chat"}
        subtitle={isAdmin 
          ? "Manage conversations with users and provide support"
          : "Real-time communication with admin and support team"
        }
        actions={
          isAdmin ? (
            <button
              onClick={() => setShowUserList(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition shadow-sm"
            >
              <UserPlus size={16} />
              New Chat
            </button>
          ) : (
            <button
              onClick={() => setShowNewChat(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition shadow-sm"
            >
              <MessageCircle size={16} />
              New Chat
            </button>
          )
        }
      />

      {/* Error Display */}
      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 p-3 rounded-xl text-sm flex items-center gap-2">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* Chat Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)] min-h-[500px]">
        {/* Conversation List / User List */}
        <div className={`lg:col-span-1 ${selectedConversation ? 'hidden lg:block' : 'block'}`}>
          <ConversationList />
        </div>
        
        {/* Chat Window */}
        <div className={`lg:col-span-2 ${selectedConversation ? 'block' : 'hidden lg:block'}`}>
          <ChatWindow />
        </div>
      </div>

      {/* New Chat Modal */}
      {showNewChat && <NewChatModal />}
    </div>
  );
};

export default Chat;