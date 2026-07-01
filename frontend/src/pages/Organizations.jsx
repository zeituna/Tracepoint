import React, { useState } from 'react'
import { Search, Plus, Edit, Trash2, Building2, Users, MapPin, Mail } from 'lucide-react'

const Organizations = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingOrg, setEditingOrg] = useState(null)

  const [organizations, setOrganizations] = useState([
    { id: 1, name: 'Kenya Red Cross', location: 'Nairobi, Kenya', members: 8, status: 'Active', email: 'info@redcross.or.ke' },
    { id: 2, name: 'Missing Children Kenya', location: 'Mombasa, Kenya', members: 5, status: 'Active', email: 'info@missingchildren.or.ke' },
    { id: 3, name: 'Community Watch', location: 'Nakuru, Kenya', members: 3, status: 'Inactive', email: 'community@watch.or.ke' },
  ])

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    members: '',
    status: 'Active',
    email: '',
  })

  const handleAddOrg = () => {
    setEditingOrg(null)
    setFormData({ name: '', location: '', members: '', status: 'Active', email: '' })
    setShowModal(true)
  }

  const handleEditOrg = (org) => {
    setEditingOrg(org)
    setFormData({
      name: org.name,
      location: org.location,
      members: org.members,
      status: org.status,
      email: org.email,
    })
    setShowModal(true)
  }

  const handleDeleteOrg = (id) => {
    if (window.confirm('Are you sure you want to delete this organization?')) {
      setOrganizations(organizations.filter(o => o.id !== id))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingOrg) {
      setOrganizations(organizations.map(o => o.id === editingOrg.id ? { ...o, ...formData } : o))
    } else {
      const newId = Math.max(...organizations.map(o => o.id), 0) + 1
      setOrganizations([...organizations, { id: newId, ...formData, members: parseInt(formData.members) || 0 }])
    }
    setShowModal(false)
    setFormData({ name: '', location: '', members: '', status: 'Active', email: '' })
  }

  const filteredOrgs = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Organizations</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Manage partner organizations</p>
        </div>
        <button 
          onClick={handleAddOrg}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-green-600/20 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Organization
        </button>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Organizations Grid - No # signs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrgs.map((org) => (
          <div key={org.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center">
                  <Building2 size={20} className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{org.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{org.location}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${org.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                {org.status}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Users size={14} />
                {org.members} Members
              </span>
              <span className="flex items-center gap-1">
                <Mail size={14} />
                {org.email}
              </span>
            </div>
            <div className="mt-4 flex gap-2">
              <button 
                onClick={() => handleEditOrg(org)}
                className="flex-1 px-3 py-1.5 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 rounded-lg text-sm hover:bg-green-100 dark:hover:bg-green-950/50 transition-colors"
              >
                <Edit size={14} className="inline mr-1" />
                Edit
              </button>
              <button 
                onClick={() => handleDeleteOrg(org.id)}
                className="flex-1 px-3 py-1.5 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg text-sm hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors"
              >
                <Trash2 size={14} className="inline mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredOrgs.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <Building2 size={48} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No organizations found</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {editingOrg ? 'Edit Organization' : 'Add Organization'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Organization Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter organization name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Members</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={formData.members}
                    onChange={(e) => setFormData({ ...formData, members: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter number of members"
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
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-all shadow-lg shadow-green-600/20"
                  >
                    {editingOrg ? 'Update Organization' : 'Add Organization'}
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

export default Organizations
