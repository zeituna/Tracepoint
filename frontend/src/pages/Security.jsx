import React from 'react';

const Security = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Security</h1>
      <p className="text-gray-600 mb-6">Your security is our top priority.</p>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🔒 256-bit SSL Encryption</h2>
          <p className="text-gray-600 text-sm">All data transmitted between your browser and our servers is encrypted using industry-standard 256-bit SSL encryption.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🛡️ Secure Data Storage</h2>
          <p className="text-gray-600 text-sm">Your data is stored securely in encrypted databases with multiple layers of protection.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🔐 Authentication</h2>
          <p className="text-gray-600 text-sm">We use secure authentication methods to ensure only authorized users can access sensitive information.</p>
        </div>
      </div>
    </div>
  );
};

export default Security;
