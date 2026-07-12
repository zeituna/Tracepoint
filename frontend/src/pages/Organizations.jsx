import React, { useState, useEffect } from 'react';
import { Building2, Users, Plus, Edit, Trash2, Search, Mail, MapPin, Phone, Award, Shield, Globe } from 'lucide-react';

const Organizations = () => {
  const [organizations, setOrganizations] = useState([
    // ===== NORTH EASTERN REGION =====
    {
      id: 1,
      name: 'North Eastern Kenya Missing Persons & Safety Initiative',
      location: 'Garissa, Kenya (Serving Garissa, Mandera & Wajir)',
      status: 'active',
      members: 28,
      email: 'info@nekenyasafety.or.ke',
      phone: '+254 700 789 012',
      description: 'Unified regional organization serving the entire North Eastern Kenya. Coordinates missing persons cases, community safety, and peace initiatives across Garissa, Mandera, and Wajir counties.',
      founded: '2024',
      type: 'Regional Organization',
      region: 'North Eastern Kenya',
      regionalIcon: '🏜️',
      counties: ['Garissa', 'Mandera', 'Wajir']
    },

    // ===== COAST REGION =====
    {
      id: 2,
      name: 'Coast Region Search & Rescue Network',
      location: 'Mombasa, Kenya (Serving Coast Region)',
      status: 'active',
      members: 22,
      email: 'info@coastrescue.or.ke',
      phone: '+254 700 888 999',
      description: 'Regional search and rescue network serving the entire Coast region. Covers Mombasa, Lamu, Kilifi, Kwale, and Taita Taveta counties.',
      founded: '2023',
      type: 'Regional Organization',
      region: 'Coast Region',
      regionalIcon: '🏖️',
      counties: ['Mombasa', 'Lamu', 'Kilifi', 'Kwale', 'Taita Taveta']
    },

    // ===== EASTERN REGION =====
    {
      id: 3,
      name: 'Eastern Kenya Community Safety Alliance',
      location: 'Embu, Kenya (Serving Eastern Region)',
      status: 'active',
      members: 20,
      email: 'info@eksafety.or.ke',
      phone: '+254 700 222 333',
      description: 'Regional community safety alliance serving Eastern Kenya. Covers Embu, Meru, Tharaka Nithi, and Kitui counties.',
      founded: '2022',
      type: 'Regional Organization',
      region: 'Eastern Region',
      regionalIcon: '⛰️',
      counties: ['Embu', 'Meru', 'Tharaka Nithi', 'Kitui']
    },

    // ===== CENTRAL REGION =====
    {
      id: 4,
      name: 'Central Kenya Family & Safety Network',
      location: 'Nairobi, Kenya (Serving Central Region)',
      status: 'active',
      members: 25,
      email: 'info@cksafety.or.ke',
      phone: '+254 700 111 222',
      description: 'Regional family support and safety network serving Central Kenya. Covers Nairobi, Kiambu, Murang\'a, Nyeri, and Kirinyaga counties.',
      founded: '2020',
      type: 'Regional Organization',
      region: 'Central Region',
      regionalIcon: '🏙️',
      counties: ['Nairobi', 'Kiambu', 'Murang\'a', 'Nyeri', 'Kirinyaga']
    },

    // ===== RIFT VALLEY REGION =====
    {
      id: 5,
      name: 'Rift Valley Search & Rescue Initiative',
      location: 'Nakuru, Kenya (Serving Rift Valley Region)',
      status: 'active',
      members: 24,
      email: 'info@rvsearchrescue.or.ke',
      phone: '+254 700 555 666',
      description: 'Regional search and rescue initiative serving the entire Rift Valley region. Covers Nakuru, Eldoret, Kericho, Naivasha, and Baringo counties.',
      founded: '2022',
      type: 'Regional Organization',
      region: 'Rift Valley',
      regionalIcon: '🌋',
      counties: ['Nakuru', 'Uasin Gishu', 'Kericho', 'Naivasha', 'Baringo']
    },

    // ===== NYANZA REGION =====
    {
      id: 6,
      name: 'Nyanza Region Water & Community Safety',
      location: 'Kisumu, Kenya (Serving Nyanza Region)',
      status: 'active',
      members: 18,
      email: 'info@nyanzasafety.or.ke',
      phone: '+254 700 777 888',
      description: 'Regional water and community safety organization serving Nyanza region. Covers Kisumu, Homa Bay, Migori, and Siaya counties.',
      founded: '2021',
      type: 'Regional Organization',
      region: 'Nyanza Region',
      regionalIcon: '🌊',
      counties: ['Kisumu', 'Homa Bay', 'Migori', 'Siaya']
    },

    // ===== WESTERN KENYA =====
    {
      id: 7,
      name: 'Western Kenya Community Safety Alliance',
      location: 'Kakamega, Kenya (Serving Western Kenya)',
      status: 'active',
      members: 20,
      email: 'info@wksafety.or.ke',
      phone: '+254 700 999 000',
      description: 'Regional community safety alliance serving Western Kenya. Covers Kakamega, Bungoma, Busia, and Vihiga counties.',
      founded: '2022',
      type: 'Regional Organization',
      region: 'Western Kenya',
      regionalIcon: '🌿',
      counties: ['Kakamega', 'Bungoma', 'Busia', 'Vihiga']
    },

    // ===== SOUTH EASTERN REGION =====
    {
      id: 8,
      name: 'South Eastern Kenya Safety Initiative',
      location: 'Machakos, Kenya (Serving South Eastern Region)',
      status: 'pending',
      members: 15,
      email: 'info@sekenyasafety.or.ke',
      phone: '+254 700 444 555',
      description: 'Regional safety initiative serving South Eastern Kenya. Covers Machakos, Makueni, and Kajiado counties.',
      founded: '2024',
      type: 'Regional Organization',
      region: 'South Eastern Kenya',
      regionalIcon: '🌄',
      counties: ['Machakos', 'Makueni', 'Kajiado']
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRegion, setFilterRegion] = useState('all');

  // Get unique regions
  const regions = ['all', ...new Set(organizations.map(org => org.region))];

  const filteredOrgs = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          org.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          org.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          org.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || org.status === filterStatus;
    const matchesRegion = filterRegion === 'all' || org.region === filterRegion;
    return matchesSearch && matchesStatus && matchesRegion;
  });

  const stats = {
    total: organizations.length,
    active: organizations.filter(o => o.status === 'active').length,
    pending: organizations.filter(o => o.status === 'pending').length,
    regions: [...new Set(organizations.map(o => o.region))].length,
  };

  const regionCounts = organizations.reduce((acc, org) => {
    acc[org.region] = (acc[org.region] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Organizations</h1>
          <p className="text-gray-500">Regional partner organizations across Kenya</p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full">🏠 All Regions</span>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">📍 {stats.regions} Regions</span>
            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">🤝 {stats.total} Organizations</span>
          </div>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/30">
          <Plus size={20} />
          Add Organization
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 border border-green-100">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 border border-yellow-100">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 border border-emerald-100">
          <p className="text-sm text-gray-500">Regions</p>
          <p className="text-2xl font-bold text-emerald-600">{stats.regions}</p>
        </div>
      </div>

      {/* Region Distribution */}
      <div className="flex flex-wrap gap-2 bg-white rounded-xl shadow p-3">
        <span className="text-sm font-medium text-gray-600 mr-2">Regions:</span>
        {Object.entries(regionCounts).map(([region, count]) => (
          <span key={region} className={`px-3 py-1 rounded-full text-xs font-medium ${
            region === 'North Eastern Kenya' 
              ? 'bg-amber-100 text-amber-700' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            {region} ({count})
          </span>
        ))}
      </div>

      {/* Regions Covered */}
      <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-xl p-3 border border-emerald-200">
        <div className="flex items-center gap-3 flex-wrap">
          <Globe className="h-6 w-6 text-emerald-600" />
          <div>
            <p className="text-sm font-medium text-emerald-800">
              🌟 All Regions Represented
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="px-2 py-0.5 bg-amber-200 text-amber-800 text-xs rounded-full">🏜️ North Eastern</span>
              <span className="px-2 py-0.5 bg-blue-200 text-blue-800 text-xs rounded-full">🏖️ Coast</span>
              <span className="px-2 py-0.5 bg-purple-200 text-purple-800 text-xs rounded-full">⛰️ Eastern</span>
              <span className="px-2 py-0.5 bg-green-200 text-green-800 text-xs rounded-full">🏙️ Central</span>
              <span className="px-2 py-0.5 bg-red-200 text-red-800 text-xs rounded-full">🌋 Rift Valley</span>
              <span className="px-2 py-0.5 bg-teal-200 text-teal-800 text-xs rounded-full">🌊 Nyanza</span>
              <span className="px-2 py-0.5 bg-yellow-200 text-yellow-800 text-xs rounded-full">🌿 Western</span>
              <span className="px-2 py-0.5 bg-pink-200 text-pink-800 text-xs rounded-full">🌄 South Eastern</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, region, or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <select
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region === 'all' ? 'All Regions' : region}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            {['all', 'active', 'pending'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  filterStatus === status
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Organizations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrgs.map((org) => (
          <div key={org.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02]">
            {/* Card Header */}
            <div className={`p-4 ${org.status === 'active' ? 'bg-gradient-to-r from-emerald-50 to-emerald-100/50' : 'bg-gradient-to-r from-yellow-50 to-yellow-100/50'} ${
              org.region === 'North Eastern Kenya' ? 'border-l-4 border-amber-500' : 'border-l-4 border-emerald-500'
            }`}>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${
                    org.status === 'active' ? 'bg-emerald-500/20' : 'bg-yellow-500/20'
                  }`}>
                    <Building2 className={`h-6 w-6 ${
                      org.status === 'active' ? 'text-emerald-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{org.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>{org.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs text-white ${
                    org.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}>
                    {org.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{org.type}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  org.region === 'North Eastern Kenya' 
                    ? 'bg-amber-100 text-amber-700' 
                    : 'bg-emerald-100 text-emerald-600'
                }`}>
                  {org.region}
                </span>
                <span className="text-xs">{org.regionalIcon}</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{org.description}</p>
              
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-4 w-4 text-emerald-500" />
                  <span className="font-medium">{org.members}</span>
                  <span className="text-gray-400">members</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4 text-blue-500" />
                  <span className="text-sm truncate">{org.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">{org.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span className="text-xs text-gray-400">Founded: {org.founded}</span>
                </div>
                {org.counties && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {org.counties.map((county) => (
                      <span key={county} className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                        📍 {county}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button className="flex-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition flex items-center justify-center gap-1">
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
                <button className="flex-1 px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition flex items-center justify-center gap-1">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrgs.length === 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <Building2 className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700">No organizations found</h3>
          <p className="text-gray-400">Try adjusting your search or filter</p>
        </div>
      )}

      {/* Footer Info */}
      <div className="text-center text-sm text-gray-400 border-t border-gray-200 pt-4">
        <p>Showing {filteredOrgs.length} of {organizations.length} regional organizations across Kenya</p>
        <p className="text-xs text-emerald-500 mt-1">🇰🇪 Every region in Kenya is represented</p>
      </div>
    </div>
  );
};

export default Organizations;
