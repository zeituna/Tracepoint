import React from 'react'
import { FileText, Users, CheckCircle, Clock, TrendingUp, TrendingDown, Download } from 'lucide-react'

const Statistics = () => {
  const stats = [
    { label: 'Total Reports', value: '24', change: '+8%', icon: FileText, color: 'text-green-600' },
    { label: 'Active Cases', value: '8', change: '+5%', icon: Clock, color: 'text-green-600' },
    { label: 'Resolved Cases', value: '12', change: '+12%', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Total Users', value: '6', change: '+3%', icon: Users, color: 'text-green-600' },
  ]

  // Monthly data for chart
  const monthlyData = [
    { month: 'Jan', reports: 2, resolved: 1 },
    { month: 'Feb', reports: 3, resolved: 2 },
    { month: 'Mar', reports: 4, resolved: 3 },
    { month: 'Apr', reports: 5, resolved: 3 },
    { month: 'May', reports: 6, resolved: 4 },
    { month: 'Jun', reports: 4, resolved: 3 },
  ]

  const maxValue = Math.max(...monthlyData.map(d => Math.max(d.reports, d.resolved)))

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Statistics</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Real-time analytics and insights</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-green-600/20 flex items-center gap-2">
          <Download size={18} />
          Export Report
        </button>
      </div>

      {/* Stats Cards - Green & White */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 mt-1">
                  <TrendingUp size={12} />
                  {stat.change} this month
                </p>
              </div>
              <div className={`p-2 rounded-lg bg-green-50 dark:bg-green-950/20 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Reports Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
            <span className="text-green-600">📈</span>
            Monthly Reports
          </h3>
          <div className="h-56 flex items-end justify-between gap-2 pt-2">
            {monthlyData.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-1 flex-1">
                <div className="w-full flex flex-col items-center gap-0.5">
                  <div 
                    className="w-full bg-green-500 rounded-t-sm transition-all duration-500 hover:bg-green-600"
                    style={{ height: `${(item.reports / maxValue) * 150}px`, minHeight: '8px' }}
                  ></div>
                  <div 
                    className="w-full bg-blue-400 rounded-b-sm transition-all duration-500 hover:bg-blue-500"
                    style={{ height: `${(item.resolved / maxValue) * 120}px`, minHeight: '8px' }}
                  ></div>
                </div>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">{item.month}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-sm"></span>
              Reports
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-400 rounded-sm"></span>
              Resolved
            </span>
          </div>
        </div>

        {/* Case Status - Green & White */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
            <span className="text-green-600">📊</span>
            Case Status
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Active Cases</span>
                <span className="font-medium text-gray-900 dark:text-white">8</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full transition-all duration-1000" style={{ width: '33%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Resolved Cases</span>
                <span className="font-medium text-gray-900 dark:text-white">12</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full transition-all duration-1000" style={{ width: '50%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Pending Review</span>
                <span className="font-medium text-gray-900 dark:text-white">4</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div className="bg-yellow-500 h-3 rounded-full transition-all duration-1000" style={{ width: '17%' }}></div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Total Cases</span>
              <span className="font-bold text-green-600">24</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resolution Rate - Green & White */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <span className="text-green-600">✅</span>
              Resolution Rate
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Cases resolved vs total cases</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">50%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Resolution Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Resolved</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Cases</p>
            </div>
          </div>
        </div>
        <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div className="bg-green-500 h-3 rounded-full transition-all duration-1000" style={{ width: '50%' }}></div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
          <span className="text-green-600">🕐</span>
          Recent Activity
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 hover:bg-green-50 dark:hover:bg-green-950/10 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-lg">📋</span>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">New report submitted</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Amina Hassan • Wajir, Kenya • 2 hours ago</p>
              </div>
            </div>
            <span className="text-xs text-green-600">New</span>
          </div>
          <div className="flex items-center justify-between p-2 hover:bg-green-50 dark:hover:bg-green-950/10 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-lg">✅</span>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Case resolved</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Aisha Hassan • Wajir, Kenya • 1 day ago</p>
              </div>
            </div>
            <span className="text-xs text-blue-600">Resolved</span>
          </div>
          <div className="flex items-center justify-between p-2 hover:bg-green-50 dark:hover:bg-green-950/10 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-lg">👤</span>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">New user registered</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Mohamed Hassan • Mandera, Kenya • 2 days ago</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">Registered</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics
