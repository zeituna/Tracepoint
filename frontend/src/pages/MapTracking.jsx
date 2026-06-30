import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet'
import L from 'leaflet'
import { 
  Search, 
  Navigation, 
  MapPin, 
  Filter, 
  Crosshair, 
  Plus, 
  Minus,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye
} from 'lucide-react'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Custom icons for different statuses
const createIcon = (color) => new L.Icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const MapTracking = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [mapCenter, setMapCenter] = useState([-1.286389, 36.817223])
  const [mapZoom, setMapZoom] = useState(12)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [showStats, setShowStats] = useState(true)

  const locations = [
    { 
      id: 1, 
      name: 'Amina Hassan', 
      location: 'Nairobi, Kenya', 
      lat: -1.286389, 
      lng: 36.817223, 
      status: 'Active',
      lastSeen: '2 hours ago',
      age: 28,
      description: 'Last seen wearing blue dress',
      route: [
        [-1.286389, 36.817223],
        [-1.2921, 36.8219],
        [-1.2950, 36.8185],
        [-1.2900, 36.8140],
      ],
      color: 'red'
    },
    { 
      id: 2, 
      name: 'Peter Otieno', 
      location: 'Kiambu, Kenya', 
      lat: -1.169350, 
      lng: 36.816720, 
      status: 'Active',
      lastSeen: '4 hours ago',
      age: 45,
      description: 'Wearing red jacket',
      route: [
        [-1.169350, 36.816720],
        [-1.1720, 36.8190],
        [-1.1680, 36.8200],
      ],
      color: 'red'
    },
    { 
      id: 3, 
      name: 'Fatumia Ali', 
      location: 'Garissa, Kenya', 
      lat: -0.452250, 
      lng: 39.646000, 
      status: 'Resolved',
      lastSeen: '1 day ago',
      age: 32,
      description: 'Found safe and reunited',
      route: [],
      color: 'green'
    },
    { 
      id: 4, 
      name: 'Sarah Wanjiru', 
      location: 'Mombasa, Kenya', 
      lat: -4.043477, 
      lng: 39.668206, 
      status: 'Pending',
      lastSeen: '6 hours ago',
      age: 19,
      description: 'Last seen near bus station',
      route: [],
      color: 'orange'
    },
  ]

  const getStatusColor = (status) => {
    const colors = {
      Active: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30',
      Pending: 'text-amber-600 bg-amber-50 dark:bg-amber-950/30',
      Resolved: 'text-blue-600 bg-blue-50 dark:bg-blue-950/30',
    }
    return colors[status] || 'text-gray-600 bg-gray-50'
  }

  const getStatusDot = (status) => {
    const colors = {
      Active: 'bg-emerald-500',
      Pending: 'bg-amber-500',
      Resolved: 'bg-blue-500',
    }
    return colors[status] || 'bg-gray-500'
  }

  const getStatusIcon = (status) => {
    const icons = {
      Active: <AlertCircle size={14} className="text-emerald-500" />,
      Pending: <Clock size={14} className="text-amber-500" />,
      Resolved: <CheckCircle size={14} className="text-blue-500" />,
    }
    return icons[status] || null
  }

  const filteredLocations = locations.filter(loc => {
    const matchesSearch = loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          loc.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || loc.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: locations.length,
    active: locations.filter(l => l.status === 'Active').length,
    pending: locations.filter(l => l.status === 'Pending').length,
    resolved: locations.filter(l => l.status === 'Resolved').length,
  }

  const handleLocationClick = (location) => {
    setSelectedLocation(location)
    setMapCenter([location.lat, location.lng])
    setMapZoom(15)
  }

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter([position.coords.latitude, position.coords.longitude])
          setMapZoom(15)
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Map & Tracking</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Track missing persons in real-time</p>
        </div>
        <button 
          onClick={handleLocateMe}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary-500/25 flex items-center gap-2"
        >
          <Crosshair size={18} />
          My Location
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">Total Locations</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">Active</p>
          <p className="text-xl font-bold text-emerald-600">{stats.active}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
          <p className="text-xl font-bold text-amber-600">{stats.pending}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">Resolved</p>
          <p className="text-xl font-bold text-blue-600">{stats.resolved}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'Active', 'Pending', 'Resolved'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                filterStatus === status
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
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
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-primary-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Live Tracking</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>📍 {filteredLocations.length} markers</span>
            </div>
          </div>
          <div className="h-[500px] w-full relative">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {filteredLocations.map((location) => (
                <React.Fragment key={location.id}>
                  <Marker
                    position={[location.lat, location.lng]}
                    icon={createIcon(location.color)}
                    eventHandlers={{
                      click: () => handleLocationClick(location),
                    }}
                  >
                    <Popup>
                      <div className="min-w-[200px] py-1">
                        <h3 className="font-bold text-gray-900">{location.name}</h3>
                        <p className="text-sm text-gray-600">{location.location}</p>
                        <p className="text-xs text-gray-500">🕐 {location.lastSeen}</p>
                        <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(location.status)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(location.status)}`}></span>
                          {location.status}
                        </span>
                        <button 
                          className="mt-2 w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm py-1.5 rounded-xl hover:shadow-lg transition-all"
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
                      radius={2000}
                      pathOptions={{
                        color: '#ef4444',
                        fillColor: '#ef4444',
                        fillOpacity: 0.1,
                        weight: 2,
                      }}
                    />
                  )}

                  {location.route && location.route.length > 1 && (
                    <Polyline
                      positions={location.route}
                      color={location.status === 'Active' ? '#f97316' : '#22c55e'}
                      weight={3}
                      opacity={0.7}
                      dashArray={location.status === 'Active' ? '5, 5' : undefined}
                    />
                  )}
                </React.Fragment>
              ))}
            </MapContainer>

            {/* Map Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <button 
                onClick={() => setMapZoom(mapZoom + 1)}
                className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Plus size={18} className="text-gray-700 dark:text-gray-300" />
              </button>
              <button 
                onClick={() => setMapZoom(mapZoom - 1)}
                className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Minus size={18} className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Locations List */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Users size={18} className="text-primary-500" />
              Locations
              <span className="ml-auto text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                {filteredLocations.length}
              </span>
            </h3>
          </div>

          <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
            {filteredLocations.map((location) => (
              <div 
                key={location.id} 
                className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-all duration-200 ${
                  selectedLocation?.id === location.id ? 'bg-primary-50 dark:bg-primary-950/20 border-l-4 border-primary-500' : ''
                }`}
                onClick={() => handleLocationClick(location)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{location.name}</h4>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(location.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(location.status)}`}></span>
                        {location.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{location.location}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span>🕐 {location.lastSeen}</span>
                      <span>👤 {location.age} years</span>
                    </div>
                    {location.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">{location.description}</p>
                    )}
                  </div>
                  <MapPin size={16} className="text-primary-500 flex-shrink-0 mt-1" />
                </div>
                {location.status === 'Active' && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
                    <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    Live tracking active
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredLocations.length === 0 && (
            <div className="py-12 text-center">
              <div className="text-4xl mb-3">🗺️</div>
              <p className="text-gray-500 dark:text-gray-400 font-medium">No locations found</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">Try adjusting your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MapTracking
