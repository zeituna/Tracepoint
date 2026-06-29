import React from 'react'

const Users = () => {
  const users = [
    { id: 1, name: 'Admin User', email: 'admin@tracepoint.com', role: 'Administrator', status: 'Active' },
    { id: 2, name: 'John Doe', email: 'john@tracepoint.com', role: 'Moderator', status: 'Active' },
    { id: 3, name: 'Jane Smith', email: 'jane@tracepoint.com', role: 'User', status: 'Inactive' },
    { id: 4, name: 'Mike Johnson', email: 'mike@tracepoint.com', role: 'User', status: 'Active' },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Manage system users</p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
          ➕ Add User
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Role</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{user.name}</td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{user.role}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === 'Active' ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-red-600 bg-red-50 dark:bg-red-900/20'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
