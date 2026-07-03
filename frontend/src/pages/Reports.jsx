import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, Filter, ChevronDown } from 'lucide-react';

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const reports = [
    { id: 1, name: 'Amina Hassan', location: 'Wajir, Kenya', date: '2024-06-29', status: 'Active', age: 28 },
    { id: 2, name: 'Fatumia Ali', location: 'Garissa, Kenya', date: '2024-06-28', status: 'Pending', age: 32 },
    { id: 3, name: 'Mohamed Omar', location: 'Nairobi, Kenya', date: '2024-06-27', status: 'Resolved', age: 45 },
    { id: 4, name: 'Sarah Ochieng', location: 'Kisumu, Kenya', date: '2024-06-26', status: 'Active', age: 22 },
    { id: 5, name: 'John Kimani', location: 'Mombasa, Kenya', date: '2024-06-25', status: 'Pending', age: 38 },
  ];

  const stats = [
    { label: 'Total', value: reports.length, color: 'bg-blue-500' },
    { label: 'Active', value: reports.filter(r => r.status === 'Active').length, color: 'bg-emerald-500' },
    { label: 'Pending', value: reports.filter(r => r.status === 'Pending').length, color: 'bg-yellow-500' },
    { label: 'Resolved', value: reports.filter(r => r.status === 'Resolved').length, color: 'bg-green-500' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-emerald-100 text-emerald-700',
      'Pending': 'bg-yellow-100 text-yellow-700',
      'Resolved': 'bg-green-100 text-green-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const filteredReports = reports.filter(report =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        <p className="text-gray-500 text-sm">Manage missing person reports</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className={`text-2xl font-bold mt-1 ${stat.color.replace('bg-', 'text-')}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
          <Filter size={16} />
          Filter
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{report.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{report.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{report.location}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{report.date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{report.age}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-emerald-600">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-blue-600">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredReports.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No reports found
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
