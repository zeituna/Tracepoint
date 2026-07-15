import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Video, BookOpen, Phone, Mail, Globe, Users, Shield } from 'lucide-react';

const Resources = () => {
  const resources = [
    {
      icon: FileText,
      title: 'Download Forms',
      description: 'Printable missing person report forms',
      link: '#'
    },
    {
      icon: BookOpen,
      title: 'Guide Books',
      description: 'Comprehensive guides on missing persons cases',
      link: '#'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'How to use TracePoint effectively',
      link: '#'
    },
    {
      icon: Phone,
      title: 'Help Lines',
      description: 'Emergency contact numbers and helplines',
      link: '#'
    },
    {
      icon: Globe,
      title: 'External Resources',
      description: 'Links to partner organizations and agencies',
      link: '#'
    },
    {
      icon: Users,
      title: 'Community Groups',
      description: 'Find support groups in your area',
      link: '#'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Resources</h1>
        <p className="text-gray-500 mb-8">Helpful resources for missing persons cases</p>

        <div className="grid md:grid-cols-2 gap-6">
          {resources.map((resource, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                <resource.icon className="text-emerald-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{resource.title}</h3>
              <p className="text-gray-600 text-sm">{resource.description}</p>
              <Link to={resource.link} className="inline-block mt-3 text-emerald-600 text-sm font-medium hover:text-emerald-700 transition">
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
