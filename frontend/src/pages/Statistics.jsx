import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, FileText, CheckCircle, Clock } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Statistics = () => {
  const stats = [
    { label: 'Total Reports', value: '124', icon: FileText, color: 'from-blue-500 to-blue-600' },
    { label: 'Active Cases', value: '45', icon: Clock, color: 'from-red-500 to-red-600' },
    { label: 'Resolved Cases', value: '79', icon: CheckCircle, color: 'from-emerald-500 to-emerald-600' },
    { label: 'Registered Users', value: '38', icon: Users, color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 bg-gradient-to-br from-slate-50/80 to-gray-100/80 min-h-screen">
      <PageHeader 
        icon={BarChart3}
        title="Statistics"
        subtitle="Analytics and performance metrics"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition shadow-sm">
            <TrendingUp size={16} />
            Export Report
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-emerald-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-2xl shadow-lg`}>
                <stat.icon className="text-white" size={20} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h4 className="font-semibold text-gray-800 mb-4">Monthly Trends</h4>
        <div className="h-48 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl flex items-center justify-center border border-emerald-200/50">
          <p className="text-gray-400 text-sm">Chart placeholder – integrate Recharts here</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
