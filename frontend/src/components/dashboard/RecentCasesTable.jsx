import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit, MapPin } from 'lucide-react';

const statusBadge = (status) => {
  const colors = {
    active: 'bg-red-100 text-red-700',
    resolved: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    closed: 'bg-gray-100 text-gray-700'
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
};

const RecentCasesTable = ({ cases }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Recent Cases</h3>
        <Link to="/reports" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">View All →</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <th className="pb-3 font-semibold">Case ID</th>
              <th className="pb-3 font-semibold">Missing Person</th>
              <th className="pb-3 font-semibold">County</th>
              <th className="pb-3 font-semibold">Date</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {cases.length === 0 ? (
              <tr><td colSpan="6" className="py-4 text-center text-gray-400 text-sm">No cases found</td></tr>
            ) : (
              cases.slice(0,5).map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition">
                  {/* ─── ID column without # ────────────────── */}
                  <td className="py-3 text-sm text-gray-500 font-mono">{c.id}</td>
                  <td className="py-3 text-sm font-medium text-gray-800">{c.person}</td>
                  <td className="py-3 text-sm text-gray-500">{c.county}</td>
                  <td className="py-3 text-sm text-gray-400">{c.date}</td>
                  <td className="py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge(c.status)}`}>{c.status}</span></td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <button className="text-gray-400 hover:text-emerald-600 transition"><Eye size={16} /></button>
                      <button className="text-gray-400 hover:text-emerald-600 transition"><Edit size={16} /></button>
                      <button className="text-gray-400 hover:text-emerald-600 transition"><MapPin size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default RecentCasesTable;