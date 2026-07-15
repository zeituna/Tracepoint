import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { MapPin, Calendar, User, Phone, Mail, Clock, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';

const CaseDetails = () => {
  const { id } = useParams();
  
  const caseData = {
    id: id,
    name: 'Amina Hassan',
    age: 28,
    location: 'Wajir, Kenya',
    status: 'active',
    date: '2024-06-29',
    image: '👩🏾',
    description: 'Last seen wearing a blue dress near Wajir market',
    timeline: [
      { date: '2024-06-29 14:30', event: 'Last seen at Wajir market' },
      { date: '2024-06-29 16:00', event: 'Report filed with police' },
      { date: '2024-06-29 18:30', event: 'Search operation initiated' },
      { date: '2024-06-30 08:00', event: 'Community search team deployed' },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/search-missing" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
          <ArrowLeft size={18} />
          Back to Search
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl">{caseData.image}</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{caseData.name}</h1>
                <p className="text-gray-500">{caseData.age} years</p>
              </div>
              <span className={`ml-auto px-3 py-1 rounded-full text-sm text-white ${caseData.status === 'active' ? 'bg-red-500' : 'bg-green-500'}`}>
                {caseData.status}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">Personal Information</h3>
                <p className="flex items-center gap-2 text-gray-600"><MapPin size={16} /> {caseData.location}</p>
                <p className="flex items-center gap-2 text-gray-600"><Calendar size={16} /> {caseData.date}</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">Case Details</h3>
                <p className="text-gray-600">{caseData.description}</p>
              </div>
            </div>

            <h3 className="font-semibold text-gray-800 mb-4">Case Timeline</h3>
            <div className="space-y-3">
              {caseData.timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock size={14} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{item.event}</p>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <button className="flex-1 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition font-medium">
                Share Case
              </button>
              <button className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition font-medium">
                Update Information
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
