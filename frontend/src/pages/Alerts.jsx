import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, CheckCircle, XCircle, Clock, Trash2, Check, RefreshCw, Shield, Info } from 'lucide-react';

const Alerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'urgent',
      title: '🚨 Missing Person Report: Amina Hassan',
      description: 'Amina Hassan, 28, last seen in Wajir. Immediate attention needed.',
      time: '2 min ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'warning',
      title: '⚠️ Case Update: Sarah Ochieng',
      description: 'New information received in Kisumu case. Review required.',
      time: '15 min ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'success',
      title: '✅ Case Resolved: John Kimani',
      description: 'John Kimani has been found safe in Mombasa.',
      time: '1 hour ago',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'info',
      title: '📋 New Report Submitted',
      description: 'Community Watch submitted a new report from Nakuru.',
      time: '2 hours ago',
      read: true,
      priority: 'low'
    },
    {
      id: 5,
      type: 'urgent',
      title: '🚨 Critical Alert: Mandera Border',
      description: 'Cross-border incident reported. Security team notified.',
      time: '3 hours ago',
      read: false,
      priority: 'high'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);

  const getAlertIcon = (type) => {
    switch(type) {
      case 'urgent': return <AlertTriangle className="text-red-500" size={20} />;
      case 'warning': return <Bell className="text-yellow-500" size={20} />;
      case 'success': return <CheckCircle className="text-green-500" size={20} />;
      case 'info': return <Info className="text-blue-500" size={20} />;
      default: return <Bell className="text-gray-500" size={20} />;
    }
  };

  const getAlertStyles = (type) => {
    switch(type) {
      case 'urgent': return 'bg-red-50 border-red-200 hover:bg-red-100';
      case 'warning': return 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100';
      case 'success': return 'bg-green-50 border-green-200 hover:bg-green-100';
      case 'info': return 'bg-blue-50 border-blue-200 hover:bg-blue-100';
      default: return 'bg-gray-50 border-gray-200 hover:bg-gray-100';
    }
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleMarkRead = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const handleDelete = (id) => {
    if (window.confirm('⚠️ Are you sure you want to delete this alert?')) {
      setAlerts(alerts.filter(alert => alert.id !== id));
    }
  };

  const handleMarkAllRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, read: true })));
  };

  const handleDeleteAll = () => {
    if (window.confirm('⚠️ Are you sure you want to delete all alerts?')) {
      setAlerts([]);
    }
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.type === filter);

  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Bell className="text-emerald-500" size={28} />
            Alerts & Notifications
          </h1>
          <p className="text-gray-500 mt-1">
            {unreadCount > 0 ? (
              <span className="text-red-500 font-medium">{unreadCount} unread alerts</span>
            ) : (
              'All caught up! No unread alerts'
            )}
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition flex items-center gap-2 text-sm"
            >
              <Check size={16} />
              Mark All Read
            </button>
          )}
          {alerts.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition flex items-center gap-2 text-sm"
            >
              <Trash2 size={16} />
              Delete All
            </button>
          )}
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition flex items-center gap-2 text-sm"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-800">{alerts.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 border border-red-100">
          <p className="text-sm text-gray-500">Urgent</p>
          <p className="text-2xl font-bold text-red-600">{alerts.filter(a => a.type === 'urgent').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 border border-yellow-100">
          <p className="text-sm text-gray-500">Unread</p>
          <p className="text-2xl font-bold text-yellow-600">{unreadCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 border border-green-100">
          <p className="text-sm text-gray-500">Resolved</p>
          <p className="text-2xl font-bold text-green-600">{alerts.filter(a => a.read).length}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'urgent', 'warning', 'success', 'info'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              filter === type
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <Bell className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700">No alerts</h3>
            <p className="text-gray-400">You're all caught up!</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-md ${getAlertStyles(alert.type)} ${
                !alert.read ? 'border-l-4 border-l-red-500' : 'opacity-75'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className={`font-semibold ${!alert.read ? 'text-gray-800' : 'text-gray-600'}`}>
                        {alert.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityBadge(alert.priority)}`}>
                          {alert.priority.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock size={12} />
                          {alert.time}
                        </span>
                        {!alert.read && (
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full animate-pulse">
                            NEW
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!alert.read && (
                        <button
                          onClick={() => handleMarkRead(alert.id)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                          title="Mark as read"
                        >
                          <Check size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(alert.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-400 border-t border-gray-200 pt-4">
        <p>Showing {filteredAlerts.length} of {alerts.length} alerts</p>
        <p className="text-xs text-emerald-500 mt-1">🔔 Real-time notifications system</p>
      </div>
    </div>
  );
};

export default Alerts;
