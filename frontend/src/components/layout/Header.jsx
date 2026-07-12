import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch unread messages count
  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/messages/unread/count', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        console.log('📨 Unread count:', data.unread_count);
        setUnreadCount(data.unread_count || 0);
      }
    } catch (err) {
      console.error('Error fetching unread count:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch recent messages for notifications
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await fetch('http://localhost:5000/api/messages', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        // Get all unread messages
        const unreadMessages = data.filter(m => !m.is_read).slice(0, 5);
        
        // Fetch user names for sender/recipient
        const usersRes = await fetch('http://localhost:5000/api/users', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const users = usersRes.ok ? await usersRes.json() : [];
        
        const notifs = unreadMessages.map(m => {
          const sender = users.find(u => u.id === m.sender_id);
          return {
            id: m.id,
            title: `📨 New message from ${sender?.username || 'User'}`,
            time: new Date(m.created_at).toLocaleString(),
            type: 'message',
            message: m.content,
            sender_id: m.sender_id
          };
        });
        
        setNotifications(notifs);
        console.log('📨 Notifications:', notifs);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    fetchNotifications();

    // Check every 10 seconds for new messages
    const interval = setInterval(() => {
      fetchUnreadCount();
      fetchNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="relative bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-30">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400/0 via-emerald-400/50 to-emerald-400/0"></div>
      
      <div className="relative flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl hover:bg-gray-100 transition lg:hidden relative group"
          >
            <Bars3Icon className="h-6 w-6 text-gray-700 group-hover:scale-110 transition-transform" />
          </button>
          
          <div className="hidden md:flex items-center bg-gray-100/80 backdrop-blur-sm rounded-xl px-4 py-2 min-w-[300px] border border-gray-200/50 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-400/20 transition-all duration-300 group">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none ml-3 text-sm text-gray-700 w-full placeholder-gray-400"
            />
            <kbd className="text-xs text-gray-400 bg-white/50 px-2 py-1 rounded-md border border-gray-200">⌘K</kbd>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* 🔔 Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl hover:bg-gray-100 transition relative group"
            >
              <BellIcon className="h-6 w-6 text-gray-700 group-hover:scale-110 transition-transform" />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1.5 shadow-lg shadow-red-500/30"
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </motion.span>
              )}
            </button>
            
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 top-12 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-emerald-50 to-transparent">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                      <BellIcon className="h-5 w-5 text-emerald-500" />
                      Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-gray-400">
                        <BellIcon className="h-12 w-12 mx-auto text-gray-200 mb-2" />
                        <p>No new notifications</p>
                        <p className="text-xs text-gray-300 mt-1">Check back later</p>
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <motion.div
                          key={notif.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: notif.id * 0.1 }}
                          className="p-4 hover:bg-gray-50 transition cursor-pointer border-b border-gray-50 group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full mt-2 bg-blue-500"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800 group-hover:text-emerald-600 transition">
                                {notif.title}
                              </p>
                              {notif.message && (
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                  "{notif.message}"
                                </p>
                              )}
                              <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                            </div>
                            <Link
                              to="/messages"
                              className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                              onClick={() => setShowNotifications(false)}
                            >
                              View
                            </Link>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                  <div className="p-3 bg-gray-50 border-t border-gray-100">
                    <Link
                      to="/messages"
                      className="text-sm text-emerald-600 font-medium hover:text-emerald-700 transition flex items-center gap-1 justify-center"
                      onClick={() => setShowNotifications(false)}
                    >
                      View all messages
                      <SparklesIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-gray-100 transition group"
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full blur opacity-50 group-hover:opacity-100 transition"></div>
                <div className="relative w-9 h-9 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 flex items-center justify-center">
                  <UserCircleIcon className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-700">Admin</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-transparent">
                    <p className="font-semibold text-gray-800">Admin User</p>
                    <p className="text-sm text-gray-500">admin@tracepoint.com</p>
                    <span className="inline-block mt-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                      Admin
                    </span>
                  </div>
                  <div className="p-2">
                    <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition">
                      <UserCircleIcon className="h-5 w-5 text-gray-600" />
                      <span className="text-sm text-gray-700">Profile</span>
                    </Link>
                    <Link to="/settings" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition">
                      <Cog6ToothIcon className="h-5 w-5 text-gray-600" />
                      <span className="text-sm text-gray-700">Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 transition w-full text-left"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 text-red-500" />
                      <span className="text-sm text-red-500">Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
