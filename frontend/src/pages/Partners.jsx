import React, { useState } from 'react';
import { Building2, Users, Search, Mail, Phone, MapPin } from 'lucide-react';

const Partners = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const partners = [
    {
      id: 1,
      name: 'Garissa Community Safety Network',
      location: 'Garissa, Kenya',
      status: 'active',
      members: 12,
      email: 'info@garissasafety.or.ke',
      phone: '+254 700 123 456',
      description: 'Community-based organization focused on safety and security in Garissa County.'
    },
    {
      id: 2,
      name: 'North Eastern Missing Persons Unit',
      location: 'Garissa, Kenya',
      status: 'active',
      members: 8,
      email: 'info@nempu.garissa.go.ke',
      phone: '+254 700 789 012',
      description: 'Specialized unit handling missing persons cases in North Eastern Kenya.'
    },
    {
      id: 3,
      name: 'Horn of Africa Rescue Initiative',
      location: 'Garissa, Kenya',
      status: 'active',
      members: 6,
      email: 'info@hari.or.ke',
      phone: '+254 700 901 234',
      description: 'Regional rescue and recovery organization based in Garissa.'
    },
    {
      id: 4,
      name: 'Garissa Youth Development Association',
      location: 'Garissa, Kenya',
      status: 'active',
      members: 15,
      email: 'info@gyda.or.ke',
      phone: '+254 700 345 678',
      description: 'Youth-led organization promoting community development and security awareness.'
    },
  ];

  const filteredPartners = partners.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Our Partners</h1>
          <p className="text-gray-500">Organizations working together to reunite families</p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search partners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Partners Grid */}
        {filteredPartners.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <Building2 className="mx-auto text-gray-300" size={48} />
            <p className="text-gray-500 mt-4">No partners found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPartners.map((partner) => (
              <div key={partner.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{partner.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin size={14} />
                      {partner.location}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs text-white bg-green-500 flex-shrink-0 ml-2">
                    {partner.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{partner.description}</p>
                <div className="space-y-1.5 text-sm">
                  <p className="flex items-center gap-2 text-gray-600">
                    <Users size={14} className="text-emerald-500" />
                    {partner.members} members
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Mail size={14} className="text-blue-500" />
                    <span className="truncate">{partner.email}</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Phone size={14} className="text-purple-500" />
                    {partner.phone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Partners;
