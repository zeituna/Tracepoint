import React from 'react'

const ReportsAnalytics = () => {
  const stats = [
    { label: 'Total Reports', value: '1,248', change: '+12%' },
    { label: 'Active Cases', value: '482', change: '+8%' },
    { label: 'Resolved Cases', value: '766', change: '+15%' },
    { label: 'Pending Review', value: '124', change: '-3%' },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Detailed reports and insights</p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
          📊 Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
            <p className={`text-xs mt-1 ${stat.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {stat.change} this month
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">📈 Monthly Reports</h3>
          <div className="h-48 flex items-center justify-center text-gray-400 dark:text-gray-500">
            Chart coming soon
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">📊 Status Distribution</h3>
          <div className="h-48 flex items-center justify-center text-gray-400 dark:text-gray-500">
            Pie chart coming soon
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsAnalytics
