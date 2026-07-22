import React from 'react';
import { motion } from 'framer-motion';
import { Activity, RefreshCw } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SystemHealthWidget from '../components/dashboard/SystemHealth';

const SystemHealth = () => {
  const healthServices = [
    { name: 'Database', status: 'healthy' },
    { name: 'Server', status: 'healthy' },
    { name: 'GPS Tracking', status: 'warning' },
    { name: 'Facial Recognition', status: 'healthy' },
    { name: 'SMS Service', status: 'healthy' },
    { name: 'Email Service', status: 'healthy' },
    { name: 'Storage Usage', status: 'warning' },
    { name: 'Last Backup', status: 'healthy' },
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 bg-gradient-to-br from-slate-50/80 to-gray-100/80 min-h-screen">
      <PageHeader
        icon={Activity}
        title="System Health"
        subtitle="Real-time monitoring of all system services"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition shadow-sm">
            <RefreshCw size={16} />
            Refresh
          </button>
        }
      />
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <SystemHealthWidget services={healthServices} />
      </div>
    </div>
  );
};

export default SystemHealth;
