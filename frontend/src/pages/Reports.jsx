import React, { useState } from 'react'

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingReport, setEditingReport] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    date: '',
    status: 'Active',
    age: '',
    description: '',
  })

  const [reports, setReports] = useState([
    { id: 1, name: 'Amina Hassan', location: 'Nairobi, Kenya', date: '2024-06-29', status: 'Active', age: 28, description: 'Last seen wearing blue dress' },
    { id: 2, name: 'Fatumia Ali', location: 'Garissa, Kenya', date: '2024-06-28', status: 'Pending', age: 32, description: 'Missing from home' },
    { id: 3, name: 'Peter Otieno', location: 'Kiambu, Kenya', date: '2024-06-27', status: 'Active', age: 45, description: 'Wearing red jacket' },
    { id: 4, name: 'Sarah Wanjiru', location: 'Mombasa, Kenya', date: '2024-06-26', status: 'Resolved', age: 19, description: 'Found safe' },
    { id: 5, name: 'John Mwangi', location: 'Nakuru, Kenya', date: '2024-06-25', status: 'Active', age: 34, description: 'Last seen at market' },
  ])

  const [nextId, setNextId] = useState(6)

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'text-green-600 bg-green-50 dark:bg-green-900/20'
      case 'Pending': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
      case 'Resolved': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusBadgeColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'Pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'Resolved': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      default: return 'bg-gray-100 text-gray-700'
    }
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
      description: report.description || '',
    })
    setShowModal(true)
  }

  const handleDeleteReport = (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setReports(reports.filter(report => report.id !== id))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingReport) {
      // Edit existing
      setReports(reports.map(report => 
        report.id === editingReport.id 
          ? { ...report, ...formData }
          : report
      ))
    } else {
      // Add new
      setReports([...reports, { id: nextId, ...formData }])
      setNextId(nextId + 1)
    }
    
    setShowModal(false)
    setFormData({ name: '', location: '', date: '', status: 'Active', age: '', description: '' })
  }

  const handleViewReport = (report) => {
    alert(`📋 Report Details:\n\nName: ${report.name}\nLocation: ${report.location}\nDate: ${report.date}\nStatus: ${report.status}\nAge: ${report.age}\nDescription: ${report.description || 'N/A'}`)
  }

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          report.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || report.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Manage missing person reports</p>
        </div>
        <button 
          onClick={handleAddReport}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105 shadow-md flex items-center gap-2"
        >
          ➕ New Report
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-6 flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button 
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'all' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilterStatus('Active')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'Active' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Active
          </button>
          <button 
            onClick={() => setFilterStatus('Pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'Pending' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilterStatus('Resolved')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'Resolved' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Resolved
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Location</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Age</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{report.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{report.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{report.location}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{report.date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{report.age}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button 
                        onClick={() => handleViewReport(report)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleEditReport(report)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteReport(report.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredReports.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p className="text-4xl mb-2">📋</p>
            <p>No reports found</p>
          </div>
        )}

        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-sm text-gray-500">
          <span>Showing {filteredReports.length} of {reports.length} reports</span>
          <span className="text-xs">{reports.length} total reports</span>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {editingReport ? 'Edit Report' : 'Add New Report'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter location"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter age"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter description..."
                  />
                </div>
                
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                  >
                    {editingReport ? 'Update Report' : 'Add Report'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
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
