import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Search, Eye } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Reports = () => {
  const [reports] = useState([
    { id: 1, title: 'Missing child in Kibera', location: 'Nairobi', status: 'active', date: '2026-07-18' },
    { id: 2, title: 'Elderly woman missing', location: 'Garissa', status: 'resolved', date: '2026-07-17' },
    { id: 3, title: 'Teenager last seen in Mombasa', location: 'Mombasa', status: 'pending', date: '2026-07-16' },
  ]);

  return (
    <div className="p-6 md:p-8 space-y-6 bg-gradient-to-br from-slate-50/80 to-gray-100/80 min-h-screen">
      <PageHeader 
        icon={FileText}
        title="Reports"
        subtitle="Track all missing person reports"
        actions={
          <>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition shadow-sm">
              <Search size={16} />
              Search
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition shadow-sm">
              <Plus size={16} />
              New Report
            </button>
          </>
        }
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50/80 border-b border-gray-100">
            <tr className="text-left text-xs text-gray-400 uppercase tracking-wider">
              <th className="p-4 font-semibold">ID</th>
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold">Location</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {reports.map((report, i) => (
              <motion.tr 
                key={report.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-gray-50 transition group"
              >
                {/* ─── ID column without # ────────────────── */}
                <td className="p-4 text-sm text-gray-500 font-mono">{report.id}</td>
                <td className="p-4 text-sm font-medium text-gray-800">{report.title}</td>
                <td className="p-4 text-sm text-gray-500">{report.location}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    report.status === 'active' ? 'bg-red-100 text-red-700' : 
                    report.status === 'resolved' ? 'bg-green-100 text-green-700' : 
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {report.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-400">{report.date}</td>
                <td className="p-4">
                  <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                    <Eye size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;