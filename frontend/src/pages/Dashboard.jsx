import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Sparkles,
  CheckCircle,
  BarChart3,
  PieChart as PieChartIcon,
  UserPlus,
  Building2,
  AlertTriangle,
  Clock,
  MapPin,
  Bell,
  Heart,
  Mail,
  Download,
  Filter,
  RefreshCw,
  Navigation,
  Map,
  Eye,
  Calendar,
  Zap,
  Award,
  Target,
  Circle,
  Satellite,
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

// Leaflet imports
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icons (Leaflet issue)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// ─── Custom blue location icon ──────────────────────────────
const locationIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// ─── Component to handle map centering ──────────────────────
const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 13);
    }
  }, [center, map, zoom]);
  return null;
};

// ─── Dummy case locations (replace with real API data) ──────
const caseLocations = [
  { id: 1, name: 'Kibera, Nairobi', lat: -1.315, lng: 36.783, status: 'active' },
  { id: 2, name: 'Garissa Town', lat: -0.462, lng: 39.646, status: 'active' },
  { id: 3, name: 'Mombasa CBD', lat: -4.043, lng: 39.668, status: 'pending' },
  { id: 4, name: 'Kisumu', lat: -0.102, lng: 34.762, status: 'resolved' },
  { id: 5, name: 'Nakuru', lat: -0.303, lng: 36.080, status: 'active' },
  { id: 6, name: 'Eldoret', lat: 0.514, lng: 35.270, status: 'pending' },
];

