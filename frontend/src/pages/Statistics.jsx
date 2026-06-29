import React from 'react'

const Statistics = () => {
  const stats = [
    { label: 'Total Reports', value: '1,248', change: '+12%', icon: '📊' },
    { label: 'Active Cases', value: '482', change: '+8%', icon: '📈' },
    { label: 'Resolved Cases', value: '766', change: '+15%', icon: '✅' },
    { label: 'Organizations', value: '120', change: '+5%', icon: '🏢' },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Statistics</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Analytics and insights</p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
          📥 Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">{stat.change} this month</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">📊 Reports Overview</h3>
          <div className="h-48 flex items-center justify-center text-gray-400 dark:text-gray-500">
            Chart coming soon
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">📈 Monthly Trend</h3>
          <div className="h-48 flex items-center justify-center text-gray-400 dark:text-gray-500">
            Trend chart coming soon
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics
