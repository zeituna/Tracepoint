import React, { useState } from 'react'
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  XCircle, 
  Clock, 
  Search,
  Eye,
  Check,
  Trash2,
  X,
  Shield,
  AlertOctagon,
  MessageSquare,
  Users,
  FileCheck,
  Clock as ClockIcon
} from 'lucide-react'

const Alerts = () => {
  const [filterType, setFilterType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const [alerts, setAlerts] = useState([
    { 
      id: 1, 
      type: 'success', 
      title: 'Report Resolved', 
      message: 'Missing person report 123 has been resolved successfully. The person has been found safe.',
      time: '2 hours ago', 
      read: false,
      priority: 'High',
      icon: <FileCheck size={20} />
    },
    { 
      id: 2, 
      type: 'warning', 
      title: 'New Report Submitted', 
      message: 'A new missing person report has been submitted for Amina Hassan. Please review the case.',
      time: '4 hours ago', 
      read: false,
      priority: 'Medium',
      icon: <MessageSquare size={20} />
    },
    { 
      id: 3, 
      type: 'info', 
      title: 'Case Updated', 
      message: 'Case 456 has been updated with new information. A witness has come forward.',
      time: '6 hours ago', 
      read: true,
      priority: 'Low',
      icon: <Info size={20} />
    },
    { 
      id: 4, 
      type: 'error', 
      title: 'Urgent Alert', 
      message: 'Suspicious activity detected in Nairobi area. Multiple reports of missing persons in the same region.',
      time: '1 day ago', 
      read: true,
      priority: 'High',
      icon: <AlertOctagon size={20} />
    },
    { 
      id: 5, 
      type: 'success', 
      title: 'Case Closed', 
      message: 'Missing person case 789 has been successfully closed. The individual has been reunited with family.',
      time: '2 days ago', 
      read: true,
      priority: 'Medium',
      icon: <Shield size={20} />
    },
    {
      id: 6,
      type: 'warning',
      title: 'Pending Review',
      message: 'Report 234 requires your review. Additional information has been submitted.',
      time: '3 hours ago',
      read: false,
      priority: 'High',
      icon: <ClockIcon size={20} />
    }
  ])

  const getTypeStyles = (type) => {
    const styles = {
      success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
      warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
      error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
      info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    }
    return styles[type] || styles.info
  }

  const getTypeIcon = (type) => {
    const icons = {
      success: <CheckCircle size={20} />,
      warning: <AlertTriangle size={20} />,
      error: <XCircle size={20} />,
      info: <Info size={20} />,
    }
    return icons[type] || icons.info
  }

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200',
      'Medium': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200',
      'Low': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200',
    }
    return colors[priority] || colors.Low
  }

  const getPriorityIcon = (priority) => {
    const icons = {
      'High': <AlertOctagon size={14} />,
      'Medium': <AlertTriangle size={14} />,
      'Low': <Info size={14} />,
    }
    return icons[priority] || icons.Low
  }

  const handleMarkRead = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ))
  }

  const handleMarkAllRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, read: true })))
  }

  const handleDelete = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id))
  }

  const handleViewDetails = (alert) => {
    setSelectedAlert(alert)
    setShowModal(true)
    handleMarkRead(alert.id)
  }

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          alert.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || alert.type === filterType
    return matchesSearch && matchesFilter
  })

  const unreadCount = alerts.filter(a => !a.read).length

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Alerts</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
            <Bell size={14} className="text-green-600" />
            {unreadCount} unread notifications
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <button 
              onClick={handleMarkAllRead}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-green-600/20 flex items-center gap-2"
            >
              <Check size={18} />
              Mark All Read
            </button>
          )}
        </div>
      </div>

      {/* Stats - Green & White */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Bell size={16} className="text-gray-400" />
            <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{alerts.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <ClockIcon size={16} className="text-green-600" />
            <p className="text-xs text-gray-500 dark:text-gray-400">Unread</p>
          </div>
          <p className="text-xl font-bold text-green-600">{unreadCount}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <AlertOctagon size={16} className="text-red-500" />
            <p className="text-xs text-gray-500 dark:text-gray-400">Urgent</p>
          </div>
          <p className="text-xl font-bold text-red-600">
            {alerts.filter(a => a.priority === 'High').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <FileCheck size={16} className="text-green-600" />
            <p className="text-xs text-gray-500 dark:text-gray-400">Resolved</p>
          </div>
          <p className="text-xl font-bold text-green-600">
            {alerts.filter(a => a.type === 'success').length}
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search alerts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'info', 'success', 'warning', 'error'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterType === type
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List - Green & White with Icons */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`bg-white dark:bg-gray-800 rounded-xl border p-4 transition-all hover:shadow-md ${
              !alert.read ? 'border-l-4 border-l-green-600 border-gray-200 dark:border-gray-700' : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${getTypeStyles(alert.type)}`}>
                {getTypeIcon(alert.type)}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      {alert.icon && <span className="text-green-600">{alert.icon}</span>}
                      <h3 className="font-semibold text-gray-900 dark:text-white">{alert.title}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 ${getPriorityColor(alert.priority)}`}>
                        {getPriorityIcon(alert.priority)}
                        {alert.priority}
                      </span>
                      {!alert.read && (
                        <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                          <Bell size={10} />
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{alert.message}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Clock size={12} />
                      {alert.time}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <button 
                    onClick={() => handleViewDetails(alert)}
                    className="text-xs px-3 py-1 bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-950/30 transition-colors flex items-center gap-1"
                  >
                    <Eye size={12} />
                    View Details
                  </button>
                  {!alert.read && (
                    <button 
                      onClick={() => handleMarkRead(alert.id)}
                      className="text-xs px-3 py-1 bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-950/30 transition-colors flex items-center gap-1"
                    >
                      <Check size={12} />
                      Mark Read
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(alert.id)}
                    className="text-xs px-3 py-1 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors flex items-center gap-1"
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="text-5xl mb-4">🔔</div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">No alerts found</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Try adjusting your search or filter</p>
        </div>
      )}

      {/* Modal - Green & White */}
      {showModal && selectedAlert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getTypeStyles(selectedAlert.type)}`}>
                    {getTypeIcon(selectedAlert.type)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedAlert.title}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${getPriorityColor(selectedAlert.priority)}`}>
                      {getPriorityIcon(selectedAlert.priority)}
                      {selectedAlert.priority} Priority
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-4 flex items-start gap-3">
                {selectedAlert.icon && <span className="text-green-600 mt-0.5">{selectedAlert.icon}</span>}
                <p className="text-gray-700 dark:text-gray-300">{selectedAlert.message}</p>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {selectedAlert.time}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeStyles(selectedAlert.type)}`}>
                  {selectedAlert.type.charAt(0).toUpperCase() + selectedAlert.type.slice(1)}
                </span>
                <span className="text-xs flex items-center gap-1">
                  <Bell size={12} />
                  {selectedAlert.read ? 'Read' : 'Unread'}
                </span>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors shadow-lg shadow-green-600/20"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    handleDelete(selectedAlert.id)
                    setShowModal(false)
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <Trash2 size={16} className="inline mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Alerts
