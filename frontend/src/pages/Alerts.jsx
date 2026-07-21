import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertTriangle, Clock } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Alerts = () => {
  const [alerts] = useState([
    { id: 1, title: 'Emergency: Missing child in Kibera', priority: 'high', status: 'active', time: '2 hours ago' },
    { id: 2, title: 'Garissa alert: Elderly woman missing', priority: 'medium', status: 'resolved', time: '5 hours ago' },
    { id: 3, title: 'Mombasa: Teenager last seen', priority: 'low', status: 'pending', time: '1 day ago' },
  ]);

  return (
    <div className="p-6 md:p-8 space-y-6 bg-gradient-to-br from-slate-50/80 to-gray-100/80 min-h-screen">
      <PageHeader 
        icon={Bell}
        title="Alerts"
        subtitle="Emergency alerts and notifications"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition shadow-sm">
            <Bell size={16} />
            Broadcast Alert
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {alerts.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border-l-4 ${
              alert.priority === 'high' ? 'border-red-500' :
              alert.priority === 'medium' ? 'border-yellow-500' :
              'border-blue-500'
            } border-t border-r border-b border-gray-100`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-xl ${
                alert.priority === 'high' ? 'bg-red-100' :
                alert.priority === 'medium' ? 'bg-yellow-100' :
                'bg-blue-100'
              }`}>
                {alert.priority === 'high' ? <AlertTriangle size={20} className="text-red-600" /> :
                 alert.priority === 'medium' ? <Clock size={20} className="text-yellow-600" /> :
                 <Bell size={20} className="text-blue-600" />}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{alert.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full ${
                    alert.status === 'active' ? 'bg-red-100 text-red-700' :
                    alert.status === 'resolved' ? 'bg-green-100 text-green-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {alert.status}
                  </span>
                  <span className="text-xs text-gray-400">{alert.time}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
