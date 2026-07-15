import React from 'react';
import { Shield, AlertTriangle, Users, Phone, Search, MapPin, Clock, Heart } from 'lucide-react';

const SafetyTips = () => {
  const tips = [
    {
      icon: Search,
      title: 'Stay Alert',
      description: 'Always be aware of your surroundings and report suspicious activities.'
    },
    {
      icon: Phone,
      title: 'Keep Contacts Updated',
      description: 'Ensure family and friends have your current contact information.'
    },
    {
      icon: MapPin,
      title: 'Share Location',
      description: 'Let someone know where you are going and when you expect to return.'
    },
    {
      icon: Clock,
      title: 'Act Quickly',
      description: 'If someone goes missing, report immediately. Time is critical.'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Work with community members and organizations to spread awareness.'
    },
    {
      icon: Heart,
      title: 'Stay Hopeful',
      description: 'Many missing persons are found safe. Keep hope and stay positive.'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Safety Tips</h1>
        <p className="text-gray-500 mb-8">Important tips to help prevent and respond to missing persons cases</p>

        <div className="grid md:grid-cols-2 gap-6">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                <tip.icon className="text-emerald-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{tip.title}</h3>
              <p className="text-gray-600 text-sm">{tip.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 text-yellow-700">
            <AlertTriangle size={20} />
            <p className="font-medium">In case of emergency, call 999 or 112 immediately.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyTips;
