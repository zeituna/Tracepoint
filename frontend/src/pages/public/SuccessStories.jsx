import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, MapPin, Users, CheckCircle } from 'lucide-react';

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      title: 'Family Reunited After 6 Months',
      description: 'Amina Hassan was found safe in Wajir after a community-wide search effort.',
      date: '2024-06-29',
      location: 'Wajir, Kenya',
      image: '👩🏾',
      status: 'resolved'
    },
    {
      id: 2,
      title: 'Quick Action Leads to Recovery',
      description: 'Mohamed Omar was located within 24 hours of being reported missing.',
      date: '2024-06-27',
      location: 'Nairobi, Kenya',
      image: '👨🏾',
      status: 'resolved'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Success Stories</h1>
        <p className="text-gray-500 mb-8">Real stories of families reunited</p>

        <div className="grid md:grid-cols-2 gap-6">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{story.image}</span>
                <div>
                  <h3 className="font-bold text-gray-800">{story.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={14} />
                    {story.date}
                    <MapPin size={14} className="ml-2" />
                    {story.location}
                  </div>
                </div>
                <span className="ml-auto px-2 py-1 rounded-full text-xs text-white bg-green-500">
                  Resolved
                </span>
              </div>
              <p className="text-gray-600">{story.description}</p>
              <div className="mt-4 flex items-center gap-2 text-emerald-600">
                <Heart size={16} />
                <span className="text-sm font-medium">Read Full Story</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Share Your Story</h3>
          <p className="text-gray-600">Have you been reunited with a loved one? Share your story to inspire others.</p>
          <Link to="/contact" className="inline-block mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition">
            Share Your Story
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
