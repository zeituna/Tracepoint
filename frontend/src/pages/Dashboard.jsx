import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Bell, Sun, Moon, User } from 'lucide-react'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isDark, setIsDark] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleTheme = () => setIsDark(!isDark)

  const stats = [
    { label: 'Total Reports', value: '1,248', icon: '📊' },
    { label: 'Active Cases', value: '482', icon: '📌' },
    { label: 'Resolved Cases', value: '766', icon: '✅' },
    { label: 'Users', value: '1,248', icon: '👥' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Navbar */}
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 sticky top-0 z-10 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <Menu size={22} className="text-gray-700 dark:text-gray-300" />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Dashboard</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              {isDark ? <Sun size={20} className="text-gray-400" /> : <Moon size={20} className="text-gray-600" />}
            </button>
            
            <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <Bell size={20} className="text-gray-600 dark:text-gray-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-800 dark:text-white">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold">
                <User size={18} />
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="p-6 max-w-7xl mx-auto">
          {/* Welcome Banner - Emerald + Gold Gradient */}
          <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 rounded-2xl p-6 text-white mb-6 shadow-xl">
            <h1 className="text-2xl font-bold">Welcome back, Admin! 🎉</h1>
            <p className="text-white/90 mt-1">Together we can help bring them home.</p>
            <div className="mt-3 flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">📋 1,248 Reports</span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">📌 482 Active</span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">✅ 766 Resolved</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md transition-all hover:border-primary-300 dark:hover:border-primary-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  </div>
                  <div className="text-3xl">{stat.icon}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">📊 Reports Overview</h3>
              <div className="h-48 flex items-center justify-center text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                Charts coming soon
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">📋 Recent Reports</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Report #{i}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Submitted 2 hours ago</p>
                    </div>
                    <span className="text-xs text-primary-600 dark:text-primary-400">View →</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
