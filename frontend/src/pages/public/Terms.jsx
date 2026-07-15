import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last updated: July 2026</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By using TracePoint, you agree to these Terms of Service. If you do not agree, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. User Accounts</h2>
              <p className="text-gray-600">
                You are responsible for maintaining the security of your account and for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. User Responsibilities</h2>
              <p className="text-gray-600">
                You are responsible for the accuracy of information you submit and for using our services in accordance with applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Prohibited Activities</h2>
              <p className="text-gray-600">
                You may not use our services for any illegal or unauthorized purpose, or in any way that could harm others.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Intellectual Property</h2>
              <p className="text-gray-600">
                All content and technology on TracePoint is protected by intellectual property laws. You may not copy, modify, or distribute our content without permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">6. Termination</h2>
              <p className="text-gray-600">
                We reserve the right to suspend or terminate accounts that violate these terms or for any other reason.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">7. Limitation of Liability</h2>
              <p className="text-gray-600">
                We are not liable for any damages arising from your use of our services. The services are provided "as is."
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">8. Contact Us</h2>
              <p className="text-gray-600">
                If you have questions about these Terms, please contact us at legal@tracepoint.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
