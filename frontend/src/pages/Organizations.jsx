import React from 'react'

const Organizations = () => {
  const organizations = [
    { id: 1, name: 'Kenya Red Cross', location: 'Nairobi, Kenya', members: 45, status: 'Active' },
    { id: 2, name: 'Missing Children Kenya', location: 'Mombasa, Kenya', members: 28, status: 'Active' },
    { id: 3, name: 'Search & Rescue Team', location: 'Kisumu, Kenya', members: 32, status: 'Active' },
    { id: 4, name: 'Community Watch', location: 'Nakuru, Kenya', members: 15, status: 'Inactive' },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Organizations</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Manage partner organizations</p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
          ➕ Add Organization
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {organizations.map((org) => (
          <div key={org.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{org.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{org.location}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${org.status === 'Active' ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-red-600 bg-red-50 dark:bg-red-900/20'}`}>
                {org.status}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>👥 {org.members} Members</span>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded-lg text-sm transition-colors">
                View
              </button>
              <button className="border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-1 rounded-lg text-sm transition-colors">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Organizations
