import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users, FileText, AlertTriangle, CheckCircle, Building2, UserPlus,
  Calendar, Target, Shield, Scan, MapPin
} from 'lucide-react';
import KPICard from '../components/dashboard/KPICard';
import { BarChartComponent, PieChartComponent } from '../components/dashboard/Charts';
import RecentCasesTable from '../components/dashboard/RecentCasesTable';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import SystemHealth from '../components/dashboard/SystemHealth';
import MapWidget from '../components/dashboard/MapWidget';

// ─── Dummy data (replace with real API calls) ──────────────
const kpiData = [
  { title: 'Total Cases', value: 124, icon: FileText, color: 'from-blue-500 to-blue-600', trend: '+12%', trendUp: true, subtitle: 'Last 30 days' },
  { title: 'Active Cases', value: 45, icon: AlertTriangle, color: 'from-red-500 to-red-600', trend: '+5%', trendUp: true, subtitle: 'In progress' },
  { title: 'Resolved Cases', value: 79, icon: CheckCircle, color: 'from-emerald-500 to-emerald-600', trend: '+8%', trendUp: true, subtitle: 'Families reunited' },
  { title: 'High Priority', value: 12, icon: Target, color: 'from-orange-500 to-orange-600', trend: '-2%', trendUp: false, subtitle: 'Urgent' },
  { title: 'Registered Users', value: 38, icon: Users, color: 'from-purple-500 to-purple-600', trend: '+15%', trendUp: true, subtitle: 'Total users' },
  { title: 'Partner Orgs', value: 5, icon: Building2, color: 'from-teal-500 to-teal-600', trend: '+2%', trendUp: true, subtitle: 'This month' },
  { title: 'Police Depts', value: 12, icon: Shield, color: 'from-indigo-500 to-indigo-600', trend: '+4%', trendUp: true, subtitle: 'Active' },
  { title: "Today's Reports", value: 3, icon: Calendar, color: 'from-rose-500 to-rose-600', trend: '+1', trendUp: true, subtitle: 'New cases' },
];

const monthlyData = [
  { name: 'Jan', reports: 12 }, { name: 'Feb', reports: 18 }, { name: 'Mar', reports: 15 },
  { name: 'Apr', reports: 22 }, { name: 'May', reports: 20 }, { name: 'Jun', reports: 25 },
];

const statusData = [
  { name: 'Active', value: 45 }, { name: 'Resolved', value: 79 }, { name: 'Pending', value: 12 },
];

const countyData = [
  { name: 'Nairobi', value: 20 }, { name: 'Garissa', value: 15 }, { name: 'Mombasa', value: 12 },
  { name: 'Kisumu', value: 8 }, { name: 'Nakuru', value: 7 },
];

const recentCases = [
  { id: 1, person: 'Aisha Mohamed', county: 'Nairobi', date: '2026-07-20', status: 'active' },
  { id: 2, person: 'James Kiprop', county: 'Garissa', date: '2026-07-19', status: 'pending' },
  { id: 3, person: 'Mary Akinyi', county: 'Mombasa', date: '2026-07-18', status: 'resolved' },
  { id: 4, person: 'Peter Odhiambo', county: 'Kisumu', date: '2026-07-17', status: 'active' },
  { id: 5, person: 'Grace Wambui', county: 'Nakuru', date: '2026-07-16', status: 'active' },
];

const activities = [
  { type: 'report', text: 'New missing person report filed for Kibera', time: '2 min ago', color: 'emerald' },
  { type: 'resolved', text: 'Case #123 resolved – family reunited', time: '15 min ago', color: 'green' },
  { type: 'user', text: 'Ahmed Hassan registered as volunteer', time: '1 hour ago', color: 'blue' },
  { type: 'alert', text: 'Emergency alert issued for Garissa', time: '2 hours ago', color: 'orange' },
  { type: 'org', text: 'Red Cross joined as partner', time: '3 hours ago', color: 'purple' },
];

const healthServices = [
  { name: 'Database', status: 'healthy' },
  { name: 'Server', status: 'healthy' },
  { name: 'GPS Tracking', status: 'warning' },
  { name: 'Facial Recog.', status: 'healthy' },
  { name: 'SMS Service', status: 'healthy' },
  { name: 'Email Service', status: 'healthy' },
  { name: 'Last Backup', status: 'warning' },
  { name: 'API', status: 'healthy' },
];

const mapLocations = [
  { id: 1, name: 'Kibera, Nairobi', lat: -1.315, lng: 36.783, status: 'active' },
  { id: 2, name: 'Garissa Town', lat: -0.462, lng: 39.646, status: 'active' },
  { id: 3, name: 'Mombasa CBD', lat: -4.043, lng: 39.668, status: 'pending' },
  { id: 4, name: 'Kisumu', lat: -0.102, lng: 34.762, status: 'active' },
];

// ─── Component ──────────────────────────────────────────────
const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, idx) => (
          <KPICard key={idx} {...kpi} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BarChartComponent data={monthlyData} dataKey="reports" nameKey="name" title="Monthly Reported Cases" />
        </div>
        <div>
          <PieChartComponent data={statusData} title="Case Status Distribution" />
        </div>
      </div>

      {/* Second Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChartComponent data={countyData} dataKey="value" nameKey="name" title="Cases by County" />
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex items-center justify-center">
          <div className="text-center">
            <h3 className="font-semibold text-gray-800 mb-2">Monthly Resolution Rate</h3>
            <p className="text-4xl font-bold text-emerald-600">67%</p>
            <p className="text-sm text-gray-500 mt-1">+5% vs last month</p>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '67%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Cases & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentCasesTable cases={recentCases} />
        </div>
        <div>
          <ActivityFeed activities={activities} />
        </div>
      </div>

      {/* System Health & Map Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SystemHealth services={healthServices} />
        </div>
        <div>
          <MapWidget locations={mapLocations} />
        </div>
      </div>

      {/* ─── Quick Actions ────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Link to="/report-missing" className="flex items-center gap-3 px-4 py-3 bg-emerald-50 text-emerald-700 rounded-2xl hover:bg-emerald-100 transition shadow-sm hover:shadow-md">
          <FileText size={18} className="text-emerald-500" />
          <span className="font-semibold text-sm">Report New Case</span>
        </Link>
        <Link to="/users" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-2xl hover:bg-blue-100 transition shadow-sm hover:shadow-md">
          <Users size={18} className="text-blue-500" />
          <span className="font-semibold text-sm">Manage Users</span>
        </Link>
        <Link to="/organizations" className="flex items-center gap-3 px-4 py-3 bg-purple-50 text-purple-700 rounded-2xl hover:bg-purple-100 transition shadow-sm hover:shadow-md">
          <Building2 size={18} className="text-purple-500" />
          <span className="font-semibold text-sm">Manage Orgs</span>
        </Link>
        <Link to="/map-tracking" className="flex items-center gap-3 px-4 py-3 bg-orange-50 text-orange-700 rounded-2xl hover:bg-orange-100 transition shadow-sm hover:shadow-md">
          <MapPin size={18} className="text-orange-500" />
          <span className="font-semibold text-sm">View Map</span>
        </Link>
        <Link to="/facial-recognition" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-2xl hover:bg-indigo-100 transition shadow-sm hover:shadow-md">
          <Scan size={18} className="text-indigo-500" />
          <span className="font-semibold text-sm">Run Facial Recognition</span>
        </Link>
        <Link to="/reports" className="flex items-center gap-3 px-4 py-3 bg-rose-50 text-rose-700 rounded-2xl hover:bg-rose-100 transition shadow-sm hover:shadow-md">
          <FileText size={18} className="text-rose-500" />
          <span className="font-semibold text-sm">Generate Reports</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;