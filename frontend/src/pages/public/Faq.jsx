import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronRight, MessageCircle } from 'lucide-react';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      name: 'General',
      questions: [
        {
          q: 'What is TracePoint?',
          a: 'TracePoint is a comprehensive missing person tracking and reporting system that helps communities, organizations, and authorities locate missing individuals and reunite families.'
        },
        {
          q: 'How does TracePoint work?',
          a: 'Users can report missing persons, upload photos and information, track cases on interactive maps, receive real-time alerts, and collaborate with organizations and authorities.'
        },
        {
          q: 'Is TracePoint free to use?',
          a: 'Yes, TracePoint is completely free for everyone. Our mission is to help reunite families without any cost barriers.'
        },
        {
          q: 'Who can use TracePoint?',
          a: 'Anyone can use TracePoint - community members, families, organizations, government agencies, police departments, and humanitarian organizations.'
        }
      ]
    },
    {
      name: 'Reporting',
      questions: [
        {
          q: 'How do I report a missing person?',
          a: 'You can report a missing person by clicking on the "Report Missing" button on our website and filling out the detailed form with all relevant information.'
        },
        {
          q: 'What information do I need to provide?',
          a: 'You should provide the person\'s full name, age, physical description, recent photo, last known location, date missing, and any other relevant details.'
        },
        {
          q: 'Can I report anonymously?',
          a: 'Yes, you can report a missing person anonymously. However, providing contact information helps us follow up and update you on the case.'
        },
        {
          q: 'How long does it take to process a report?',
          a: 'Reports are processed immediately. Once submitted, authorities and organizations are notified and can begin their investigation right away.'
        }
      ]
    },
    {
      name: 'Security & Privacy',
      questions: [
        {
          q: 'Is my information secure?',
          a: 'Yes, we use industry-standard encryption, secure servers, and strict privacy controls to protect your personal information and data.'
        },
        {
          q: 'Who can see my reports?',
          a: 'Your reports are visible to authorized users including organizations, authorities, and community members involved in the case.'
        },
        {
          q: 'How is my data protected?',
          a: 'We use encryption, role-based access control, audit logs, and regular security audits to ensure your data is safe and secure.'
        },
        {
          q: 'Do you share my information with third parties?',
          a: 'We only share information with authorized organizations and authorities involved in missing persons cases. We do not sell your personal information.'
        }
      ]
    },
    {
      name: 'Organizations',
      questions: [
        {
          q: 'How can organizations join TracePoint?',
          a: 'Organizations can register through the Organizations page on our website. We welcome NGOs, government agencies, police departments, and community organizations.'
        },
        {
          q: 'What features are available for organizations?',
          a: 'Organizations get access to case management, team collaboration, advanced analytics, API access, and priority support.'
        },
        {
          q: 'Can organizations collaborate with each other?',
          a: 'Yes, organizations can share information, coordinate efforts, and work together to locate missing persons.'
        },
        {
          q: 'Is there a cost for organizations to join?',
          a: 'No, TracePoint is completely free for all organizations. We believe in removing barriers to help reunite families.'
        }
      ]
    },
    {
      name: 'Technical',
      questions: [
        {
          q: 'Do I need to download an app?',
          a: 'No, TracePoint is a web-based platform that works on all devices with a browser. No downloads required.'
        },
        {
          q: 'Is TracePoint mobile friendly?',
          a: 'Yes, our platform is fully responsive and works on smartphones, tablets, laptops, and desktop computers.'
        },
        {
          q: 'What browsers are supported?',
          a: 'TracePoint works on all modern browsers including Chrome, Firefox, Safari, Edge, and Brave.'
        },
        {
          q: 'How do I reset my password?',
          a: 'You can reset your password by clicking on "Forgot Password" on the login page and following the instructions sent to your email.'
        }
      ]
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const allFaqs = faqCategories.flatMap(cat => cat.questions);
  const filteredFaqs = searchTerm 
    ? allFaqs.filter(faq =>
        faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allFaqs;

  const filteredCategories = searchTerm
    ? [{ name: 'Search Results', questions: filteredFaqs }]
    : faqCategories;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-emerald-200">
            Find answers to common questions about TracePoint
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-4xl mx-auto px-6 -mt-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-lg"
          />
        </div>
      </div>

      {/* FAQ List */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {filteredCategories.map((category, catIndex) => (
          <div key={catIndex} className="mb-8">
            {!searchTerm && (
              <h2 className="text-xl font-bold text-gray-800 mb-4">{category.name}</h2>
            )}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {category.questions.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No results found for "{searchTerm}"
                </div>
              ) : (
                category.questions.map((faq, index) => {
                  const globalIndex = searchTerm 
                    ? index 
                    : allFaqs.indexOf(faq);
                  return (
                    <div key={index} className="border-b border-gray-100 last:border-b-0">
                      <button
                        onClick={() => toggleFaq(globalIndex)}
                        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition text-left"
                      >
                        <span className="font-medium text-gray-800">{faq.q}</span>
                        {openIndex === globalIndex ? (
                          <ChevronDown className="text-emerald-600 flex-shrink-0" size={20} />
                        ) : (
                          <ChevronRight className="text-gray-400 flex-shrink-0" size={20} />
                        )}
                      </button>
                      {openIndex === globalIndex && (
                        <div className="px-6 pb-4 text-gray-600">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ))}

        {/* Still Have Questions */}
        <div className="mt-12 text-center bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-8 border border-emerald-100">
          <MessageCircle className="mx-auto text-emerald-600" size={40} />
          <h3 className="text-lg font-bold text-gray-800 mt-3 mb-2">Still Have Questions?</h3>
          <p className="text-gray-600 mb-4">We're here to help you. Reach out to us anytime.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition">
              Contact Us
            </Link>
            <Link to="/resources" className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold border border-emerald-200 hover:bg-emerald-50 transition">
              View Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
