import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  ArrowUpDown
} from 'lucide-react';

const SearchMissing = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    location: '',
    dateFrom: '',
    dateTo: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Real cases from your system (only active cases)
  const results = [
    {
      id: 1,
      name: 'Amina Hassan',
      age: 28,
      location: 'Wajir, Kenya',
      status: 'active',
      date: '2024-06-29',
      image: '/images/people/amina-hassan.jpg',
      description: 'Last seen wearing a blue dress near Wajir market'
    },
    {
      id: 2,
      name: 'Mohamed Ali',
      age: 45,
      location: 'Garissa, Kenya',
      status: 'active',
      date: '2024-07-10',
      image: '/images/people/mohamed-ali.jpg',
      description: 'Last seen at Garissa market wearing a blue jacket and white cap'
    },
    {
      id: 3,
      name: 'Sarah Ochieng',
      age: 22,
      location: 'Kisumu, Kenya',
      status: 'active',
      date: '2024-07-11',
      image: '/images/people/sarah-ochieng.jpg',
      description: 'Missing from Kisumu port area'
    },
  ];

  const filteredResults = results.filter(result => {
    const matchesSearch = result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          result.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filters.status || result.status === filters.status;
    const matchesLocation = !filters.location || result.location.toLowerCase().includes(filters.location.toLowerCase());
    return matchesSearch && matchesStatus && matchesLocation;
  });

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-red-500',
      pending: 'bg-yellow-500',
      resolved: 'bg-green-500',
    };
    return badges[status] || 'bg-gray-500';
  };

  const clearFilters = () => {
    setFilters({ status: '', location: '', dateFrom: '', dateTo: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Search Missing Persons</h1>
            <p className="text-gray-500 mt-1">Find and track missing persons cases</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <Link
              to="/report-missing"
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
            >
              Report Missing
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">{results.length}</p>
            <p className="text-xs text-gray-500">Total Cases</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{results.filter(r => r.status === 'active').length}</p>
            <p className="text-xs text-gray-500">Active</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{results.filter(r => r.status === 'resolved').length}</p>
            <p className="text-xs text-gray-500">Resolved</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <Filter size={18} />
              Filters
              {Object.values(filters).some(v => v) && (
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              )}
            </button>
            <div className="flex gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-emerald-100 text-emerald-600' : 'hover:bg-gray-100'}`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-600' : 'hover:bg-gray-100'}`}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    placeholder="City or County"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date Range</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={filters.dateFrom}
                      onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                      className="flex-1 mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      type="date"
                      value={filters.dateTo}
                      onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                      className="flex-1 mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 transition"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">
            Showing {filteredResults.length} of {results.length} results
          </p>
        </div>

        {/* Results Grid */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.length === 0 ? (
              <div className="col-span-3 text-center py-12 bg-white rounded-2xl shadow-lg">
                <Search className="mx-auto text-gray-300" size={48} />
                <p className="text-gray-500 mt-4">No cases found</p>
                <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredResults.map((result) => (
                <Link
                  key={result.id}
                  to={`/case/${result.id}`}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 border border-gray-100 group"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200 group-hover:border-emerald-400 transition">
                      <img 
                        src={result.image} 
                        alt={result.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const initials = result.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                          e.target.style.display = 'none';
                          const parent = e.target.parentNode;
                          const fallback = document.createElement('div');
                          fallback.className = 'w-full h-full flex items-center justify-center text-white text-xl font-bold';
                          fallback.style.backgroundColor = '#10b981';
                          fallback.textContent = initials;
                          parent.appendChild(fallback);
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{result.name}</h3>
                      <p className="text-sm text-gray-500">{result.age} years</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusBadge(result.status)}`}>
                      {result.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2 text-gray-600">
                      <MapPin size={14} />
                      {result.location}
                    </p>
                    <p className="flex items-center gap-2 text-gray-600">
                      <Calendar size={14} />
                      {result.date}
                    </p>
                    <p className="text-gray-500 text-xs mt-2">{result.description}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {filteredResults.length === 0 ? (
              <div className="text-center py-12">
                <Search className="mx-auto text-gray-300" size={48} />
                <p className="text-gray-500 mt-4">No cases found</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Person</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredResults.map((result) => (
                    <tr key={result.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <Link to={`/case/${result.id}`} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                            <img 
                              src={result.image} 
                              alt={result.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const initials = result.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                                e.target.style.display = 'none';
                                const parent = e.target.parentNode;
                                const fallback = document.createElement('div');
                                fallback.className = 'w-full h-full flex items-center justify-center text-white text-xs font-bold';
                                fallback.style.backgroundColor = '#10b981';
                                fallback.textContent = initials;
                                parent.appendChild(fallback);
                              }}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{result.name}</p>
                            <p className="text-sm text-gray-500">{result.age} years</p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{result.location}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusBadge(result.status)}`}>
                          {result.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{result.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMissing;
