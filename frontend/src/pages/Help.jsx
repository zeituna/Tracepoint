import React from 'react';

const Help = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Help Center</h1>
      <p className="text-gray-600 mb-6">Find answers to common questions and get support.</p>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">How can we help you?</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-medium text-gray-800">How to report a missing person?</h3>
            <p className="text-sm text-gray-600 mt-1">Go to Reports page and click "New Report" button.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-medium text-gray-800">How to track a case?</h3>
            <p className="text-sm text-gray-600 mt-1">Use the Map Tracking feature to view case locations.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-medium text-gray-800">How to contact support?</h3>
            <p className="text-sm text-gray-600 mt-1">Visit our Contact Us page or email support@tracepoint.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
