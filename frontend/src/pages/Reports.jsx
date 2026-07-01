import React, { useState } from 'react'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingReport, setEditingReport] = useState(null)

  const [reports, setReports] = useState([
    { id: 1, name: 'Amina Hassan', location: 'Wajir, Kenya', date: '2024-06-29', status: 'Active', age: 28, description: 'Last seen wearing blue dress near Wajir market' },
    { id: 2, name: 'Fatumia Ali', location: 'Garissa, Kenya', date: '2024-06-28', status: 'Pending', age: 32, description: 'Missing from Garissa market area' },
    { id: 3, name: 'Mohamed Ali', location: 'Mandera, Kenya', date: '2024-06-27', status: 'Active', age: 34, description: 'Last seen at Mandera bus station' },
    { id: 4, name: 'Aisha Hassan', location: 'Wajir, Kenya', date: '2024-06-26', status: 'Resolved', age: 22, description: 'Found safe in Wajir town' },
    { id: 5, name: 'Ibrahim Ahmed', location: 'Garissa, Kenya', date: '2024-06-25', status: 'Active', age: 45, description: 'Last seen near Garissa market' },
  ])

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    date: '',
    status: 'Active',
    age: '',
    description: ''
  })

  const [nextId, setNextId] = useState(6)

  const getStatusColor = (status) => {
    const colors = {
      Active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      Pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      Resolved: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const getStatusDot = (status) => {
    const colors = {
      Active: 'bg-green-500',
      Pending: 'bg-yellow-500',
      Resolved: 'bg-blue-500',
    }
    return colors[status] || 'bg-gray-500'
  }

  const handleAddReport = () => {
    setEditingReport(null)
    setFormData({ name: '', location: '', date: '', status: 'Active', age: '', description: '' })
    setShowModal(true)
  }

  const handleEditReport = (report) => {
    setEditingReport(report)
    setFormData({
      name: report.name,
      location: report.location,
      date: report.date,
      status: report.status,
      age: report.age,
      description: report.description || ''
    })
    setShowModal(true)
  }

  const handleDeleteReport = (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setReports(reports.filter(r => r.id !== id))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingReport) {
      setReports(reports.map(r => r.id === editingReport.id ? { ...r, ...formData } : r))
    } else {
      setReports([...reports, { id: nextId, ...formData }])
      setNextId(nextId + 1)
    }
    setShowModal(false)
    setFormData({ name: '', location: '', date: '', status: 'Active', age: '', description: '' })
  }

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          report.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || report.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: reports.length,
    active: reports.filter(r => r.status === 'Active').length,
    pending: reports.filter(r => r.status === 'Pending').length,
    resolved: reports.filter(r => r.status === 'Resolved').length,
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Manage missing person reports</p>
        </div>
        <button 
          onClick={handleAddReport}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-green-600/20 flex items-center gap-2"
        >
          <Plus size={18} />
          New Report
        </button>
      </div>

      {/* Stats - Green & White */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">Active</p>
          <p className="text-xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
          <p className="text-xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">Resolved</p>
          <p className="text-xl font-bold text-blue-600">{stats.resolved}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'Active', 'Pending', 'Resolved'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterStatus === status
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Table - Green & White */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Age</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-green-50 dark:hover:bg-green-950/10 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{report.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{report.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{report.location}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{report.date}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(report.status)}`}></span>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{report.age}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-green-50 dark:hover:bg-green-950/30 rounded-lg text-green-600 dark:text-green-400 transition-colors">
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditReport(report)}
                        className="p-1.5 hover:bg-green-50 dark:hover:bg-green-950/30 rounded-lg text-green-600 dark:text-green-400 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteReport(report.id)}
                        className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg text-red-600 dark:text-red-400 transition-colors"
                      >
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
          <div className="py-12 text-center">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">No reports found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Try adjusting your search or filter</p>
          </div>
        )}

        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span>Showing {filteredReports.length} of {reports.length} reports</span>
          <span className="text-green-600 font-medium">{reports.length} total</span>
        </div>
      </div>

      {/* Modal - Green & White */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {editingReport ? 'Edit Report' : 'Add New Report'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location *</label>
                  <select
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select Location</option>
                    <option value="Wajir, Kenya">Wajir, Kenya</option>
                    <option value="Mandera, Kenya">Mandera, Kenya</option>
                    <option value="Garissa, Kenya">Garissa, Kenya</option>
                    <option value="Nairobi, Kenya">Nairobi, Kenya</option>
                    <option value="Mombasa, Kenya">Mombasa, Kenya</option>
                    <option value="Kisumu, Kenya">Kisumu, Kenya</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter age"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    placeholder="Enter description..."
                  />
                </div>
                
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-all shadow-lg shadow-green-600/20"
                  >
                    {editingReport ? 'Update Report' : 'Add Report'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reports
