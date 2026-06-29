import React from 'react'

const Alerts = () => {
  const alerts = [
    { id: 1, type: 'success', title: 'Report Resolved', message: 'Missing person report #123 has been resolved successfully.', time: '2 hours ago' },
    { id: 2, type: 'warning', title: 'New Report', message: 'A new missing person report has been submitted for Amina Hassan.', time: '4 hours ago' },
    { id: 3, type: 'info', title: 'Case Update', message: 'Case #456 has been updated with new information.', time: '6 hours ago' },
    { id: 4, type: 'error', title: 'Alert', message: 'Suspicious activity detected in Nairobi area.', time: '1 day ago' },
  ]

  const getTypeStyles = (type) => {
    switch(type) {
      case 'success': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 'warning': return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
      case 'error': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      default: return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
    }
  }

  const getIcon = (type) => {
    switch(type) {
      case 'success': return '✅'
      case 'warning': return '⚠️'
      case 'error': return '❌'
      default: return 'ℹ️'
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Alerts</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">System notifications</p>
        </div>
        <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium">
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className={`p-4 rounded-xl border ${getTypeStyles(alert.type)} transition-colors`}>
            <div className="flex items-start gap-3">
              <div className="text-2xl">{getIcon(alert.type)}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{alert.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{alert.time}</p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{alert.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Alerts
