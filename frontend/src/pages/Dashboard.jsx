import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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
  LogOut,
  Search,
  ChevronDown,
  WifiOff,
  Users as UsersIcon,
  Share2,
  MessageCircle
} from 'lucide-react'
import RealTimeCharts from '../components/charts/RealTimeCharts'
import SMSChat from '../components/rural/SMSChat'

const Dashboard = () => {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showSMSChat, setShowSMSChat] = useState(false)

  const handleLogout = () => {
    navigate('/login')
  }

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/reports', label: 'Reports', icon: FileText },
    { path: '/map-tracking', label: 'Map & Tracking', icon: MapPin },
    { path: '/facial-recognition', label: 'Facial Recognition', icon: Camera },
    { path: '/messages', label: 'Messages', icon: MessageSquare },
    { path: '/alerts', label: 'Alerts', icon: Bell },
    { path: '/statistics', label: 'Statistics', icon: BarChart3 },
  ]

  const managementItems = [
    { path: '/users', label: 'Users', icon: Users },
    { path: '/organizations', label: 'Organizations', icon: Building2 },
    { path: '/case-management', label: 'Case Management', icon: FolderKanban },
    { path: '/reports-analytics', label: 'Reports & Analytics', icon: PieChart },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between px-6 h-16 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold shadow-lg shadow-primary-500/25">
              TP
            </div>
            <div>
              <span className="text-lg font-bold text-gray-900 dark:text-white block">TracePoint</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">v1.0.0</span>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">✕</button>
        </div>

        <nav className="p-4 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Main</p>
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200">
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            <p className="px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Management</p>
            {managementItems.map((item) => (
              <Link key={item.path} to={item.path} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200">
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            <Link to="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200">
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200 w-full">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Navbar */}
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                <LayoutDashboard size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <Search size={18} className="text-gray-400" />
                <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 w-40" />
              </div>
              <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                <Bell size={20} className="text-gray-600 dark:text-gray-400" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
              </button>

              <div className="relative">
                <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl p-2 transition-colors">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold shadow-lg shadow-primary-500/25">A</div>
                  <ChevronDown size={16} className="text-gray-400" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">admin@tracepoint.com</p>
                    </div>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors flex items-center gap-2">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 max-w-7xl mx-auto">
          {/* Welcome Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 p-8 mb-8 shadow-xl shadow-primary-500/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">👋</span>
                <h1 className="text-2xl font-bold text-white">Welcome back, Admin!</h1>
              </div>
              <p className="text-white/90 text-sm max-w-md">Together we can help bring them home. Track missing persons and manage cases efficiently.</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">📋 1,248 Reports</span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">📌 482 Active</span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">✅ 766 Resolved</span>
                <span className="px-3 py-1 bg-yellow-400/30 backdrop-blur-sm rounded-full text-xs text-white flex items-center gap-1">
                  <WifiOff size={12} />
                  SMS/USSD Chat
                </span>
                <span className="px-3 py-1 bg-emerald-400/30 backdrop-blur-sm rounded-full text-xs text-white flex items-center gap-1">
                  <UsersIcon size={12} />
                  Sender/Receiver Visible
                </span>
              </div>
            </div>
          </div>

          {/* SMS/USSD Chat Toggle */}
          <div className="mb-6">
            <button
              onClick={() => setShowSMSChat(!showSMSChat)}
              className="flex items-center gap-3 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium mb-4 px-4 py-2 bg-primary-50 dark:bg-primary-950/30 rounded-xl border border-primary-200 dark:border-primary-800 transition-all"
            >
              <MessageCircle size={18} />
              {showSMSChat ? 'Hide SMS/USSD Chat' : '📱 SMS/USSD Chat (Sender/Receiver Visible)'}
              <span className="text-sm">{showSMSChat ? '▲' : '▼'}</span>
            </button>

            {showSMSChat && (
              <div className="mb-6">
                <SMSChat />
              </div>
            )}
          </div>

          {/* Real-Time Charts */}
          <RealTimeCharts />
        </main>
      </div>
    </div>
  )
}

export default Dashboard
