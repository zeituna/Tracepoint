import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import L from 'leaflet'
import { Search, Navigation, MapPin, Filter, Plus, Minus } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Custom icons for different statuses
const getMarkerIcon = (status) => {
  const colors = {
    Active: '#10b981',
    Pending: '#f59e0b',
    Resolved: '#3b82f6'
  }
  const color = colors[status] || '#6b7280'
  
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color.replace('#', '')}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
}

const MapTracking = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [mapCenter, setMapCenter] = useState([1.5, 40.5])
  const [mapZoom, setMapZoom] = useState(7)

  const locations = [
    { 
      id: 1, 
      name: 'Amina Hassan', 
      location: 'Wajir, Kenya', 
      status: 'Active',
      lastSeen: '2 hours ago',
      age: 28,
      description: 'Last seen wearing blue dress near Wajir market',
      lat: 1.7471,
      lng: 40.0686,
      color: 'green'
    },
    { 
      id: 2, 
      name: 'Mohamed Ali', 
      location: 'Mandera, Kenya', 
      status: 'Active',
      lastSeen: '4 hours ago',
      age: 34,
      description: 'Wearing red jacket, last seen at Mandera bus station',
      lat: 3.9303,
      lng: 41.8530,
      color: 'green'
    },
    { 
      id: 3, 
      name: 'Fatumia Ibrahim', 
      location: 'Garissa, Kenya', 
      status: 'Pending',
      lastSeen: '6 hours ago',
      age: 22,
      description: 'Last seen near Garissa market, wearing green dress',
      lat: -0.4522,
      lng: 39.6460,
      color: 'orange'
    },
  ]

  const getStatusColor = (status) => {
    const colors = {
      Active: 'text-green-600 bg-green-50 dark:bg-green-950/30',
      Pending: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950/30',
      Resolved: 'text-blue-600 bg-blue-50 dark:bg-blue-950/30'
    }
    return colors[status] || 'text-gray-600 bg-gray-50'
  }

  const getStatusDot = (status) => {
    const colors = {
      Active: 'bg-green-500',
      Pending: 'bg-yellow-500',
      Resolved: 'bg-blue-500'
    }
    return colors[status] || 'bg-gray-500'
  }

  const filteredLocations = locations.filter(loc => {
    const matchesSearch = loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          loc.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || loc.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleLocationClick = (location) => {
    setSelectedLocation(location)
    setMapCenter([location.lat, location.lng])
    setMapZoom(12)
  }

  const stats = {
    total: locations.length,
    active: locations.filter(l => l.status === 'Active').length,
    pending: locations.filter(l => l.status === 'Pending').length,
    resolved: locations.filter(l => l.status === 'Resolved').length,
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Map & Tracking</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Track missing persons in North Eastern Kenya</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-green-600/20 flex items-center gap-2">
          <Navigation size={18} />
          Refresh Location
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">Active</p>
          <p className="text-xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
          <p className="text-xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">Resolved</p>
          <p className="text-xl font-bold text-blue-600">{stats.resolved}</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'Active', 'Pending', 'Resolved'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterStatus === status
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Map and List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-green-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Live Location</span>
            </div>
            <div className="text-xs text-gray-400">{filteredLocations.length} markers</div>
          </div>
          <div className="h-[450px] w-full relative">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {filteredLocations.map((location) => (
                <React.Fragment key={location.id}>
                  <Marker
                    position={[location.lat, location.lng]}
                    icon={getMarkerIcon(location.status)}
                    eventHandlers={{
                      click: () => handleLocationClick(location),
                    }}
                  >
                    <Popup>
                      <div className="min-w-[200px] py-1">
                        <h3 className="font-bold text-gray-900">{location.name}</h3>
                        <p className="text-sm text-gray-600">{location.location}</p>
                        <p className="text-xs text-gray-500">🕐 {location.lastSeen}</p>
                        <p className="text-xs text-gray-500">👤 {location.age} years</p>
                        <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(location.status)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(location.status)}`}></span>
                          {location.status}
                        </span>
                        <button 
                          className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white text-sm py-1.5 rounded-lg transition-all"
                          onClick={() => handleLocationClick(location)}
                        >
                          View Details
                        </button>
                      </div>
                    </Popup>
                  </Marker>

                  {location.status === 'Active' && (
                    <Circle
                      center={[location.lat, location.lng]}
                      radius={30000}
                      pathOptions={{
                        color: '#10b981',
                        fillColor: '#10b981',
                        fillOpacity: 0.15,
                        weight: 2,
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </MapContainer>

            {/* Zoom Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-[1000]">
              <button 
                onClick={() => setMapZoom(mapZoom + 1)}
                className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
              >
                <Plus size={18} className="text-gray-700 dark:text-gray-300" />
              </button>
              <button 
                onClick={() => setMapZoom(mapZoom - 1)}
                className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
              >
                <Minus size={18} className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Locations List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">📍 Locations</h3>
          </div>
          <div className="max-h-[450px] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
            {filteredLocations.map((loc) => (
              <div
                key={loc.id}
                onClick={() => handleLocationClick(loc)}
                className={`p-4 hover:bg-green-50 dark:hover:bg-green-950/10 cursor-pointer transition-all ${
                  selectedLocation?.id === loc.id ? 'bg-green-50 dark:bg-green-950/20 border-l-4 border-green-600' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{loc.name}</h4>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(loc.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(loc.status)}`}></span>
                        {loc.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{loc.location}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span>🕐 {loc.lastSeen}</span>
                      <span>👤 {loc.age} years</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">{loc.description}</p>
                  </div>
                  <MapPin size={16} className="text-green-600 flex-shrink-0" />
                </div>
                {loc.status === 'Active' && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Live tracking
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapTracking
