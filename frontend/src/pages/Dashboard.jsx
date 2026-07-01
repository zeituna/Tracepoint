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
  TrendingUp,
  Activity,
  Clock,
  CheckCircle
} from 'lucide-react'
import Footer from '../components/ui/Footer'

const Dashboard = () => {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const handleLogout = () => {
    navigate('/login')
  }

  const stats = [
    { label: 'Total Reports', value: '24', change: '+8%', icon: FileText },
    { label: 'Active Cases', value: '4', change: '+5%', icon: Activity },
    { label: 'Resolved Cases', value: '12', change: '+12%', icon: CheckCircle },
    { label: 'Total Users', value: '6', change: '+3%', icon: Users },
  ]

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/reports', label: 'Reports', icon: FileText },
    { path: '/map-tracking', label: 'Map Tracking', icon: MapPin },
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
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          <div className="flex items-center gap-3 px-6 h-16 border-b border-gray-200 dark:border-gray-800">
            <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center text-white font-bold text-sm">TP</div>
            <div>
              <span className="text-lg font-bold text-gray-900 dark:text-white block">TracePoint</span>
              <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">v2.0.0</span>
            </div>
          </div>
          <nav className="p-4 overflow-y-auto h-[calc(100vh-4rem)]">
            <div className="space-y-0.5">
              <p className="px-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Main</p>
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-green-50 hover:text-green-600 group">
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="px-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Management</p>
              <div className="space-y-0.5">
                {managementItems.map((item) => (
                  <Link key={item.path} to={item.path} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium pl-9 text-gray-600 hover:bg-green-50 hover:text-green-600 group">
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <Link to="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-green-50 hover:text-green-600 group">
                <Settings size={20} />
                <span>Settings</span>
              </Link>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-red-600 hover:bg-red-50 group">
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : ''} flex flex-col`}>
          {/* Navbar */}
          <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
            <div className="flex items-center justify-between px-6 h-16">
              <div className="flex items-center gap-4">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-green-50 rounded-xl">
                  <LayoutDashboard size={20} className="text-gray-600" />
                </button>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
                  <p className="text-xs text-gray-500">Welcome back, here's what's happening</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl">
                  <Search size={18} className="text-gray-400" />
                  <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 w-32 focus:w-48 transition-all" />
                </div>
                <button className="relative p-2 hover:bg-green-50 rounded-xl">
                  <Bell size={20} className="text-gray-600" />
                </button>
                <div className="relative">
                  <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-3 pl-3 border-l border-gray-200 hover:bg-green-50 rounded-xl p-2">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium text-gray-900">Admin</p>
                      <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center text-white font-semibold">A</div>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">Admin</p>
                        <p className="text-xs text-gray-500">admin@tracepoint.com</p>
                      </div>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-950">
            {/* Welcome Banner */}
            <div className="rounded-2xl bg-green-600 p-8 mb-8 text-white shadow-lg shadow-green-600/20">
              <h1 className="text-2xl font-bold">Welcome back, Admin 🎉</h1>
              <p className="text-green-100 mt-1">Together we can help bring them home.</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs">24 Reports</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs">4 Active</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs">12 Resolved</span>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                        <TrendingUp size={12} />
                        {stat.change}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-green-50">
                      <stat.icon size={20} className="text-green-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Clock size={16} className="text-green-600" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-green-50 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-xl">📋</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Amina Hassan</p>
                    <p className="text-xs text-gray-500">New report submitted from Wajir</p>
                  </div>
                  <span className="text-xs text-gray-400">2 min ago</span>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-green-50 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-xl">📝</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Mohamed Ali</p>
                    <p className="text-xs text-gray-500">Case updated - Mandera</p>
                  </div>
                  <span className="text-xs text-gray-400">15 min ago</span>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
