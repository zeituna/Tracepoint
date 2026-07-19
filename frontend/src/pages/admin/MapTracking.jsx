import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap, Rectangle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Search, MapPin, Clock } from 'lucide-react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const KENYA_BOUNDS = {
  north: 5.0,
  south: -5.0,
  east: 42.0,
  west: 33.0,
};

const KENYA_CENTER = [0.0236, 37.9062];
const KENYA_ZOOM = 6;

const MISSING_PERSONS = [
  {
    id: 1,
    name: 'Amina Hassan',
    age: 28,
    location: 'Wajir, Kenya',
    lat: 1.747067,
    lng: 40.056061,
    status: 'active',
    lastSeen: '2 hours ago',
    description: 'Last seen wearing blue dress near Wajir market',
    image: '👩🏾'
  },
  {
    id: 2,
    name: 'Fatumia Ali',
    age: 32,
    location: 'Garissa, Kenya',
    lat: -0.453229,
    lng: 39.646097,
    status: 'pending',
    lastSeen: '5 hours ago',
    description: 'Last seen near Garissa town center',
    image: '👩🏾'
  },
  {
    id: 3,
    name: 'Mohamed Omar',
    age: 45,
    location: 'Nairobi, Kenya',
    lat: -1.286389,
    lng: 36.817223,
    status: 'resolved',
    lastSeen: '1 day ago',
    description: 'Found safe in Nairobi',
    image: '👨🏾'
  },
  {
    id: 4,
    name: 'Sarah Ochieng',
    age: 22,
    location: 'Kisumu, Kenya',
    lat: -0.102208,
    lng: 34.761679,
    status: 'active',
    lastSeen: '3 hours ago',
    description: 'Last seen near Kisumu port',
    image: '👩🏾'
  },
  {
    id: 5,
    name: 'John Kimani',
    age: 38,
    location: 'Mombasa, Kenya',
    lat: -4.043477,
    lng: 39.668206,
    status: 'pending',
    lastSeen: '6 hours ago',
    description: 'Last seen at Mombasa beach',
    image: '👨🏾'
  },
  {
    id: 6,
    name: 'Mary Wanjiku',
    age: 16,
    location: 'Nakuru, Kenya',
    lat: -0.303099,
    lng: 36.080026,
    status: 'active',
    lastSeen: '1 hour ago',
    description: 'Last seen near Nakuru town',
    image: '👩🏾'
  },
];

const KenyaBounds = () => {
  const map = useMap();
  useEffect(() => {
    map.setView(KENYA_CENTER, KENYA_ZOOM);
    const bounds = L.latLngBounds(
      [KENYA_BOUNDS.south, KENYA_BOUNDS.west],
      [KENYA_BOUNDS.north, KENYA_BOUNDS.east]
    );
    map.setMaxBounds(bounds);
    map.on('drag', function() {
      map.panInsideBounds(bounds, { animate: false });
    });
    map.setMinZoom(5);
    map.setMaxZoom(10);
    return () => { map.off('drag'); };
  }, [map]);
  return null;
};

const MapTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [persons, setPersons] = useState(MISSING_PERSONS);

  const filteredPersons = persons.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          person.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || person.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: persons.length,
    active: persons.filter(p => p.status === 'active').length,
    pending: persons.filter(p => p.status === 'pending').length,
    resolved: persons.filter(p => p.status === 'resolved').length,
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-red-500',
      pending: 'bg-yellow-500',
      resolved: 'bg-green-500',
    };
    return badges[status] || 'bg-gray-500';
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Map & Tracking</h1>
        <p className="text-gray-500">Track missing persons across Kenya</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 border border-red-100">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-red-600">{stats.active}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 border border-yellow-100">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 border border-green-100">
          <p className="text-sm text-gray-500">Resolved</p>
          <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'active', 'pending', 'resolved'].map((status) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow overflow-hidden h-[500px]">
          <MapContainer
            center={KENYA_CENTER}
            zoom={KENYA_ZOOM}
            style={{ height: '100%', width: '100%' }}
            zoomControl={true}
            dragging={true}
            touchZoom={true}
            scrollWheelZoom={true}
            minZoom={5}
            maxZoom={10}
            maxBounds={L.latLngBounds(
              [KENYA_BOUNDS.south, KENYA_BOUNDS.west],
              [KENYA_BOUNDS.north, KENYA_BOUNDS.east]
            )}
            maxBoundsViscosity={1.0}
          >
            <KenyaBounds />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Rectangle
              bounds={[
                [KENYA_BOUNDS.south, KENYA_BOUNDS.west],
                [KENYA_BOUNDS.north, KENYA_BOUNDS.east]
              ]}
              pathOptions={{ color: '#10b981', weight: 2, opacity: 0.3, fillOpacity: 0 }}
            />

            {filteredPersons.map((person) => (
              <CircleMarker
                key={person.id}
                center={[person.lat, person.lng]}
                radius={12}
                fillColor={person.status === 'active' ? '#ef4444' : person.status === 'pending' ? '#f59e0b' : '#22c55e'}
                color="white"
                weight={3}
                opacity={1}
                fillOpacity={0.8}
                eventHandlers={{ click: () => setSelectedPerson(person) }}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{person.image}</span>
                      <div>
                        <p className="font-bold text-gray-800">{person.name}</p>
                        <p className="text-sm text-gray-500">{person.age} years</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="flex items-center gap-1"><MapPin className="h-4 w-4 text-gray-400" /><span>{person.location}</span></p>
                      <p className="flex items-center gap-1"><Clock className="h-4 w-4 text-gray-400" /><span>{person.lastSeen}</span></p>
                      <p><span className={`px-2 py-0.5 rounded-full text-xs text-white ${getStatusBadge(person.status)}`}>{person.status}</span></p>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {filteredPersons.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">No persons found</div>
          ) : (
            filteredPersons.map((person) => (
              <div
                key={person.id}
                className={`bg-white rounded-xl shadow p-4 border-l-4 ${
                  person.status === 'active' ? 'border-red-500' :
                  person.status === 'pending' ? 'border-yellow-500' :
                  'border-green-500'
                } hover:shadow-md transition cursor-pointer`}
                onClick={() => setSelectedPerson(person)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{person.image}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800">{person.name}</p>
                        <p className="text-sm text-gray-500">{person.age} years</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs text-white ${getStatusBadge(person.status)}`}>{person.status}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" />{person.location}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1"><Clock className="h-3 w-3" />{person.lastSeen}</p>
                    <p className="text-xs text-gray-400 mt-1">{person.description}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MapTracking;