// ─── Custom Tooltip ──────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-gray-100/80 p-4 min-w-[140px]">
        <p className="text-xs font-medium text-gray-400 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium" style={{ color: entry.color }}>
              {entry.name}
            </span>
            <span className="text-sm font-bold text-gray-800">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  // ─── State ──────────────────────────────────────────────────
  const [stats, setStats] = useState({
    users: 0,
    reports: 0,
    messages: 0,
    cases: { total: 0, active: 0, resolved: 0, pending: 0 },
    organizations: 0,
    alerts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [recentReports, setRecentReports] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, text: 'Case #123 resolved – family reunited', time: '2 min ago', priority: 'high' },
    { id: 2, text: 'New report filed from Garissa', time: '15 min ago', priority: 'medium' },
    { id: 3, text: '3 new users registered today', time: '1 hour ago', priority: 'low' },
  ]);

  // ─── GPS Tracking State ──────────────────────────────────────
  const [trackingActive, setTrackingActive] = useState(false);
  const [userPosition, setUserPosition] = useState(null);
  const [trackingError, setTrackingError] = useState(null);
  const watchIdRef = useRef(null);

  const startTracking = () => {
    if (!navigator.geolocation) {
      setTrackingError('Geolocation is not supported by your browser.');
      return;
    }
    setTrackingError(null);
    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition({ lat: latitude, lng: longitude });
        setTrackingActive(true);
      },
      (error) => {
        setTrackingError(error.message);
        setTrackingActive(false);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );
  };

  const stopTracking = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setTrackingActive(false);
    setUserPosition(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  // ─── Fetch stats ─────────────────────────────────────────────
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

        const reportsRes = await fetch('http://localhost:5000/api/cases', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const reportsData = await reportsRes.json();

        setStats({
          users: usersData.total || 0,
          reports: casesData.total || 0,
          messages: messagesData.length || 0,
          cases: casesData,
          organizations: 5,
          alerts: 3,
        });

        setRecentReports(reportsData.slice(0, 10) || []);
      } catch (err) {
        console.error('Fetch stats error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // ─── Chart Data ─────────────────────────────────────────────
  const weeklyData = [
    { name: 'Mon', reports: 3, resolved: 1 },
    { name: 'Tue', reports: 5, resolved: 2 },
    { name: 'Wed', reports: 2, resolved: 3 },
    { name: 'Thu', reports: 7, resolved: 4 },
    { name: 'Fri', reports: 4, resolved: 2 },
    { name: 'Sat', reports: 1, resolved: 1 },
    { name: 'Sun', reports: 3, resolved: 2 },
  ];

  const monthlyData = [
    { name: 'Jan', reports: 12, resolved: 5 },
    { name: 'Feb', reports: 18, resolved: 8 },
    { name: 'Mar', reports: 15, resolved: 6 },
    { name: 'Apr', reports: 22, resolved: 10 },
    { name: 'May', reports: 20, resolved: 9 },
    { name: 'Jun', reports: 25, resolved: 12 },
  ];

  const caseStatusData = [
    { name: 'Active', value: stats.cases.active || 0 },
    { name: 'Resolved', value: stats.cases.resolved || 0 },
    { name: 'Pending', value: stats.cases.pending || 0 },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

  // ─── Additional computed stats ──────────────────────────────
  const totalCases = stats.cases.total || 0;
  const active = stats.cases.active || 0;
  const resolved = stats.cases.resolved || 0;
  const pending = stats.cases.pending || 0;
  const closureRate = totalCases > 0 ? Math.round((resolved / totalCases) * 100) : 0;

  const statCards = [
    { title: 'Total Cases', value: totalCases, icon: FileText, gradient: 'from-blue-500 to-blue-600', trend: '+8%', trendUp: true, subtitle: 'All time' },
    { title: 'Active', value: active, icon: AlertTriangle, gradient: 'from-red-500 to-red-600', trend: '+5%', trendUp: true, subtitle: 'In progress' },
    { title: 'Resolved', value: resolved, icon: CheckCircle, gradient: 'from-emerald-500 to-emerald-600', trend: '+12%', trendUp: true, subtitle: 'Reunited' },
    { title: 'Closure Rate', value: `${closureRate}%`, icon: Target, gradient: 'from-purple-500 to-purple-600', trend: '+3%', trendUp: true, subtitle: 'Efficiency' },
    { title: 'Registered Users', value: stats.users, icon: Users, gradient: 'from-teal-500 to-teal-600', trend: '+15%', trendUp: true, subtitle: 'Total users' },
    { title: 'Organizations', value: stats.organizations, icon: Building2, gradient: 'from-indigo-500 to-indigo-600', trend: '+2%', trendUp: true, subtitle: 'Partners' },
  ];

  const recentActivities = [
    { icon: FileText, text: 'New report filed – Kibera', time: '2 min ago', color: 'emerald' },
    { icon: CheckCircle, text: 'Case #123 resolved – family reunited', time: '15 min ago', color: 'green' },
    { icon: UserPlus, text: 'Ahmed Hassan registered as volunteer', time: '1 hour ago', color: 'blue' },
    { icon: Bell, text: 'Emergency alert issued for Garissa', time: '2 hours ago', color: 'orange' },
    { icon: Building2, text: 'Red Cross joined as partner', time: '3 hours ago', color: 'purple' },
    { icon: MapPin, text: 'New case reported in Mombasa', time: '5 hours ago', color: 'red' },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-red-500',
      pending: 'bg-yellow-500',
      resolved: 'bg-green-500',
      closed: 'bg-gray-500',
    };
    return badges[status] || 'bg-gray-500';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning! 🌅';
    if (hour < 17) return 'Good Afternoon! ☀️';
    if (hour < 21) return 'Good Evening! 🌙';
    return 'Good Night! 🌟';
  };

  // ─── Filtered reports ──────────────────────────────────────
  const filteredReports = statusFilter === 'all'
    ? recentReports
    : recentReports.filter(r => r.status === statusFilter);

  // ─── Export CSV ─────────────────────────────────────────────
  const exportCSV = () => {
    const headers = ['ID', 'Person', 'Location', 'Status', 'Date'];
    const rows = recentReports.map(r => [
      r.id,
      r.title || 'N/A',
      r.location || 'N/A',
      r.status || 'Unknown',
      new Date(r.created_at).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reports_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
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
    <div className="p-6 md:p-10 space-y-8 bg-gradient-to-br from-slate-50/80 to-gray-100/80 min-h-screen">
      
      {/* ─── HERO ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 p-8 md:p-10 shadow-2xl"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                  <Sparkles className="text-white" size={28} />
                </div>
                <span className="text-emerald-200/90 text-sm font-medium tracking-widest uppercase">{getGreeting()}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mt-3">Welcome back, Admin</h1>
              <p className="text-emerald-200/90 text-md mt-2 flex items-center gap-2 flex-wrap">
                <span>Keep making a difference —</span>
                <span className="bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium">
                  {totalCases} cases tracked, {resolved} families reunited
                </span>
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/10">
                <div className="text-center">
                  <p className="text-lg font-bold text-white">{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                  <p className="text-xs text-emerald-200/70">{currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                </div>
              </div>
              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="bg-white/10 backdrop-blur-sm p-2.5 rounded-2xl border border-white/10 hover:bg-white/20 transition relative"
                >
                  <Bell className="text-white" size={22} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                    <div className="p-4 border-b border-gray-100 font-semibold text-gray-800">Notifications</div>
                    <div className="max-h-64 overflow-y-auto divide-y divide-gray-50">
                      {notifications.map(n => (
                        <div key={n.id} className="p-3 hover:bg-gray-50 transition flex items-start gap-2">
                          <span className={`w-1.5 h-1.5 mt-1.5 rounded-full ${n.priority === 'high' ? 'bg-red-500' : n.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                          <div>
                            <p className="text-sm text-gray-700">{n.text}</p>
                            <p className="text-xs text-gray-400">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-400/30">
                <Heart className="text-emerald-300" size={16} />
                <span className="text-xs text-emerald-200 font-medium">Reunited: {resolved}</span>
              </div>
            </div>
          </div>
          <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1, delay: 0.6 }} className="mt-8 h-0.5 bg-gradient-to-r from-emerald-400/0 via-emerald-400/50 to-emerald-400/0" />
        </div>
      </motion.div>

      {/* ─── PERIOD SELECTOR & QUICK STATS ────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600">Period:</span>
          <div className="flex bg-white rounded-xl shadow-sm border border-gray-100 p-1">
            {['week', 'month', 'quarter', 'year'].map(p => (
              <button
                key={p}
                onClick={() => setSelectedPeriod(p)}
                className={`px-4 py-1.5 text-xs font-medium rounded-lg transition ${
                  selectedPeriod === p
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Updated: {currentTime.toLocaleTimeString()}</span>
          <button className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition">
            <RefreshCw size={16} className="text-gray-500" />
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-xl hover:bg-emerald-600 transition shadow-sm"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* ─── STATS CARDS ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-5 border border-gray-100 hover:border-emerald-200 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white hover:to-emerald-50/50"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{card.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className={`text-xs font-semibold ${card.trendUp ? 'text-emerald-500' : 'text-red-500'}`}>{card.trend}</span>
                  <span className="text-xs text-gray-400">{card.subtitle}</span>
                </div>
              </div>
              <div className={`bg-gradient-to-br ${card.gradient} p-2.5 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className="text-white" size={18} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ─── CASE STATUS OVERVIEW ────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl shadow-sm p-5 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Cases</p>
              <p className="text-2xl font-bold text-gray-800">{active}</p>
              <p className="text-xs text-gray-500 mt-1">{totalCases > 0 ? Math.round((active / totalCases) * 100) : 0}% of total</p>
            </div>
            <Circle className="text-red-500 fill-red-500" size={20} />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5 border-l-4 border-emerald-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Resolved</p>
              <p className="text-2xl font-bold text-gray-800">{resolved}</p>
              <p className="text-xs text-gray-500 mt-1">{totalCases > 0 ? Math.round((resolved / totalCases) * 100) : 0}% of total</p>
            </div>
            <CheckCircle className="text-emerald-500" size={20} />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pending</p>
              <p className="text-2xl font-bold text-gray-800">{pending}</p>
              <p className="text-xs text-gray-500 mt-1">{totalCases > 0 ? Math.round((pending / totalCases) * 100) : 0}% of total</p>
            </div>
            <Clock className="text-yellow-500" size={20} />
          </div>
        </div>
      </div>

      {/* ─── CHARTS ROW ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2"><BarChart3 className="text-emerald-500" size={20} /> Reports Trend</h3>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" /> New</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full" /> Resolved</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={selectedPeriod === 'week' ? weeklyData : monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="reports" fill="#10b981" radius={[4,4,0,0]} />
              <Bar dataKey="resolved" fill="#3b82f6" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><PieChartIcon className="text-emerald-500" size={20} /> Case Status Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={caseStatusData} cx="50%" cy="50%" labelLine={true}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100} fill="#8884d8" dataKey="value">
                {caseStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* ─── INTERACTIVE MAP WITH GPS TRACKING ────────────────── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <MapPin className="text-emerald-500" size={20} /> Active Case Locations
            </h3>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-red-500 rounded-full" /> Active</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-yellow-500 rounded-full" /> Pending</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-green-500 rounded-full" /> Resolved</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {trackingError && (
              <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">{trackingError}</span>
            )}
            <button
              onClick={trackingActive ? stopTracking : startTracking}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition ${
                trackingActive
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600'
              }`}
            >
              <Satellite size={16} />
              {trackingActive ? 'Stop Tracking' : 'Live Tracking'}
            </button>
            {trackingActive && userPosition && (
              <span className="text-xs text-emerald-600 animate-pulse flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                Live
              </span>
            )}
          </div>
        </div>
        <div className="rounded-xl overflow-hidden border border-gray-100" style={{ height: '400px' }}>
          <MapContainer center={[0.0236, 37.9062]} zoom={6} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Case markers */}
            {caseLocations.map(loc => {
              const color = loc.status === 'active' ? 'red' : loc.status === 'pending' ? 'yellow' : 'green';
              return (
                <CircleMarker
                  key={loc.id}
                  center={[loc.lat, loc.lng]}
                  radius={8}
                  fillColor={color}
                  color={color}
                  weight={2}
                  opacity={1}
                  fillOpacity={0.7}
                >
                  <Popup>
                    <strong>{loc.name}</strong><br />
                    Status: <span className="capitalize">{loc.status}</span>
                    <br />
                    <Link to={`/case/${loc.id}`} className="text-emerald-600 text-sm font-medium">View Details →</Link>
                  </Popup>
                </CircleMarker>
              );
            })}

            {/* User location marker (if tracking) */}
            {userPosition && (
              <Marker position={[userPosition.lat, userPosition.lng]} icon={locationIcon}>
                <Popup>You are here</Popup>
              </Marker>
            )}

            {/* Map controller to center on user */}
            {trackingActive && userPosition && (
              <MapController center={[userPosition.lat, userPosition.lng]} zoom={15} />
            )}
          </MapContainer>
        </div>
        {trackingActive && userPosition && (
          <div className="mt-2 text-xs text-gray-500">
            📍 {userPosition.lat.toFixed(6)}, {userPosition.lng.toFixed(6)}
          </div>
        )}
      </motion.div>

      {/* ─── RECENT REPORTS & ACTIVITY ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2"><FileText className="text-emerald-500" size={20} /> Recent Reports</h3>
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="resolved">Resolved</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="pb-2 font-semibold">ID</th><th className="pb-2 font-semibold">Person</th>
                  <th className="pb-2 font-semibold">Location</th><th className="pb-2 font-semibold">Status</th>
                  <th className="pb-2 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredReports.length === 0 ? (
                  <tr><td colSpan="5" className="py-4 text-center text-gray-400 text-sm">No reports match filter</td></tr>
                ) : (
                  filteredReports.slice(0, 5).map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50 transition">
                      <td className="py-3 text-sm text-gray-500 font-mono">#{report.id}</td>
                      <td className="py-3 text-sm font-medium text-gray-800">{report.title}</td>
                      <td className="py-3 text-sm text-gray-500">{report.location || 'N/A'}</td>
                      <td className="py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium text-white ${getStatusBadge(report.status)}`}>
                          {report.status || 'Unknown'}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-400">{new Date(report.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {recentReports.length > 5 && (
            <div className="mt-3 text-right">
              <Link to="/reports" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">View All →</Link>
            </div>
          )}
        </motion.div>

        {/* ─── ACTIVITY TIMELINE ────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><Clock className="text-emerald-500" size={20} /> Recent Activity</h3>
          <div className="space-y-3">
            {recentActivities.slice(0, 5).map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition group">
                <div className={`p-2 bg-${activity.color}-100 rounded-xl group-hover:scale-105 transition`}>
                  <activity.icon className={`text-${activity.color}-500`} size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{activity.text}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── QUICK ACTIONS ────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        <Link to="/reports" className="flex items-center gap-3 px-4 py-3 bg-emerald-50 text-emerald-700 rounded-2xl hover:bg-emerald-100 transition shadow-sm hover:shadow-md">
          <div className="p-2 bg-emerald-500 rounded-xl"><FileText className="text-white" size={16} /></div>
          <span className="font-semibold text-sm">New Report</span>
        </Link>
        <Link to="/users" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-2xl hover:bg-blue-100 transition shadow-sm hover:shadow-md">
          <div className="p-2 bg-blue-500 rounded-xl"><UserPlus className="text-white" size={16} /></div>
          <span className="font-semibold text-sm">Add User</span>
        </Link>
        <Link to="/partners" className="flex items-center gap-3 px-4 py-3 bg-purple-50 text-purple-700 rounded-2xl hover:bg-purple-100 transition shadow-sm hover:shadow-md">
          <div className="p-2 bg-purple-500 rounded-xl"><Building2 className="text-white" size={16} /></div>
          <span className="font-semibold text-sm">Register Org</span>
        </Link>
        <Link to="/alerts" className="flex items-center gap-3 px-4 py-3 bg-orange-50 text-orange-700 rounded-2xl hover:bg-orange-100 transition shadow-sm hover:shadow-md">
          <div className="p-2 bg-orange-500 rounded-xl"><Bell className="text-white" size={16} /></div>
          <span className="font-semibold text-sm">Broadcast Alert</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default Dashboard;