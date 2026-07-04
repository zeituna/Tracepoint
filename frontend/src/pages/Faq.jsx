import React, { useState } from 'react';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'What is TracePoint?',
      a: 'TracePoint is a comprehensive Missing Person Reporting & Tracking System designed to help bring loved ones home safely.'
    },
    {
      q: 'How do I report a missing person?',
      a: 'You can report a missing person by clicking the "New Report" button on the Reports page and filling in the required information.'
    },
    {
      q: 'Is my data secure?',
      a: 'Yes, we use 256-bit SSL encryption and follow GDPR compliance to ensure your data is protected.'
    },
    {
      q: 'How can I track a case?',
      a: 'You can track cases using the Map Tracking feature which shows real-time locations of active cases.'
    },
    {
      q: 'Who can use TracePoint?',
      a: 'TracePoint is available to everyone - individuals, families, law enforcement, and organizations.'
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1>
      <p className="text-gray-600 mb-6">Find answers to the most common questions about TracePoint.</p>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-800">{faq.q}</span>
                <span className="text-2xl text-emerald-500">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
