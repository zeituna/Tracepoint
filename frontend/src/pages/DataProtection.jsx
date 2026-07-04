import React from 'react';

const DataProtection = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Data Protection</h1>
      <p className="text-gray-600 mb-6">We are committed to protecting your data.</p>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">GDPR Compliance</h2>
          <p className="text-gray-600 text-sm">We fully comply with GDPR regulations to protect your personal data and privacy rights.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Data Collection</h2>
          <p className="text-gray-600 text-sm">We only collect data that is necessary for providing our services and improving user experience.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Rights</h2>
          <p className="text-gray-600 text-sm">You have the right to access, modify, or delete your personal data at any time.</p>
        </div>
      </div>
    </div>
  );
};

export default DataProtection;
