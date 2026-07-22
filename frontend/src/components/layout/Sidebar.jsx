import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  MapPin,
  Scan,
  Settings,
  LogOut,
  Circle,
  Zap,
  Satellite,
  Briefcase,
  List,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  UserCog,
  Building2,
  Shield,
  BarChart3,
  Activity,
  Bell,
  MessageSquare,
  MessageCircle, // ← Add this for Chat icon
  Mail,
  ShieldCheck,
  Database,
  User,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [expandedSections, setExpandedSections] = useState({
    caseManagement: true,
    userManagement: false,
    analytics: false,
    communication: false,
    system: false,
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const isActive = (path) => {
    // Handle paths with query params
    const cleanPath = path.split('?')[0];
    return location.pathname === cleanPath;
  };

  const menuSections = [
    {
      id: 'caseManagement',
      label: 'Case Management',
      icon: Briefcase,
      items: [
        { path: '/reports', label: 'All Cases', icon: List },
        { path: '/reports?status=pending', label: 'Pending Reports', icon: Clock },
        { path: '/reports?status=active', label: 'Active Cases', icon: AlertTriangle },
        { path: '/reports?status=resolved', label: 'Resolved Cases', icon: CheckCircle },
        { path: '/reports?priority=high', label: 'High Priority Cases', icon: AlertTriangle },
        { path: '/map-tracking', label: 'Map Tracking', icon: MapPin },
        { path: '/facial-recognition', label: 'Facial Recognition', icon: Scan },
      ],
    },
    {
      id: 'userManagement',
      label: 'User Management',
      icon: Users,
      items: [
        { path: '/users', label: 'Users', icon: Users },
        { path: '/users?role=police', label: 'Police Officers', icon: UserCog },
        { path: '/organizations', label: 'Organizations', icon: Building2 },
        { path: '/settings?tab=roles', label: 'Roles & Permissions', icon: Shield },
      ],
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      items: [
        { path: '/statistics', label: 'Statistics', icon: BarChart3 },
        { path: '/reports', label: 'Reports', icon: FileText },
        { path: '/audit-logs', label: 'Audit Logs', icon: Activity },
      ],
    },
    {
      id: 'communication',
      label: 'Communication',
      icon: MessageSquare,
      items: [
        { path: '/alerts', label: 'Notifications', icon: Bell },
        { path: '/messages', label: 'Messages', icon: MessageSquare },
        { path: '/chat', label: 'Live Chat', icon: MessageCircle }, // ← Added Chat here
        { path: '/settings?tab=email', label: 'Email & SMS', icon: Mail },
      ],
    },
    {
      id: 'system',
      label: 'System',
      icon: Settings,
      items: [
        { path: '/settings', label: 'Settings', icon: Settings },
        { path: '/settings?tab=security', label: 'Security', icon: ShieldCheck },
        { path: '/system-health', label: 'System Health', icon: Activity },
        { path: '/backup-restore', label: 'Backup & Restore', icon: Database },
      ],
    },
  ];

  return (
    <aside className="fixed top-0 left-0 h-full w-72 bg-white shadow-2xl border-r border-gray-100 flex flex-col z-50 transition-all duration-300">
      
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-20 bg-gradient-to-r from-emerald-50 to-white border-b border-gray-100">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-200/60">
          TP
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">TracePoint</h1>
          <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-semibold">Missing Person System</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {/* Dashboard – always visible */}
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive('/dashboard')
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100/40'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <LayoutDashboard
                size={20}
                className={isActive('/dashboard') ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'}
              />
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
          </li>

          {/* Sections */}
          {menuSections.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSections[section.id];
            return (
              <li key={section.id} className="space-y-1">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center justify-between w-full px-4 py-2 rounded-xl text-left transition-all duration-200 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3 text-gray-500 hover:text-gray-900">
                    <Icon size={20} className="text-gray-400" />
                    <span className="text-sm font-medium">{section.label}</span>
                  </div>
                  {isExpanded ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
                </button>
                {isExpanded && (
                  <ul className="ml-6 space-y-1 border-l-2 border-gray-100 pl-3">
                    {section.items.map((item) => {
                      const ItemIcon = item.icon;
                      const active = isActive(item.path);
                      return (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 ${
                              active
                                ? 'bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100/40'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            <ItemIcon
                              size={18}
                              className={active ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'}
                            />
                            <span className="text-sm font-medium">{item.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom */}
      <div className="border-t border-gray-100 px-4 py-4 space-y-3">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50/80 rounded-xl border border-gray-100/50">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs text-gray-600 font-medium">Online</span>
          </div>
          <span className="text-xs text-gray-400 font-mono">
            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div className="flex gap-2">
          <Link
            to="/settings"
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-xl transition text-sm font-medium border border-transparent hover:border-gray-200"
          >
            <Settings size={18} />
            Settings
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition text-sm font-medium border border-transparent hover:border-red-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
          <Zap size={12} className="text-emerald-400" />
          <span className="tracking-wider">v2.0.0 · Secure</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;