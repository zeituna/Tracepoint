import React from 'react';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Terms of Service</h1>
      <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Acceptance of Terms</h2>
          <p className="text-gray-600 text-sm">By using TracePoint, you agree to these terms of service.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">User Responsibilities</h2>
          <p className="text-gray-600 text-sm">Users are responsible for providing accurate information when reporting missing persons.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Prohibited Activities</h2>
          <p className="text-gray-600 text-sm">Misuse of the platform, false reporting, or unauthorized access is strictly prohibited.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Termination</h2>
          <p className="text-gray-600 text-sm">We reserve the right to terminate accounts that violate these terms.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
