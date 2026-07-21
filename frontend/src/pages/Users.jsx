import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users as UsersIcon, UserPlus, Search, Shield } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Users = () => {
  const [users] = useState([
    { id: 1, name: 'Ahmed Hassan', email: 'ahmed@tracepoint.com', role: 'volunteer', status: 'active' },
    { id: 2, name: 'Mary Wanjiku', email: 'mary@tracepoint.com', role: 'admin', status: 'active' },
    { id: 3, name: 'John Ochieng', email: 'john@tracepoint.com', role: 'officer', status: 'pending' },
  ]);

  return (
    <div className="p-6 md:p-8 space-y-6 bg-gradient-to-br from-slate-50/80 to-gray-100/80 min-h-screen">
      <PageHeader 
        icon={Users}
        title="Users"
        subtitle="Manage system users and their roles"
        actions={
          <>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition shadow-sm">
              <Search size={16} />
              Search
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition shadow-sm">
              <UserPlus size={16} />
              Add User
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-emerald-200 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                    user.role === 'officer' ? 'bg-blue-100 text-blue-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {user.role}
                  </span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full ${
                    user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {user.status}
                  </span>
                </div>
              </div>
              <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                <Shield size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Users;
