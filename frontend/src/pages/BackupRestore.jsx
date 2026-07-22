import React from 'react';
import { motion } from 'framer-motion';
import { Database, Download, Upload, Clock } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const BackupRestore = () => {
  const backups = [
    { id: 1, date: '2026-07-21 03:00', size: '2.4 GB', status: 'completed' },
    { id: 2, date: '2026-07-20 03:00', size: '2.3 GB', status: 'completed' },
    { id: 3, date: '2026-07-19 03:00', size: '2.3 GB', status: 'completed' },
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 bg-gradient-to-br from-slate-50/80 to-gray-100/80 min-h-screen">
      <PageHeader
        icon={Database}
        title="Backup & Restore"
        subtitle="Manage system backups and restore points"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition shadow-sm">
            <Download size={16} />
            Create Backup
          </button>
        }
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-800">Last Backup</h3>
          <p className="text-2xl font-bold text-emerald-600 mt-2">Today 03:00 AM</p>
          <p className="text-sm text-gray-500 mt-1">Size: 2.4 GB</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-800">Backup Status</h3>
          <p className="text-2xl font-bold text-emerald-600 mt-2">✅ Healthy</p>
          <p className="text-sm text-gray-500 mt-1">All systems backed up</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-800">Restore Points</h3>
          <p className="text-2xl font-bold text-blue-600 mt-2">12</p>
          <p className="text-sm text-gray-500 mt-1">Available for recovery</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><Clock size={18} className="text-emerald-500" /> Backup History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/80 border-b border-gray-100">
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wider">
                <th className="p-3 font-semibold">Date</th>
                <th className="p-3 font-semibold">Size</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {backups.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50 transition">
                  <td className="p-3 text-sm text-gray-500">{b.date}</td>
                  <td className="p-3 text-sm text-gray-500">{b.size}</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">{b.status}</span></td>
                  <td className="p-3">
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1">
                      <Upload size={14} /> Restore
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BackupRestore;
