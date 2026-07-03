import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Activity, 
  CheckCircle, 
  Users,
  TrendingUp,
  Calendar,
  ChevronRight,
  MapPin,
  AlertCircle,
  Eye,
  Plus,
  X,
  Bell,
  Clock
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showNewReportModal, setShowNewReportModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [selectedDate, setSelectedDate] = useState('Today');

  const stats = [
    { 
      label: 'Total Reports', 
      value: '24', 
      change: '+8.5%', 
      icon: FileText,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    { 
      label: 'Active Cases', 
      value: '4', 
      change: '+5.2%', 
      icon: Activity,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    { 
      label: 'Resolved Cases', 
      value: '12', 
      change: '+12.3%', 
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    { 
      label: 'Total Users', 
      value: '6', 
      change: '+3.1%', 
      icon: Users,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
  ];

  const monthlyData = [
    { month: 'Jan', reports: 2, resolved: 1 },
    { month: 'Feb', reports: 3, resolved: 2 },
    { month: 'Mar', reports: 5, resolved: 3 },
    { month: 'Apr', reports: 4, resolved: 2 },
    { month: 'May', reports: 6, resolved: 3 },
    { month: 'Jun', reports: 4, resolved: 1 },
  ];

  const caseStatusData = [
    { name: 'Active', value: 4, color: '#f59e0b' },
    { name: 'Resolved', value: 12, color: '#10b981' },
    { name: 'Pending', value: 8, color: '#3b82f6' },
  ];

  const recentReports = [
    { id: 'R-2024-001', title: 'Missing Person - Wajir', status: 'Active', time: '2 hours ago', location: 'Wajir, Kenya', description: 'Amina Hassan, 28 years old, last seen near Wajir market wearing blue dress.' },
    { id: 'R-2024-002', title: 'Found Person - Nairobi', status: 'Resolved', time: '5 hours ago', location: 'Nairobi, Kenya', description: 'Person found safe in Nairobi CBD.' },
    { id: 'R-2024-003', title: 'Missing Child - Mombasa', status: 'Pending', time: '1 day ago', location: 'Mombasa, Kenya', description: '7-year-old boy missing from Mombasa beach.' },
  ];

  const urgentAlerts = [
    { 
      id: 1,
      title: 'Missing Child - Mombasa', 
      urgency: 'High', 
      time: '1 hour ago',
      description: 'A 7-year-old boy went missing from Mombasa beach area. Last seen wearing blue shorts and white t-shirt. Family is urgently requesting public assistance.',
      location: 'Mombasa, Kenya',
      status: 'Active'
    },
    { 
      id: 2,
      title: 'Report R-2024-003 Needs Review', 
      urgency: 'Medium', 
      time: '3 hours ago',
      description: 'New report submitted requires immediate review. Missing person case with incomplete information.',
      location: 'Nairobi, Kenya',
      status: 'Pending'
    },
    { 
      id: 3,
      title: 'Suspicious Activity Reported - Garissa', 
      urgency: 'High', 
      time: '5 hours ago',
      description: 'Multiple reports of suspicious activity in Garissa area. Police have been notified.',
      location: 'Garissa, Kenya',
      status: 'Under Investigation'
    },
  ];

  const recentActivity = [
    { user: 'Amina Hassan', action: 'New report submitted from Wajir', time: '2 min ago', avatar: 'A', color: 'from-pink-400 to-pink-500' },
    { user: 'Mohamed Ali', action: 'Case updated - Mandera', time: '15 min ago', avatar: 'M', color: 'from-emerald-400 to-emerald-500' },
    { user: 'Sarah Ochieng', action: 'New user registered', time: '1 hour ago', avatar: 'S', color: 'from-blue-400 to-blue-500' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-emerald-100 text-emerald-700',
      'Resolved': 'bg-green-100 text-green-700',
      'Pending': 'bg-yellow-100 text-yellow-700',
      'Under Investigation': 'bg-purple-100 text-purple-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      'High': 'bg-red-100 text-red-700',
      'Medium': 'bg-orange-100 text-orange-700',
      'Low': 'bg-yellow-100 text-yellow-700',
    };
    return colors[urgency] || 'bg-gray-100 text-gray-700';
  };

  const getUrgencyIcon = (urgency) => {
    const colors = {
      'High': 'text-red-500',
      'Medium': 'text-orange-500',
      'Low': 'text-yellow-500',
    };
    return colors[urgency] || 'text-gray-500';
  };

  const handleNewReport = () => {
    setShowNewReportModal(true);
  };

  const handleTodayClick = () => {
    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    setSelectedDate(today);
  };

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
    setShowAlertModal(true);
  };

  const handleViewAllAlerts = () => {
    navigate('/alerts');
  };

  const handleViewAllActivity = () => {
    navigate('/alerts');
  };

  const handleViewAllReports = () => {
    navigate('/reports');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back, Admin! Here's what's happening today.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={handleNewReport}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition-colors shadow-sm hover:shadow-md"
          >
            <Plus size={18} />
            New Report
          </button>
          <button 
            onClick={handleTodayClick}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <Calendar size={16} />
            {selectedDate === 'Today' ? 'Today' : selectedDate}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <Icon size={24} className={stat.iconColor} />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
                  <TrendingUp size={12} />
                  {stat.change}
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Monthly Reports</h2>
            <span className="text-xs text-gray-400">Last 6 months</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="reports" fill="#10b981" radius={[4, 4, 0, 0]} name="Reports" />
                <Bar dataKey="resolved" fill="#34d399" radius={[4, 4, 0, 0]} name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Case Status</h2>
            <span className="text-xs text-gray-400">Distribution</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 h-64">
            <div className="w-full sm:w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={caseStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {caseStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full sm:w-1/2 space-y-2">
              {caseStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{item.value}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between p-2">
                  <span className="text-sm font-medium text-gray-600">Total Cases</span>
                  <span className="text-sm font-bold text-gray-800">24</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Reports</h2>
          <button 
            onClick={handleViewAllReports}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
          >
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="space-y-3">
          {recentReports.map((report, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 group-hover:text-emerald-600 transition-colors">
                    {report.title}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                    <span>{report.id}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {report.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                  {report.status}
                </span>
                <span className="text-xs text-gray-400">{report.time}</span>
                <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100">
                  <Eye size={16} className="text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
            <button 
              onClick={handleViewAllActivity}
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
            >
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${activity.color} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
                  {activity.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">{activity.user}</p>
                  <p className="text-sm text-gray-500">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Urgent Alerts - Now Functional */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Urgent Alerts</h2>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                {urgentAlerts.filter(a => a.urgency === 'High').length} High
              </span>
              <button 
                onClick={handleViewAllAlerts}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                View All
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {urgentAlerts.map((alert, index) => (
              <div 
                key={index} 
                onClick={() => handleAlertClick(alert)}
                className="p-3 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {alert.urgency === 'High' ? (
                      <div className="relative">
                        <Bell size={18} className="text-red-500 animate-pulse" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                      </div>
                    ) : (
                      <Bell size={18} className="text-orange-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-800 group-hover:text-emerald-600 transition-colors">
                        {alert.title}
                      </p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getUrgencyColor(alert.urgency)}`}>
                        {alert.urgency}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{alert.description}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock size={12} />
                        {alert.time}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin size={12} />
                        {alert.location}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-emerald-500 transition-colors flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={handleViewAllAlerts}
            className="w-full mt-4 text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
          >
            View all alerts
          </button>
        </div>
      </div>

      {/* Alert Detail Modal */}
      {showAlertModal && selectedAlert && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${selectedAlert.urgency === 'High' ? 'bg-red-100' : 'bg-orange-100'}`}>
                  <Bell size={20} className={selectedAlert.urgency === 'High' ? 'text-red-500' : 'text-orange-500'} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Alert Details</h2>
              </div>
              <button 
                onClick={() => setShowAlertModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{selectedAlert.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getUrgencyColor(selectedAlert.urgency)}`}>
                    {selectedAlert.urgency} Urgency
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAlert.status)}`}>
                    {selectedAlert.status}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-700">{selectedAlert.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Location</p>
                  <p className="font-medium text-gray-800 flex items-center gap-1">
                    <MapPin size={14} />
                    {selectedAlert.location}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Time</p>
                  <p className="font-medium text-gray-800 flex items-center gap-1">
                    <Clock size={14} />
                    {selectedAlert.time}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => {
                    setShowAlertModal(false);
                    navigate(`/alerts/${selectedAlert.id}`);
                  }}
                  className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors"
                >
                  View Full Details
                </button>
                <button 
                  onClick={() => setShowAlertModal(false)}
                  className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Report Modal */}
      {showNewReportModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">New Report</h2>
              <button 
                onClick={() => setShowNewReportModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="Enter full name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="Enter location" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent" rows="3" placeholder="Enter description"></textarea>
              </div>
              <button className="w-full py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors">
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
