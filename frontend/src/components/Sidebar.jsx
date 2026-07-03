import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: '📊', label: 'Dashboard', path: '/dashboard' },
    { icon: '📄', label: 'Reports', path: '/reports' },
    { icon: '📍', label: 'Map Tracking', path: '/map-tracking' },
    { icon: '📷', label: 'Facial Recognition', path: '/facial-recognition' },
    { icon: '💬', label: 'Messages', path: '/messages' },
    { icon: '🔔', label: 'Alerts', path: '/alerts' },
    { icon: '📈', label: 'Statistics', path: '/statistics' },
    { icon: '👥', label: 'Users', path: '/users' },
    { icon: '🏢', label: 'Organizations', path: '/organizations' },
    { icon: '📁', label: 'Case Management', path: '/case-management' },
    { icon: '⚙️', label: 'Settings', path: '/settings' },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  const NavItem = ({ icon, label, path }) => {
    const isActive = location.pathname === path;
    return (
      <a
        href={path}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
          isActive 
            ? 'bg-emerald-50 text-emerald-700 font-medium shadow-sm' 
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        } ${collapsed ? 'justify-center' : ''}`}
      >
        <span className="text-lg flex-shrink-0">{icon}</span>
        {!collapsed && <span className="text-sm font-medium">{label}</span>}
      </a>
    );
  };

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {mobileOpen ? '✕' : '☰'}
      </button>

      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] bg-white border-r border-gray-200 z-40 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* No logo here - removed to avoid duplication */}
        <div className="h-4 flex-shrink-0"></div>

        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {menuItems.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
        </div>

        <div className="border-t border-gray-100 px-4 py-4 bg-gray-50/50 flex-shrink-0">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors ${collapsed ? 'justify-center' : ''}`}
          >
            <span className="text-lg">🚪</span>
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
