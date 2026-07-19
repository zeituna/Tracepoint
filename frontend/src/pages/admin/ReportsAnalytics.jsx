import React from 'react'
import { FileText, TrendingUp, TrendingDown, Download, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react'

const ReportsAnalytics = () => {
  const stats = [
    { label: 'Total Reports', value: '24', change: '+8%', icon: FileText, color: 'text-green-600' },
    { label: 'Resolved', value: '12', change: '+12%', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Pending', value: '8', change: '-3%', icon: Clock, color: 'text-amber-600' },
    { label: 'Active', value: '4', change: '+5%', icon: AlertCircle, color: 'text-green-600' },
  ]

  // Monthly data for chart
  const monthlyData = [
    { month: 'Jan', reports: 2, resolved: 1 },
    { month: 'Feb', reports: 3, resolved: 2 },
    { month: 'Mar', reports: 4, resolved: 3 },
    { month: 'Apr', reports: 3, resolved: 2 },
    { month: 'May', reports: 5, resolved: 3 },
    { month: 'Jun', reports: 7, resolved: 4 },
  ]

  // Status distribution data
  const statusData = [
    { name: 'Active', value: 4, color: '#f59e0b' },
    { name: 'Resolved', value: 12, color: '#10b981' },
    { name: 'Pending', value: 8, color: '#ef4444' },
  ]

  const maxValue = Math.max(...monthlyData.map(d => d.reports))

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Detailed reports and insights</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-green-600/20 flex items-center gap-2">
          <Download size={18} />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                <p className={`text-xs flex items-center gap-1 mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change.startsWith('+') ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {stat.change}
                </p>
              </div>
              <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Reports Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
            <Calendar size={16} className="text-green-600" />
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
                    className="w-full bg-blue-500 rounded-b-sm transition-all duration-500 hover:bg-blue-600"
                    style={{ height: `${(item.resolved / maxValue) * 100}px`, minHeight: '8px' }}
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
              <span className="w-2 h-2 bg-blue-500 rounded-sm"></span>
              Resolved
            </span>
          </div>
        </div>

        {/* Status Distribution Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
            <CheckCircle size={16} className="text-green-600" />
            Status Distribution
          </h3>
          <div className="space-y-4">
            {statusData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.value}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${(item.value / 24) * 100}%`,
                      backgroundColor: item.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Total Cases</span>
              <span className="font-bold text-gray-900 dark:text-white">24</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resolution Rate */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">✅ Resolution Rate</h3>
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
    </div>
  )
}

export default ReportsAnalytics
