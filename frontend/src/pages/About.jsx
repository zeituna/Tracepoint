import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">About TracePoint</h1>
      <p className="text-gray-600 mb-6">Trusted by experts and families worldwide.</p>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h2>
          <p className="text-gray-600 text-sm">To help bring loved ones home safely by providing a comprehensive missing person reporting and tracking system.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Verified Platform</h2>
          <p className="text-gray-600 text-sm">Our platform is trusted by families, law enforcement, and organizations across the globe.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Expert Endorsement</h2>
          <p className="text-gray-600 text-sm">TracePoint is recognized and recommended by security experts and missing person organizations.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
