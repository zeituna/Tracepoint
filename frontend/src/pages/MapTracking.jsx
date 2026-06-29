import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet'
import L from 'leaflet'
import { Search, Navigation, MapPin, Filter, Layers, Crosshair, Plus, Minus } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Custom icons
const activeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const resolvedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const pendingIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const MapTracking = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [mapCenter, setMapCenter] = useState([-1.286389, 36.817223]) // Nairobi
  const [mapZoom, setMapZoom] = useState(12)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [mapRef, setMapRef] = useState(null)

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
      ]
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
      description: 'Wearing red jacket and jeans',
      route: [
        [-1.169350, 36.816720],
        [-1.1720, 36.8190],
        [-1.1680, 36.8200],
      ]
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
      description: 'Found safe and reunited with family',
      route: []
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
      route: []
    },
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'text-green-600 bg-green-50 dark:bg-green-900/20'
      case 'Resolved': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
      case 'Pending': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getMarkerIcon = (status) => {
    switch(status) {
      case 'Active': return activeIcon
      case 'Resolved': return resolvedIcon
      case 'Pending': return pendingIcon
      default: return undefined
    }
  }

  const filteredLocations = locations.filter(loc => {
    if (filterStatus === 'all') return true
    return loc.status === filterStatus
  })

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Map & Tracking</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Real-time location tracking for missing persons</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button 
            onClick={handleLocateMe}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Crosshair size={18} />
            My Location
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Total Locations</p>
          <p className="text-xl font-bold text-gray-900">{locations.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Active</p>
          <p className="text-xl font-bold text-green-600">{locations.filter(l => l.status === 'Active').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Resolved</p>
          <p className="text-xl font-bold text-blue-600">{locations.filter(l => l.status === 'Resolved').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Pending</p>
          <p className="text-xl font-bold text-yellow-600">{locations.filter(l => l.status === 'Pending').length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Map */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-primary-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Live Tracking</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>📍 {locations.length} markers</span>
            </div>
          </div>
          <div className="h-[500px] w-full relative">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: '100%', width: '100%' }}
              ref={setMapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Location Markers */}
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
                      <div className="min-w-[200px]">
                        <h3 className="font-bold text-gray-900">{location.name}</h3>
                        <p className="text-sm text-gray-600">{location.location}</p>
                        <p className="text-xs text-gray-500">Last seen: {location.lastSeen}</p>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(location.status)}`}>
                          {location.status}
                        </span>
                        <button 
                          className="mt-2 w-full bg-primary-500 text-white text-sm py-1 rounded hover:bg-primary-600 transition-colors"
                          onClick={() => handleLocationClick(location)}
                        >
                          View Details
                        </button>
                      </div>
                    </Popup>
                  </Marker>

                  {/* Route Polyline for Active cases */}
                  {location.route && location.route.length > 1 && location.status === 'Active' && (
                    <Polyline
                      positions={location.route}
                      color="#f97316"
                      weight={3}
                      opacity={0.7}
                      dashArray="5, 5"
                    />
                  )}

                  {/* Radius Circle for Active cases */}
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
                </React.Fragment>
              ))}
            </MapContainer>

            {/* Map Controls Overlay */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <button 
                onClick={() => setMapZoom(mapZoom + 1)}
                className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Plus size={18} className="text-gray-700 dark:text-gray-300" />
              </button>
              <button 
                onClick={() => setMapZoom(mapZoom - 1)}
                className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Minus size={18} className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Right - Locations List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-3 py-1.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button 
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filterStatus === 'all' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setFilterStatus('Active')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filterStatus === 'Active' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                Active
              </button>
              <button 
                onClick={() => setFilterStatus('Resolved')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filterStatus === 'Resolved' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                Resolved
              </button>
              <button 
                onClick={() => setFilterStatus('Pending')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filterStatus === 'Pending' 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
            </div>
          </div>

          <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
            {filteredLocations.map((location) => (
              <div 
                key={location.id} 
                className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors ${
                  selectedLocation?.id === location.id ? 'bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500' : ''
                }`}
                onClick={() => handleLocationClick(location)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{location.name}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(location.status)}`}>
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
                {location.route && location.route.length > 0 && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                    <span className="inline-block w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                    <span>Live tracking active</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredLocations.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <MapPin size={32} className="mx-auto mb-2 opacity-50" />
              <p>No locations found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MapTracking
