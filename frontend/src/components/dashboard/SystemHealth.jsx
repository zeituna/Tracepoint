import React from 'react';
import { CheckCircle, AlertCircle, XCircle, Clock } from 'lucide-react';

const statusMap = {
  healthy: { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  warning: { icon: AlertCircle, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  error: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
  unknown: { icon: Clock, color: 'text-gray-400', bg: 'bg-gray-50' },
};

const SystemHealth = ({ services }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4">System Health</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {services.map((s) => {
          const { icon: Icon, color, bg } = statusMap[s.status] || statusMap.unknown;
          return (
            <div key={s.name} className={`flex items-center gap-2 p-3 rounded-xl ${bg}`}>
              <Icon className={`w-4 h-4 ${color}`} />
              <span className="text-sm font-medium text-gray-700">{s.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SystemHealth;
