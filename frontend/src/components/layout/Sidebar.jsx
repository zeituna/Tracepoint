import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  MapPin,
  Smile,
  MessageSquare,
  Bell,
  BarChart3,
  Users,
  Settings,
  LogOut,
  User,
  Database,
  Clock,
  Activity
} from 'lucide-react';
import Logo from '../Logo';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;
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

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(() => {
      fetchUnreadCount();
      setCurrentTime(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, color: 'text-emerald-400' },
    { name: 'Reports', path: '/reports', icon: FileText, color: 'text-blue-400' },
    { name: 'Map Tracking', path: '/map-tracking', icon: MapPin, color: 'text-rose-400' },
    { name: 'Facial Recognition', path: '/facial-recognition', icon: Smile, color: 'text-purple-400' },
    { 
      name: 'Messages', 
      path: '/messages', 
      icon: MessageSquare, 
      color: 'text-indigo-400',
      badge: unreadCount > 0 ? unreadCount : null
    },
    { name: 'Alerts', path: '/alerts', icon: Bell, color: 'text-orange-400' },
    { name: 'Statistics', path: '/statistics', icon: BarChart3, color: 'text-cyan-400' },
    { name: 'Users', path: '/users', icon: Users, color: 'text-pink-400' },
    { name: 'Records', path: '/crud-demo', icon: Database, color: 'text-yellow-400' },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-emerald-900 via-emerald-950 to-emerald-950 text-white transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 shadow-2xl flex flex-col`}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"></div>

        <div className="flex-shrink-0 relative z-10">
          <div className="px-6 py-5 border-b border-white/10">
            <Logo size="md" showText={true} variant="dark" />
          </div>

          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full blur opacity-50"></div>
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-emerald-900 rounded-full animate-pulse"></div>
            </div>
            <div>
              <p className="text-sm font-semibold text-white flex items-center gap-1">
                Leila User
              </p>
              <p className="text-xs text-emerald-300/50">Administrator</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 relative z-10">
          <div className="relative mb-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-emerald-800/50 px-3 text-[10px] text-emerald-300/30 uppercase tracking-wider backdrop-blur-sm">
                Main Menu
              </span>
            </div>
          </div>

          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => toggleSidebar && toggleSidebar()}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-white/10 text-white shadow-lg shadow-emerald-500/10 border border-white/5'
                    : 'text-emerald-100/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="relative">
                  <item.icon className={`h-5 w-5 ${isActive ? item.color : 'text-emerald-300/50 group-hover:text-white'}`} />
                  {item.badge && (
                    <span className="absolute -top-1 -right-2 min-w-[18px] h-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1.5 shadow-lg shadow-red-500/30 animate-pulse">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                  {isActive && (
                    <div className="absolute -inset-1 bg-emerald-400/10 blur-md rounded-full -z-10"></div>
                  )}
                </div>
                <span className="text-sm font-medium">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1 h-6 bg-gradient-to-b from-emerald-400 to-emerald-500 rounded-full shadow-lg shadow-emerald-400/50"></div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex-shrink-0 p-4 border-t border-white/10 bg-gradient-to-t from-emerald-950/80 to-transparent relative z-10">
          <div className="flex items-center gap-2 mb-3 px-4 py-2 bg-white/5 rounded-xl border border-white/5 backdrop-blur-sm">
            <Clock className="h-4 w-4 text-emerald-300/70" />
            <span className="text-sm text-emerald-200/80 font-medium">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
            <span className="text-xs text-emerald-300/50">•</span>
            <span className="text-xs text-emerald-300/50 flex items-center gap-1">
              <Activity className="h-3 w-3 text-emerald-400" />
              Online
            </span>
          </div>

          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-emerald-100/60 hover:bg-white/5 hover:text-white transition"
          >
            <Settings className="h-5 w-5" />
            <span className="text-sm font-medium">Settings</span>
          </Link>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-red-300/60 hover:bg-red-500/20 hover:text-red-200 transition mt-1"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>

          <p className="text-[10px] text-emerald-300/20 text-center mt-3 tracking-wider">
            v2.0.0 • Secure
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent"></div>
      </div>
    </>
  );
};

export default Sidebar;
