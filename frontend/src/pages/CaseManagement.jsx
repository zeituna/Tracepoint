import React from 'react'

const CaseManagement = () => {
  const cases = [
    { id: 1, title: 'Missing Child - Nairobi', location: 'Nairobi, Kenya', status: 'Open', priority: 'High', assigned: 'John Doe' },
    { id: 2, title: 'Missing Person - Mombasa', location: 'Mombasa, Kenya', status: 'In Progress', priority: 'Medium', assigned: 'Jane Smith' },
    { id: 3, title: 'Human Trafficking Case', location: 'Kisumu, Kenya', status: 'Closed', priority: 'High', assigned: 'Mike Johnson' },
    { id: 4, title: 'Missing Elderly Person', location: 'Nakuru, Kenya', status: 'Open', priority: 'Low', assigned: 'Sarah Wanjiru' },
  ]

  const getStatusColor = (status) => {
    if (status === 'Open') return 'bg-red-100 text-red-700'
    if (status === 'In Progress') return 'bg-yellow-100 text-yellow-700'
    return 'bg-green-100 text-green-700'
  }

  const getPriorityColor = (priority) => {
    if (priority === 'High') return 'bg-red-100 text-red-700'
    if (priority === 'Medium') return 'bg-yellow-100 text-yellow-700'
    return 'bg-green-100 text-green-700'
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Case Management</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Manage missing person cases</p>
        </div>
        <button className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-lg">
          + New Case
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900/50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Title</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Location</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Priority</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Assigned</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {cases.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-4 py-3 text-sm">#{c.id}</td>
                <td className="px-4 py-3 text-sm font-medium">{c.title}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{c.location}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(c.status)}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(c.priority)}`}>
                    {c.priority}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{c.assigned}</td>
                <td className="px-4 py-3">
                  <button className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-3 py-1 rounded text-sm">
                    View
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

export default CaseManagement
