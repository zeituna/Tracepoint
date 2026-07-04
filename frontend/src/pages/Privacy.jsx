import React from 'react';

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
      <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Information We Collect</h2>
          <p className="text-gray-600 text-sm">We collect personal information that you provide to us, including your name, email address, phone number, and location data when reporting a missing person.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">How We Use Your Information</h2>
          <p className="text-gray-600 text-sm">We use your information to process reports, track cases, provide updates, and improve our services.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Data Security</h2>
          <p className="text-gray-600 text-sm">We implement 256-bit SSL encryption and follow GDPR compliance to protect your data.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Rights</h2>
          <p className="text-gray-600 text-sm">You have the right to access, modify, or delete your personal data at any time.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
