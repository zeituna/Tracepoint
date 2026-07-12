import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  MessageSquare,
  Activity,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Rocket,
  Calendar,
  CheckCircle,
  BarChart3,
  PieChart as PieChartIcon,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    reports: 0,
    messages: 0,
    cases: { total: 0, active: 0, resolved: 0, pending: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) { setLoading(false); return; }

        const usersRes = await fetch('http://localhost:5000/api/users/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const usersData = await usersRes.json();

        const casesRes = await fetch('http://localhost:5000/api/cases/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const casesData = await casesRes.json();

        const messagesRes = await fetch('http://localhost:5000/api/messages', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const messagesData = await messagesRes.json();

        setStats({
          users: usersData.total || 0,
          reports: casesData.total || 0,
          messages: messagesData.length || 0,
          cases: casesData
        });
      } catch (err) {
        console.error('Fetch stats error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const weeklyData = [
    { name: 'Mon', reports: 3, messages: 5 },
    { name: 'Tue', reports: 5, messages: 8 },
    { name: 'Wed', reports: 2, messages: 4 },
    { name: 'Thu', reports: 7, messages: 10 },
    { name: 'Fri', reports: 4, messages: 6 },
    { name: 'Sat', reports: 1, messages: 3 },
    { name: 'Sun', reports: 3, messages: 7 },
  ];

  const caseStatusData = [
    { name: 'Active', value: stats.cases.active || 0 },
    { name: 'Resolved', value: stats.cases.resolved || 0 },
    { name: 'Pending', value: stats.cases.pending || 0 },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

  const cards = [
    { title: 'Total Users', value: stats.users, icon: Users, color: 'bg-gradient-to-br from-blue-500 to-blue-600', trend: '+12%', trendUp: true, subtitle: 'Active users' },
    { title: 'Total Reports', value: stats.reports, icon: FileText, color: 'bg-gradient-to-br from-emerald-500 to-emerald-600', trend: '+8%', trendUp: true, subtitle: 'This month' },
    { title: 'Messages', value: stats.messages, icon: MessageSquare, color: 'bg-gradient-to-br from-purple-500 to-purple-600', trend: '+15%', trendUp: true, subtitle: 'Unread: 2' },
    { title: 'Active Cases', value: stats.cases.active || 0, icon: Activity, color: 'bg-gradient-to-br from-orange-500 to-orange-600', trend: '-3%', trendUp: false, subtitle: 'In progress' },
  ];

  const greetings = ['Good Morning! 🌅', 'Good Afternoon! ☀️', 'Good Evening! 🌙', 'Good Night! 🌟'];
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return greetings[0];
    if (hour < 17) return greetings[1];
    if (hour < 21) return greetings[2];
    return greetings[3];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Decorative Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 rounded-3xl p-8 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-300/10 rounded-full blur-3xl"></div>
        
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-4 right-20 text-emerald-300/30">
          <Sparkles size={40} />
        </motion.div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute bottom-4 right-32 text-emerald-300/20">
          <Rocket size={35} />
        </motion.div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                  <Sparkles className="text-white" size={24} />
                </div>
                <span className="text-emerald-200/80 text-sm font-medium tracking-wider uppercase">{getGreeting()}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-2">
                Welcome back, Admin
              </h1>
              
              <p className="text-emerald-200/90 text-lg mt-1 flex items-center gap-2 flex-wrap">
                <span>Keep making a difference —</span>
                <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  Helping families reunite, one report
                </span>
              </p>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{stats.reports}</p>
                    <p className="text-xs text-emerald-200/70">Reports</p>
                  </div>
                  <div className="w-px h-10 bg-white/20"></div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{stats.cases.active || 0}</p>
                    <p className="text-xs text-emerald-200/70">Active</p>
                  </div>
                  <div className="w-px h-10 bg-white/20"></div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{stats.users}</p>
                    <p className="text-xs text-emerald-200/70">Users</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/10 hidden md:block">
                <div className="text-center">
                  <p className="text-lg font-bold text-white">
                    {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="text-xs text-emerald-200/70">
                    {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-6 h-0.5 bg-gradient-to-r from-emerald-400/0 via-emerald-400/50 to-emerald-400/0"
          ></motion.div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100/50 hover:scale-[1.02] group"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">{card.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{card.value}</p>
                <p className="text-xs text-gray-400 mt-1">{card.subtitle}</p>
              </div>
              <div className={`${card.color} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className="text-white" size={24} />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className={`text-sm font-semibold ${card.trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
                {card.trend}
              </span>
              <span className="text-xs text-gray-400">vs last month</span>
              {card.trendUp ? <TrendingUp className="text-emerald-500" size={16} /> : <TrendingDown className="text-red-500" size={16} />}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <BarChart3 className="text-emerald-500" size={20} />
              Activity Overview
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1"><span className="w-3 h-3 bg-emerald-500 rounded-full"></span><span className="text-xs text-gray-500">Reports</span></div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 bg-purple-500 rounded-full"></span><span className="text-xs text-gray-500">Messages</span></div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'white', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Legend />
              <Bar dataKey="reports" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="messages" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100/50">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <PieChartIcon className="text-emerald-500" size={20} />
            Case Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={caseStatusData} cx="50%" cy="50%" labelLine={true}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100} fill="#8884d8" dataKey="value">
                {caseStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'white', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100/50">
          <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition group">
              <div className="p-2 bg-emerald-500 rounded-lg group-hover:scale-110 transition"><FileText className="text-white" size={16} /></div>
              <span className="font-medium">New Report</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition group">
              <div className="p-2 bg-blue-500 rounded-lg group-hover:scale-110 transition"><Users className="text-white" size={16} /></div>
              <span className="font-medium">Add User</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition group">
              <div className="p-2 bg-purple-500 rounded-lg group-hover:scale-110 transition"><MessageSquare className="text-white" size={16} /></div>
              <span className="font-medium">Send Message</span>
            </button>
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-6 border border-gray-100/50">
          <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { icon: FileText, text: 'New report created', time: '2 min ago', color: 'emerald' },
              { icon: Users, text: 'User leila logged in', time: '5 min ago', color: 'blue' },
              { icon: MessageSquare, text: 'New message received', time: '10 min ago', color: 'purple' },
              { icon: CheckCircle, text: 'Case #3 resolved', time: '15 min ago', color: 'green' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition">
                <div className={`p-2 bg-${item.color}-100 rounded-lg`}>
                  <item.icon className={`text-${item.color}-500`} size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{item.text}</p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
