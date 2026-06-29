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
  X
} from 'lucide-react'

const Sidebar = ({ isOpen, setIsOpen }) => {
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
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-[260px] bg-gray-900 dark:bg-gray-950 text-white
        transition-transform duration-300 ease-in-out
        flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:w-[260px] lg:flex-shrink-0
      `}>
        {/* Brand */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center font-bold text-sm">
              TP
            </div>
            <span className="text-xl font-bold tracking-tight">TracePoint</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
                  ${isActive 
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30' 
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
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30' 
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
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-gray-800">
          <NavLink
            to="/settings"
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
              ${isActive 
                ? 'bg-primary-600 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }
            `}
          >
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
