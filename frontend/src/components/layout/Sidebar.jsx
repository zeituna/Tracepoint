import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import {
  LayoutDashboard,
  FileText,
  MapPin,
  ScanFace,
  MessageSquare,
  Bell,
  BarChart3,
  Users,
  Building2,
  Settings,
  LogOut,
  User,
  Clock,
  Activity,
  ClipboardList,
  ShieldCheck,
  CircleHelp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar, collapsed, onToggleCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;
      const response = await fetch('http://localhost:5000/api/messages/unread/count', {
        headers: { Authorization: `Bearer ${token}` },
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

  const menuSections = [
    {
      title: 'Overview',
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Analytics', path: '/statistics', icon: BarChart3 },
      ],
    },
    {
      title: 'Operations',
      items: [
        { name: 'Report Missing Person', path: '/reports', icon: FileText },
        { name: 'Active Cases', path: '/map-tracking', icon: ClipboardList },
        { name: 'Map Tracking', path: '/map-tracking', icon: MapPin },
        { name: 'Facial Recognition', path: '/facial-recognition', icon: ScanFace },
        { name: 'Alerts', path: '/alerts', icon: Bell, badge: unreadCount > 0 ? unreadCount : null },
        { name: 'Messages', path: '/messages', icon: MessageSquare },
      ],
    },
    {
      title: 'Administration',
      items: [
        { name: 'Organizations', path: '/organizations', icon: Building2 },
        { name: 'Users', path: '/users', icon: Users },
        { name: 'Settings', path: '/settings', icon: Settings },
        { name: 'Help & Support', path: '/reports', icon: CircleHelp },
      ],
    },
  ];

  const sideWidth = collapsed ? 'w-24' : 'w-72';

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={toggleSidebar} />}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full ${sideWidth} flex-col border-r border-amber-200/10 bg-[linear-gradient(180deg,rgba(6,45,32,0.98)_0%,rgba(5,21,18,0.98)_100%)] text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-amber-300/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl"></div>
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.13),transparent_60%)] blur-3xl"></div>
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/70 to-transparent"></div>

        <div className="relative z-10 flex-shrink-0">
          <div className="flex items-center justify-between gap-3 border-b border-amber-200/10 bg-white/[0.02] px-4 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <Logo size="lg" />
              {!collapsed && (
                <div className="min-w-0">
                  <h1 className="text-[1.35rem] font-bold leading-none text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    TracePoint
                  </h1>
                  <p className="mt-1 text-[10px] font-medium tracking-[0.16em] text-amber-100/75" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Missing Person Tracking & Reporting System
                  </p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onToggleCollapse}
              className="hidden h-8 w-8 items-center justify-center rounded-full border border-amber-200/10 bg-white/[0.03] text-amber-100/80 transition hover:text-amber-50 lg:flex"
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>
        </div>

        <nav className="relative z-10 flex-1 space-y-4 overflow-y-auto px-3 py-4">
          {menuSections.map((section) => (
            <div key={section.title} className="space-y-1">
              {!collapsed && (
                <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-100/55">{section.title}</div>
              )}
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => toggleSidebar && toggleSidebar()}
                    className={`group flex items-center gap-3 rounded-xl transition-all duration-300 ${
                      collapsed ? 'justify-center px-2 py-3' : 'px-3 py-2.5'
                    } ${
                      isActive
                        ? 'bg-white/10 text-white shadow-[0_8px_24px_rgba(18,42,28,0.55)] ring-1 ring-amber-300/20'
                        : 'text-emerald-100/70 hover:bg-white/5 hover:text-white hover:translate-x-0.5'
                    }`}
                  >
                    <div
                      className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
                        isActive
                          ? 'border-amber-300/40 bg-[linear-gradient(135deg,rgba(252,211,77,0.28),rgba(245,158,11,0.12))] shadow-[0_0_18px_rgba(245,158,11,0.18)]'
                          : 'border-amber-200/10 bg-white/[0.03] group-hover:border-amber-300/20 group-hover:bg-white/[0.06]'
                      }`}
                    >
                      <item.icon className={`h-[18px] w-[18px] transition-all duration-300 ${isActive ? 'text-amber-100' : 'text-amber-100/80 group-hover:text-amber-50'}`} strokeWidth={2.15} />
                      {item.badge && (
                        <span className="absolute -right-2 -top-1 flex h-5 min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white animate-pulse">
                          {item.badge > 9 ? '9+' : item.badge}
                        </span>
                      )}
                    </div>
                    {!collapsed && <span className="text-sm font-semibold tracking-[0.02em]">{item.name}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="relative z-10 flex-shrink-0 border-t border-amber-200/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(5,12,9,0.8))] p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl border border-amber-100/10 bg-white/[0.05] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-amber-200 to-amber-500 shadow-lg shadow-amber-500/20">
              <User className="h-5 w-5 text-emerald-950" />
            </div>
            {!collapsed && (
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Leila User</p>
                <p className="text-xs text-emerald-300/50">Administrator</p>
              </div>
            )}
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
          </div>

          {!collapsed && (
            <div className="mb-2 flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-1.5">
              <Clock className="h-3.5 w-3.5 text-emerald-300/70" />
              <span className="text-xs text-emerald-200/80">{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              <span className="text-xs text-emerald-300/50">•</span>
              <span className="flex items-center gap-1 text-xs text-emerald-300/50">
                <Activity className="h-3 w-3 text-emerald-400" />
                Online
              </span>
            </div>
          )}

          <div className="space-y-1">
            <Link
              to="/settings"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-emerald-100/60 transition hover:bg-white/5 hover:text-white ${collapsed ? 'justify-center' : ''}`}
            >
              <Settings className="h-4 w-4" />
              {!collapsed && <span>Settings</span>}
            </Link>

            <button
              onClick={handleLogout}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-300/60 transition hover:bg-red-500/20 hover:text-red-200 ${collapsed ? 'justify-center' : ''}`}
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
