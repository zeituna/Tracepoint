import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Search, Filter } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const AuditLogs = () => {
  const logs = [
    { id: 1, user: 'Admin', action: 'Logged in', timestamp: '2026-07-21 10:30', ip: '192.168.1.1' },
    { id: 2, user: 'Leila User', action: 'Updated case #123', timestamp: '2026-07-21 09:15', ip: '192.168.1.2' },
    { id: 3, user: 'Admin', action: 'Changed system settings', timestamp: '2026-07-21 08:45', ip: '192.168.1.1' },
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 bg-gradient-to-br from-slate-50/80 to-gray-100/80 min-h-screen">
      <PageHeader
        icon={Activity}
        title="Audit Logs"
        subtitle="Track all administrative actions"
        actions={
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition shadow-sm">
              <Search size={16} />
              Search
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition shadow-sm">
              <Filter size={16} />
              Filter
            </button>
          </div>
        }
      />
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50/80 border-b border-gray-100">
            <tr className="text-left text-xs text-gray-400 uppercase tracking-wider">
              <th className="p-4 font-semibold">User</th>
              <th className="p-4 font-semibold">Action</th>
              <th className="p-4 font-semibold">Timestamp</th>
              <th className="p-4 font-semibold">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50 transition">
                <td className="p-4 text-sm font-medium text-gray-800">{log.user}</td>
                <td className="p-4 text-sm text-gray-500">{log.action}</td>
                <td className="p-4 text-sm text-gray-500">{log.timestamp}</td>
                <td className="p-4 text-sm text-gray-400">{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;
