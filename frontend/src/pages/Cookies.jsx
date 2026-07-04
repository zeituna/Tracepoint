import React from 'react';

const Cookies = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Cookie Policy</h1>
      <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">What Are Cookies</h2>
          <p className="text-gray-600 text-sm">Cookies are small text files stored on your device to enhance your browsing experience.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">How We Use Cookies</h2>
          <p className="text-gray-600 text-sm">We use cookies to remember your preferences, analyze site traffic, and improve our services.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Types of Cookies</h2>
          <p className="text-gray-600 text-sm">We use essential, functional, and analytical cookies to provide the best experience.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Managing Cookies</h2>
          <p className="text-gray-600 text-sm">You can manage or disable cookies in your browser settings at any time.</p>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
