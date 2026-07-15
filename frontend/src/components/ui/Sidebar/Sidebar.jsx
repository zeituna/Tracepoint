import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  MapPin,
  Camera,
  MessageSquare,
  Bell,
  BarChart3,
  Users,
  Building2,
  FolderKanban,
  PieChart,
  Settings,
} from 'lucide-react'
import Logo from '../../Logo'

const Sidebar = ({ isOpen }) => {
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/reports', icon: FileText, label: 'Reports' },
    { path: '/map-tracking', icon: MapPin, label: 'Map & Tracking' },
    { path: '/facial-recognition', icon: Camera, label: 'Facial Recognition' },
    { path: '/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/alerts', icon: Bell, label: 'Alerts' },
    { path: '/statistics', icon: BarChart3, label: 'Statistics' },
  ]

  const managementItems = [
    { path: '/users', icon: Users, label: 'Users' },
    { path: '/organizations', icon: Building2, label: 'Organizations' },
    { path: '/case-management', icon: FolderKanban, label: 'Case Management' },
    { path: '/reports-analytics', icon: PieChart, label: 'Reports & Analytics' },
  ]

  return (
    <aside className={`fixed left-0 top-0 h-full w-64 border-r border-amber-200/10 bg-[linear-gradient(180deg,rgba(6,45,32,0.98)_0%,rgba(5,21,18,0.98)_100%)] text-white transition-transform duration-300 z-20 backdrop-blur-xl ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 shadow-[0_20px_60px_rgba(0,0,0,0.45)]`}>
      <div className="absolute top-0 right-0 w-40 h-40 bg-amber-300/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/70 to-transparent"></div>

      <div className="relative z-10 flex items-center gap-3 px-4 h-20 border-b border-amber-200/10 bg-white/[0.02]">
        <Logo size="lg" />
        <div className="min-w-0">
          <h1 className="text-[1.35rem] font-bold text-white leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
            TracePoint
          </h1>
          <p className="text-[10px] text-amber-100/75 mt-1 tracking-[0.16em] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
            Missing Person Tracking & Reporting System
          </p>
        </div>
      </div>

      <nav className="relative z-10 p-3 overflow-y-auto h-[calc(100vh-5rem)]">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-300
                ${isActive
                  ? 'bg-white/10 text-white shadow-[0_8px_24px_rgba(18,42,28,0.55)] ring-1 ring-amber-300/20'
                  : 'text-emerald-100/70 hover:bg-white/5 hover:text-white hover:translate-x-0.5'
                }
              `}
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
                isActive
                  ? 'border-amber-300/40 bg-[linear-gradient(135deg,rgba(252,211,77,0.28),rgba(245,158,11,0.12))] shadow-[0_0_18px_rgba(245,158,11,0.18)]'
                  : 'border-amber-200/10 bg-white/[0.03] group-hover:border-amber-300/20 group-hover:bg-white/[0.06]'
              }`}>
                <item.icon className={`h-[18px] w-[18px] transition-all duration-300 ${isActive ? 'text-amber-100' : 'text-amber-100/80 group-hover:text-amber-50'}`} strokeWidth={2.15} />
              </div>
              <span className="font-semibold tracking-[0.02em]">{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-amber-200/10">
          <p className="px-3 text-[11px] font-semibold text-amber-100/65 uppercase tracking-[0.18em]">Management</p>
          <div className="mt-2 space-y-1">
            {managementItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-300 pl-9
                  ${isActive
                    ? 'bg-white/10 text-white shadow-[0_8px_24px_rgba(18,42,28,0.55)] ring-1 ring-amber-300/20'
                    : 'text-emerald-100/70 hover:bg-white/5 hover:text-white hover:translate-x-0.5'
                  }
                `}
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'border-amber-300/40 bg-[linear-gradient(135deg,rgba(252,211,77,0.28),rgba(245,158,11,0.12))] shadow-[0_0_18px_rgba(245,158,11,0.18)]'
                    : 'border-amber-200/10 bg-white/[0.03] group-hover:border-amber-300/20 group-hover:bg-white/[0.06]'
                }`}>
                  <item.icon className={`h-[17px] w-[17px] transition-all duration-300 ${isActive ? 'text-amber-100' : 'text-amber-100/80 group-hover:text-amber-50'}`} strokeWidth={2.05} />
                </div>
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-amber-200/10">
          <NavLink
            to="/settings"
            className={({ isActive }) => `
              group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-300
              ${isActive
                ? 'bg-white/10 text-white shadow-[0_8px_24px_rgba(18,42,28,0.55)] ring-1 ring-amber-300/20'
                : 'text-emerald-100/70 hover:bg-white/5 hover:text-white hover:translate-x-0.5'
              }
            `}
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
              isActive
                ? 'border-amber-300/40 bg-[linear-gradient(135deg,rgba(252,211,77,0.28),rgba(245,158,11,0.12))] shadow-[0_0_18px_rgba(245,158,11,0.18)]'
                : 'border-amber-200/10 bg-white/[0.03] group-hover:border-amber-300/20 group-hover:bg-white/[0.06]'
            }`}>
              <Settings className={`h-[18px] w-[18px] transition-all duration-300 ${isActive ? 'text-amber-100' : 'text-amber-100/80 group-hover:text-amber-50'}`} strokeWidth={2.15} />
            </div>
            <span className="font-semibold tracking-[0.02em]">Settings</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
