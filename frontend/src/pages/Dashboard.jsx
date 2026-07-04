import React, { useState, useEffect } from 'react';
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
  Clock,
  ArrowUpRight,
  Download,
  Filter,
  Sparkles,
  Rocket,
  Target,
  Zap,
  Shield,
  Award,
  BarChart3,
  PieChart,
  LineChart,
  Globe,
  Layers,
  Briefcase,
  Gift,
  Star,
  ThumbsUp,
  Share2,
  MessageCircle,
  UserCheck,
  UserPlus,
  Settings,
  HelpCircle,
  Mail,
  Send,
  Paperclip,
  Image,
  Link,
  MoreHorizontal,
  Check,
  AlertTriangle,
  Info,
  Play,
  Pause,
  RefreshCw,
  ExternalLink
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
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart as ReLineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showNewReportModal, setShowNewReportModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [selectedDate, setSelectedDate] = useState('Today');
  const [greeting, setGreeting] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportData, setExportData] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
      setTimeOfDay('Start your day with purpose');
    } else if (hour < 17) {
      setGreeting('Good Afternoon');
      setTimeOfDay('Keep making a difference');
    } else {
      setGreeting('Good Evening');
      setTimeOfDay('Every moment matters');
    }
  }, []);

  // Realistic stats for a new system (max 25)
  const stats = [
    { 
      label: 'Total Reports', 
      value: '24', 
      change: '+8.5%', 
      icon: FileText,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      trend: 'up',
      subtitle: 'vs last month'
    },
    { 
      label: 'Active Cases', 
      value: '4', 
      change: '+5.2%', 
      icon: Activity,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      trend: 'up',
      subtitle: 'vs last month'
    },
    { 
      label: 'Resolved Cases', 
      value: '12', 
      change: '+12.3%', 
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      trend: 'up',
      subtitle: 'vs last month'
    },
    { 
      label: 'Total Users', 
      value: '6', 
      change: '+3.1%', 
      icon: Users,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      trend: 'up',
      subtitle: 'vs last month'
    },
  ];

  const monthlyData = [
    { month: 'Jan', reports: 2, resolved: 1, pending: 1 },
    { month: 'Feb', reports: 3, resolved: 2, pending: 1 },
    { month: 'Mar', reports: 5, resolved: 3, pending: 2 },
    { month: 'Apr', reports: 4, resolved: 2, pending: 2 },
    { month: 'May', reports: 6, resolved: 3, pending: 3 },
    { month: 'Jun', reports: 4, resolved: 1, pending: 3 },
  ];

  const caseStatusData = [
    { name: 'Active', value: 4, color: '#f59e0b' },
    { name: 'Resolved', value: 12, color: '#10b981' },
    { name: 'Pending', value: 8, color: '#3b82f6' },
  ];

  const recentReports = [
    { id: 'R-2024-001', title: 'Missing Person - Wajir', status: 'Active', time: '2 hours ago', location: 'Wajir, Kenya', priority: 'High' },
    { id: 'R-2024-002', title: 'Found Person - Nairobi', status: 'Resolved', time: '5 hours ago', location: 'Nairobi, Kenya', priority: 'Low' },
    { id: 'R-2024-003', title: 'Missing Child - Mombasa', status: 'Pending', time: '1 day ago', location: 'Mombasa, Kenya', priority: 'Urgent' },
  ];

  const urgentAlerts = [
    { 
      id: 1,
      title: 'Missing Child - Mombasa', 
      urgency: 'High', 
      time: '1 hour ago',
      description: 'A 7-year-old boy went missing from Mombasa beach area. Last seen wearing blue shorts and white t-shirt.',
      location: 'Mombasa, Kenya',
      status: 'Active',
      type: 'critical'
    },
    { 
      id: 2,
      title: 'Report R-2024-003 Needs Review', 
      urgency: 'Medium', 
      time: '3 hours ago',
      description: 'New report submitted requires immediate review. Missing person case with incomplete information.',
      location: 'Nairobi, Kenya',
      status: 'Pending',
      type: 'warning'
    },
  ];

  const recentActivity = [
    { user: 'Amina Hassan', action: 'New report submitted from Wajir', time: '2 min ago', avatar: 'A', color: 'from-pink-400 to-pink-500', type: 'submission' },
    { user: 'Mohamed Ali', action: 'Case updated - Mandera', time: '15 min ago', avatar: 'M', color: 'from-emerald-400 to-emerald-500', type: 'update' },
    { user: 'Sarah Ochieng', action: 'New user registered', time: '1 hour ago', avatar: 'S', color: 'from-blue-400 to-blue-500', type: 'registration' },
  ];

  const quickActions = [
    { icon: Plus, label: 'New Report', color: 'emerald', onClick: () => setShowNewReportModal(true) },
    { icon: Users, label: 'Add User', color: 'blue', onClick: () => navigate('/users') },
    { icon: FileText, label: 'View Reports', color: 'purple', onClick: () => navigate('/reports') },
    { icon: Bell, label: 'Alerts', color: 'orange', onClick: () => navigate('/alerts') },
  ];

  const achievements = [
    { icon: Award, label: 'Cases Resolved', value: '12/24', progress: 50, color: 'emerald' },
    { icon: Star, label: 'User Satisfaction', value: '4.8/5', progress: 96, color: 'yellow' },
    { icon: Target, label: 'Response Time', value: '2.4 min', progress: 85, color: 'blue' },
    { icon: Shield, label: 'Security Score', value: '98%', progress: 98, color: 'purple' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-emerald-100 text-emerald-700',
      'Resolved': 'bg-green-100 text-green-700',
      'Pending': 'bg-yellow-100 text-yellow-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'Urgent': 'bg-red-100 text-red-700',
      'High': 'bg-orange-100 text-orange-700',
      'Low': 'bg-blue-100 text-blue-700',
    };
    return colors[priority] || 'bg-gray-100 text-gray-700';
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      'High': 'bg-red-100 text-red-700',
      'Medium': 'bg-orange-100 text-orange-700',
      'Low': 'bg-yellow-100 text-yellow-700',
    };
    return colors[urgency] || 'bg-gray-100 text-gray-700';
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

  const handleExport = () => {
    setShowExportModal(true);
  };

  const handleExportConfirm = () => {
    setIsLoading(true);
    setTimeout(() => {
      let csvContent = "ID,Title,Status,Location,Time\n";
      recentReports.forEach(report => {
        csvContent += `${report.id},${report.title},${report.status},${report.location},${report.time}\n`;
      });

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.${exportFormat === 'pdf' ? 'pdf' : 'csv'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setIsLoading(false);
      setShowExportModal(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Premium Animated Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 rounded-2xl p-8 shadow-2xl">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-2xl"></div>
          <div className="absolute top-0 right-1/3 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                <Sparkles size={14} className="text-emerald-200 animate-pulse" />
                <span className="text-emerald-100/80 text-[10px] font-medium tracking-widest uppercase">{greeting}</span>
              </div>
              <span className="w-px h-4 bg-emerald-500/30"></span>
              <span className="text-emerald-100/60 text-xs font-medium flex items-center gap-1.5">
                <Clock size={12} />
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className="w-px h-4 bg-emerald-500/30"></span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-emerald-200/60 text-[10px] font-medium tracking-wide">OPERATIONAL</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight animate-fade-in">
              Welcome back, Admin
            </h1>
            
            <div className="flex items-center gap-3">
              <div className="h-0.5 w-12 bg-gradient-to-r from-emerald-400 to-transparent rounded-full"></div>
              <p className="text-emerald-100/80 text-sm font-light animate-slide-in">
                {timeOfDay} — <span className="text-emerald-200/60">Helping families reunite, one report at a time.</span>
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/5">
                <Target size={12} className="text-emerald-300" />
                <span className="text-emerald-200/50 text-[10px] font-medium">
                  {stats.reduce((acc, stat) => acc + parseInt(stat.value.replace(/,/g, '')), 0).toLocaleString()} Reports Managed
                </span>
              </div>
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/5">
                <Zap size={12} className="text-emerald-300" />
                <span className="text-emerald-200/50 text-[10px] font-medium">
                  {stats[2].value} Resolved
                </span>
              </div>
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/5">
                <Users size={12} className="text-emerald-300" />
                <span className="text-emerald-200/50 text-[10px] font-medium">
                  {stats[3].value} Active Users
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={handleNewReport}
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white text-emerald-700 text-sm font-semibold rounded-xl hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              <Plus size={17} className="group-hover:rotate-90 transition-transform duration-300" />
              New Report
            </button>
            <button 
              onClick={handleTodayClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <Calendar size={16} />
              {selectedDate === 'Today' ? 'Today' : selectedDate}
            </button>
            <button 
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          const colorClasses = {
            emerald: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100',
            blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
            purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
            orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100',
          };
          return (
            <button
              key={index}
              onClick={action.onClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl ${colorClasses[action.color]} transition-all duration-300 hover:shadow-md group`}
            >
              <Icon size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* Stats Grid - Realistic numbers for new system */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={20} className={stat.iconColor} />
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <TrendingUp size={12} />
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-medium text-gray-700">Monthly Reports</h2>
              <p className="text-xs text-gray-400">Reports submitted vs resolved</p>
            </div>
            <div className="flex items-center gap-1">
              <button className="text-xs text-gray-500 hover:text-emerald-600 transition-colors px-2 py-1 rounded-lg bg-gray-50 hover:bg-emerald-50">W</button>
              <button className="text-xs text-emerald-600 font-medium px-2 py-1 rounded-lg bg-emerald-50">M</button>
              <button className="text-xs text-gray-500 hover:text-emerald-600 transition-colors px-2 py-1 rounded-lg bg-gray-50 hover:bg-emerald-50">Y</button>
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={11} axisLine={false} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={11} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="reports" fill="#10b981" radius={[3, 3, 0, 0]} name="Reports" />
                <Bar dataKey="resolved" fill="#6ee7b7" radius={[3, 3, 0, 0]} name="Resolved" />
                <Bar dataKey="pending" fill="#fcd34d" radius={[3, 3, 0, 0]} name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-medium text-gray-700">Case Status</h2>
              <p className="text-xs text-gray-400">Current distribution</p>
            </div>
          </div>
          <div className="flex items-center gap-6 h-56">
            <div className="w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={caseStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {caseStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      fontSize: '12px'
                    }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-2">
              {caseStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{item.value}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total</span>
                  <span className="text-sm font-semibold text-gray-800">24</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-medium text-gray-700">Performance Metrics</h2>
            <p className="text-xs text-gray-400">Key performance indicators</p>
          </div>
          <Award size={16} className="text-emerald-500" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {achievements.map((item, index) => {
            const Icon = item.icon;
            const colorClasses = {
              emerald: 'bg-emerald-50 text-emerald-600',
              yellow: 'bg-yellow-50 text-yellow-600',
              blue: 'bg-blue-50 text-blue-600',
              purple: 'bg-purple-50 text-purple-600',
            };
            return (
              <div key={index} className={`p-3 rounded-lg ${colorClasses[item.color]} transition-all duration-300 hover:scale-[1.02]`}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon size={14} />
                  <p className="text-xs font-medium">{item.label}</p>
                </div>
                <p className="text-lg font-bold">{item.value}</p>
                <div className="w-full h-1 bg-white/50 rounded-full mt-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-current rounded-full transition-all duration-1000"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-medium text-gray-700">Recent Reports</h2>
            <p className="text-xs text-gray-400">Latest missing person reports</p>
          </div>
          <button 
            onClick={handleViewAllReports}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
          >
            View All <ChevronRight size={15} />
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {recentReports.map((report, index) => (
            <div key={index} className="flex items-center justify-between py-3 first:pt-0 last:pb-0 hover:bg-gray-50/50 px-2 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <div>
                  <p className="text-sm font-medium text-gray-800">{report.title}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                    <span>{report.id}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} />
                      {report.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                  {report.priority}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                  {report.status}
                </span>
                <span className="text-xs text-gray-400">{report.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-medium text-gray-700">Recent Activity</h2>
              <p className="text-xs text-gray-400">Latest system activity</p>
            </div>
            <button 
              onClick={handleViewAllActivity}
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50/50 transition-colors">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${activity.color} flex items-center justify-center text-white font-medium text-xs flex-shrink-0`}>
                  {activity.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-800">{activity.user}</p>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">{activity.type}</span>
                  </div>
                  <p className="text-sm text-gray-500">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-medium text-gray-700">Urgent Alerts</h2>
              <p className="text-xs text-gray-400">Requires immediate attention</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-medium flex items-center gap-1">
                <AlertTriangle size={10} />
                {urgentAlerts.filter(a => a.urgency === 'High').length}
              </span>
              <button 
                onClick={handleViewAllAlerts}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                View All
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {urgentAlerts.map((alert, index) => (
              <div 
                key={index} 
                onClick={() => handleAlertClick(alert)}
                className="p-3 rounded-lg border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  {alert.urgency === 'High' ? (
                    <div className="relative">
                      <Bell size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    </div>
                  ) : (
                    <Bell size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-800">{alert.title}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getUrgencyColor(alert.urgency)}`}>
                        {alert.urgency}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{alert.description}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock size={11} />
                        {alert.time}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin size={11} />
                        {alert.location}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-emerald-500 transition-colors flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50">
                  <Download size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Export Dashboard</h2>
                  <p className="text-xs text-gray-400">Choose your export preferences</p>
                </div>
              </div>
              <button 
                onClick={() => setShowExportModal(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                <div className="grid grid-cols-3 gap-2">
                  {['pdf', 'csv', 'excel'].map((format) => (
                    <button
                      key={format}
                      onClick={() => setExportFormat(format)}
                      className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        exportFormat === format 
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20' 
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {format.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data Range</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'all', label: 'All Data' },
                    { value: 'recent', label: 'Recent Only' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setExportData(option.value)}
                      className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        exportData === option.value 
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20' 
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={handleExportConfirm}
                  disabled={isLoading}
                  className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      Download Export
                    </>
                  )}
                </button>
                <button 
                  onClick={() => setShowExportModal(false)}
                  className="px-5 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alert Modal */}
      {showAlertModal && selectedAlert && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${selectedAlert.urgency === 'High' ? 'bg-red-50' : 'bg-orange-50'}`}>
                  <Bell size={20} className={selectedAlert.urgency === 'High' ? 'text-red-500' : 'text-orange-500'} />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Alert Details</h2>
              </div>
              <button 
                onClick={() => setShowAlertModal(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-gray-800">{selectedAlert.title}</h3>
                <div className="flex items-center gap-2 mt-1.5">
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
                  className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink size={16} />
                  View Full Details
                </button>
                <button 
                  onClick={() => setShowAlertModal(false)}
                  className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50">
                  <Plus size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">New Report</h2>
                  <p className="text-xs text-gray-400">Submit a new missing person report</p>
                </div>
              </div>
              <button 
                onClick={() => setShowNewReportModal(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Enter full name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                <input type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" placeholder="Enter location" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all" rows="3" placeholder="Enter description"></textarea>
              </div>
              <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all duration-300 shadow-md shadow-emerald-500/20">
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
