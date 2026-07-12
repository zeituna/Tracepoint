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
  Building2,
  Settings,
  LogOut,
  User,
  Database,
  Shield,
  Clock,
  Activity,
} from 'lucide-react';

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
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Map Tracking', path: '/map-tracking', icon: MapPin },
    { name: 'Facial Recognition', path: '/facial-recognition', icon: Smile },
    { 
      name: 'Messages', 
      path: '/messages', 
      icon: MessageSquare,
      badge: unreadCount > 0 ? unreadCount : null
    },
    { name: 'Alerts', path: '/alerts', icon: Bell },
    { name: 'Statistics', path: '/statistics', icon: BarChart3 },
    { name: 'Users', path: '/users', icon: Users },
    { name: 'Organizations', path: '/organizations', icon: Building2 },
    { name: 'Records', path: '/crud-demo', icon: Database },
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
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-emerald-800 via-emerald-900 to-emerald-950 text-white transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 shadow-2xl flex flex-col`}
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>

        {/* Logo */}
        <div className="flex-shrink-0 relative z-10">
          <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
            <div className="relative">
              <div className="absolute -inset-1 bg-emerald-400/30 blur-xl rounded-xl animate-pulse"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <span className="text-lg font-bold">TP</span>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">TracePoint</h1>
              <p className="text-xs text-emerald-300/50">Missing Person Tracking System</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 relative z-10">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => toggleSidebar && toggleSidebar()}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-emerald-100/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="relative">
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-emerald-400' : 'text-emerald-300/50'}`} />
                  {item.badge && (
                    <span className="absolute -top-1 -right-2 min-w-[18px] h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1.5 animate-pulse">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1 h-6 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="flex-shrink-0 p-4 border-t border-white/10 bg-gradient-to-t from-emerald-950/80 to-transparent relative z-10">
          {/* User Profile */}
          <div className="flex items-center gap-3 mb-3 px-3 py-2 bg-white/5 rounded-xl border border-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Leila User</p>
              <p className="text-xs text-emerald-300/50">Administrator</p>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2 mb-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5">
            <Clock className="h-3.5 w-3.5 text-emerald-300/70" />
            <span className="text-xs text-emerald-200/80">
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
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-emerald-100/60 hover:bg-white/5 hover:text-white transition text-sm"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-300/60 hover:bg-red-500/20 hover:text-red-200 transition text-sm mt-0.5"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>

          <p className="text-[10px] text-emerald-300/20 text-center mt-3">
            v2.0.0
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent"></div>
      </div>
    </>
  );
};

export default Sidebar;
