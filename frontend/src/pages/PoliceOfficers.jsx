import React from 'react';
import { UserCog } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const PoliceOfficers = () => {
  return (
    <div className="p-6">
      <PageHeader icon={UserCog} title="Police Officers" subtitle="Manage police officers" />
      <div className="bg-white rounded-xl shadow p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Police Officers Management</h2>
        <p className="text-gray-500 mt-2">Police officer list and management features coming soon</p>
      </div>
    </div>
  );
};

export default PoliceOfficers;
