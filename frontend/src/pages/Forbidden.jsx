import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Home } from 'lucide-react';

const Forbidden = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <Shield className="mx-auto text-red-500" size={80} />
        <h1 className="text-3xl font-bold text-gray-800 mt-4">Access Denied</h1>
        <p className="text-gray-500 mt-2">You don't have permission to access this page.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition mt-6">
          <Home size={18} />
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
