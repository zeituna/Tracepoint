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
    <aside className={`fixed left-0 top-0 h-full w-64 bg-gray-900 dark:bg-gray-950 text-white transition-transform duration-300 z-20 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      {/* Brand - Emerald + Gold Gradient */}
      <div className="flex items-center gap-2 px-4 h-16 border-b border-gray-800 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center font-bold text-sm">
          TP
        </div>
        <span className="text-xl font-bold tracking-tight">TracePoint</span>
      </div>

      {/* Navigation */}
      <nav className="p-3 overflow-y-auto h-[calc(100vh-4rem)]">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
                ${isActive 
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/30' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }
              `}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-800">
          <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Management</p>
          <div className="mt-2 space-y-1">
            {managementItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all pl-9
                  ${isActive 
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/30' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }
                `}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-800">
          <NavLink
            to="/settings"
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
              ${isActive 
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/30' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }
            `}
          >
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
