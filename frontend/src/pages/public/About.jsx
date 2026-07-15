import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Users, Target, Eye, Award } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We approach every case with empathy and understanding.',
      color: 'bg-rose-50 text-rose-600'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We maintain the highest standards of honesty and transparency.',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in the power of communities working together.',
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do.',
      color: 'bg-purple-50 text-purple-600'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">About TracePoint</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Helping families reunite through technology and community collaboration
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-3">
              <Target className="text-emerald-600" size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Our Mission</h2>
            <p className="text-gray-600 text-sm">
              To provide a comprehensive, accessible, and secure platform that helps communities and authorities locate missing persons and reunite families.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
              <Eye className="text-blue-600" size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Our Vision</h2>
            <p className="text-gray-600 text-sm">
              A world where every missing person can be found and every family can be reunited.
            </p>
          </div>
        </div>

        {/* Values */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Our Core Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-5 text-center border border-gray-100">
              <div className={`w-12 h-12 rounded-xl ${value.color} flex items-center justify-center mx-auto mb-3`}>
                <value.icon size={24} />
              </div>
              <h3 className="font-semibold text-gray-800">{value.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Our Story</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Founded in Garissa, Kenya, TracePoint emerged from the urgent need to address missing persons cases in our community. 
            We saw families struggling with complex reporting systems and a lack of coordination between organizations. 
            Our platform bridges these gaps, providing a unified solution for reporting, tracking, and resolving missing persons cases.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mt-3">
            Today, TracePoint serves communities across Kenya, partnering with government agencies, NGOs, and community organizations 
            to help reunite families.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
