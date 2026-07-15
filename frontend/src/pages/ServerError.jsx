import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

const ServerError = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <AlertTriangle className="mx-auto text-red-500" size={80} />
        <h1 className="text-3xl font-bold text-gray-800 mt-4">Server Error</h1>
        <p className="text-gray-500 mt-2">Something went wrong on our end. Please try again later.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition mt-6">
          <Home size={18} />
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ServerError;
