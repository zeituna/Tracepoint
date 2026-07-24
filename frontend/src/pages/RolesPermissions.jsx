import React from 'react';
import { Shield } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const RolesPermissions = () => {
  return (
    <div className="p-6">
      <PageHeader icon={Shield} title="Roles & Permissions" subtitle="Manage roles and permissions" />
      <div className="bg-white rounded-xl shadow p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Roles & Permissions</h2>
        <p className="text-gray-500 mt-2">Role and permission management coming soon</p>
      </div>
    </div>
  );
};

export default RolesPermissions;
