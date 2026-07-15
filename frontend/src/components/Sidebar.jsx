import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
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
  FolderKanban,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import Logo from './Logo';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: MapPin, label: 'Map Tracking', path: '/map-tracking' },
    { icon: ScanFace, label: 'Facial Recognition', path: '/facial-recognition' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Bell, label: 'Alerts', path: '/alerts' },
    { icon: BarChart3, label: 'Statistics', path: '/statistics' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Building2, label: 'Organizations', path: '/organizations' },
    { icon: FolderKanban, label: 'Case Management', path: '/case-management' },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  const NavItem = ({ icon: Icon, label, path }) => {
    const isActive = location.pathname === path;

    return (
      <NavLink
        to={path}
        onClick={() => setMobileOpen(false)}
        className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
          isActive
            ? 'bg-white/10 text-white shadow-[0_8px_24px_rgba(18,42,28,0.55)] ring-1 ring-amber-300/20'
            : 'text-emerald-100/70 hover:bg-white/5 hover:text-white hover:translate-x-0.5'
        } ${collapsed ? 'justify-center px-2' : ''}`}
      >
        <div className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
          isActive
            ? 'border-amber-300/40 bg-[linear-gradient(135deg,rgba(252,211,77,0.28),rgba(245,158,11,0.12))] shadow-[0_0_18px_rgba(245,158,11,0.18)]'
            : 'border-amber-200/10 bg-white/[0.03] group-hover:border-amber-300/20 group-hover:bg-white/[0.06]'
        }`}>
          <Icon
            className={`h-[18px] w-[18px] transition-all duration-300 ${
              isActive ? 'text-amber-100' : 'text-amber-100/80 group-hover:text-amber-50'
            }`}
            strokeWidth={2.15}
          />
        </div>
        {!collapsed && <span className="text-sm font-semibold tracking-[0.02em]">{label}</span>}
      </NavLink>
    );
  };

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-white rounded-lg shadow-lg text-emerald-900"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] z-40 flex flex-col transition-all duration-300 border-r border-amber-200/10 bg-[linear-gradient(180deg,rgba(6,45,32,0.98)_0%,rgba(5,21,18,0.98)_100%)] text-white backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] ${
        collapsed ? 'w-20' : 'w-64'
      } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="absolute top-0 right-0 w-40 h-40 bg-amber-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/70 to-transparent"></div>

        <div className="relative z-10 px-4 py-4 border-b border-amber-200/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <Logo size="lg" />
            {!collapsed && (
              <div className="min-w-0">
                <h1
                  className="text-[1.3rem] font-bold text-white leading-none"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  TracePoint
                </h1>
                <p
                  className="text-[10px] text-amber-100/75 mt-1 tracking-[0.16em] font-medium"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Missing Person Tracking & Reporting System
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 relative z-10">
          {menuItems.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}

          <div className="mt-4 pt-4 border-t border-amber-200/10">
            <NavLink
              to="/settings"
              className={({ isActive }) => `group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-white/10 text-white shadow-[0_8px_24px_rgba(18,42,28,0.55)] ring-1 ring-amber-300/20'
                  : 'text-emerald-100/70 hover:bg-white/5 hover:text-white hover:translate-x-0.5'
              } ${collapsed ? 'justify-center px-2' : ''}`}
            >
              <div className={`relative flex h-8 w-8 items-center justify-center transition-all duration-300 ${
                location.pathname === '/settings' ? 'text-amber-100' : 'text-amber-100/80 group-hover:text-amber-50'
              }`}>
                <Settings className="h-[18px] w-[18px]" strokeWidth={2.1} />
              </div>
              {!collapsed && <span className="text-sm font-semibold tracking-[0.02em]">Settings</span>}
            </NavLink>
          </div>
        </div>

        <div className="border-t border-amber-200/10 px-4 py-4 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(5,12,9,0.8))] flex-shrink-0 relative z-10">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mb-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs uppercase tracking-[0.18em] text-amber-100/70 hover:bg-white/5 hover:text-amber-50 transition"
          >
            <Menu size={14} />
            {!collapsed && 'Collapse'}
          </button>

          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-red-300/70 hover:bg-red-500/20 hover:text-red-200 transition-colors ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="h-[18px] w-[18px]" strokeWidth={2.1} />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
