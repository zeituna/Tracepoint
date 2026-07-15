import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: July 2026</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. Information We Collect</h2>
              <p className="text-gray-600">
                We collect information you provide directly, such as your name, email address, phone number, and any information you submit in missing person reports or communications.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. How We Use Your Information</h2>
              <p className="text-gray-600">
                We use your information to provide and improve our services, communicate with you, help locate missing persons, and facilitate reunification efforts.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. Data Security</h2>
              <p className="text-gray-600">
                We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or misuse.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Information Sharing</h2>
              <p className="text-gray-600">
                We share information with authorized organizations, authorities, and community members involved in missing persons cases. We do not sell your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Your Rights</h2>
              <p className="text-gray-600">
                You have the right to access, correct, or delete your personal information at any time. Contact us to exercise these rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">6. Contact Us</h2>
              <p className="text-gray-600">
                If you have questions about this Privacy Policy, please contact us at privacy@tracepoint.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
