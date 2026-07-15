import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bell,
  ChevronRight,
  Crown,
  LayoutGrid,
  LogOut,
  Search,
  Settings,
  Sun,
  User,
  Moon,
  UserCircle,
} from 'lucide-react';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'New case alert',
      detail: 'Three high-priority reports were escalated for review.',
      time: '2 min ago',
    },
    {
      id: 2,
      title: 'Field update received',
      detail: 'A responder submitted fresh location coordinates.',
      time: '12 min ago',
    },
    {
      id: 3,
      title: 'System check complete',
      detail: 'All tracking services are currently healthy.',
      time: '28 min ago',
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setShowProfileMenu(false);
    navigate('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />

      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${collapsed ? 'lg:ml-24' : 'lg:ml-72'}`}>
        <header className="border-b border-amber-200/10 bg-[linear-gradient(90deg,rgba(6,45,32,0.98),rgba(8,57,39,0.96))] px-4 md:px-6 py-4 text-white shadow-[0_10px_30px_rgba(0,0,0,0.16)]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-lg border border-amber-200/10 bg-white/[0.03] text-amber-100"
              >
                <LayoutGrid size={18} />
              </button>
              <div className="hidden md:flex items-center gap-2 text-amber-100/70 text-sm">
                <span>TracePoint</span>
                <ChevronRight size={14} />
                <span>Dashboard</span>
              </div>
            </div>

            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-100/70" />
                <input
                  type="text"
                  placeholder="Search cases, users, reports..."
                  className="w-full rounded-xl border border-amber-200/10 bg-white/[0.04] py-2.5 pl-9 pr-4 text-sm text-white placeholder-amber-100/55 outline-none focus:border-amber-300/40 focus:bg-white/[0.06]"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="rounded-xl border border-amber-200/10 bg-white/[0.03] p-2 text-amber-100/80 hover:text-amber-50 transition"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => {
                    setShowNotifications((prev) => !prev);
                    setShowProfileMenu(false);
                  }}
                  className="relative rounded-xl border border-amber-200/10 bg-white/[0.03] p-2 text-amber-100/80 hover:text-amber-50 transition"
                >
                  <Bell size={18} />
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.8)]"></span>
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.96 }}
                      className="absolute right-0 top-12 w-80 rounded-2xl border border-amber-200/10 bg-white text-slate-900 shadow-2xl overflow-hidden z-50"
                    >
                      <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-amber-50 to-emerald-50 px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Bell size={16} className="text-amber-500" />
                          <p className="text-sm font-semibold text-slate-800">Notifications</p>
                        </div>
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">3 new</span>
                      </div>

                      <div className="max-h-72 overflow-y-auto">
                        {notifications.map((item) => (
                          <div key={item.id} className="border-b border-slate-100 px-4 py-3 last:border-none">
                            <p className="text-sm font-medium text-slate-800">{item.title}</p>
                            <p className="mt-1 text-xs text-slate-500">{item.detail}</p>
                            <p className="mt-1 text-[11px] text-amber-600">{item.time}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => {
                    setShowProfileMenu((prev) => !prev);
                    setShowNotifications(false);
                  }}
                  className="flex items-center gap-3 rounded-xl border border-amber-200/10 bg-white/[0.03] px-2.5 py-1.5 text-left transition hover:bg-white/[0.05]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(252,211,77,0.85),rgba(245,158,11,0.9))] text-emerald-950">
                    <User size={17} />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-white">Leila User</p>
                    <p className="text-[11px] text-amber-100/65">Administrator</p>
                  </div>
                </button>

                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.96 }}
                      className="absolute right-0 top-12 w-64 rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl overflow-hidden z-50"
                    >
                      <div className="border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-amber-50 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(16,185,129,0.95),rgba(245,158,11,0.95))] text-white">
                            <UserCircle size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">Leila User</p>
                            <p className="text-xs text-slate-500">Administrator</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <UserCircle size={16} className="text-slate-500" />
                          Profile
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <Settings size={16} className="text-slate-500" />
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        <main className="relative flex-1 overflow-y-auto p-4 md:p-6">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-56 h-56 bg-amber-300/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-600/5 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
