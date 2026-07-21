import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, CircleMarker, Popup, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Navigation, Search, Filter, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const locationIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, zoom || 13);
  }, [center, map, zoom]);
  return null;
};

// Dummy case data (replace with real API)
const caseLocations = [
  { id: 1, name: 'Kibera, Nairobi', lat: -1.315, lng: 36.783, status: 'active', description: 'Missing child' },
  { id: 2, name: 'Garissa Town', lat: -0.462, lng: 39.646, status: 'active', description: 'Elderly woman' },
  { id: 3, name: 'Mombasa CBD', lat: -4.043, lng: 39.668, status: 'pending', description: 'Teenager' },
  { id: 4, name: 'Kisumu', lat: -0.102, lng: 34.762, status: 'resolved', description: 'Found safe' },
  { id: 5, name: 'Nakuru', lat: -0.303, lng: 36.080, status: 'active', description: 'Missing adult' },
];

const MapTracking = () => {
  const [position, setPosition] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [trackingError, setTrackingError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const watchIdRef = useRef(null);

  const startTracking = () => {
    if (!navigator.geolocation) {
      setTrackingError('Geolocation not supported.');
      return;
    }
    setTrackingError(null);
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setTracking(true);
      },
      (err) => {
        setTrackingError(err.message);
        setTracking(false);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );
  };

  const stopTracking = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setTracking(false);
    setPosition(null);
  };

  useEffect(() => {
    return () => {
      if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, []);

  const filteredCases = caseLocations.filter(loc => {
    const matchStatus = filterStatus === 'all' || loc.status === filterStatus;
    const matchSearch = loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        loc.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 bg-gradient-to-br from-slate-50/80 to-gray-100/80 min-h-screen">
      <PageHeader 
        icon={MapPin}
        title="Map Tracking"
        subtitle="View all active and pending cases on the map"
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            {trackingError && (
              <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">{trackingError}</span>
            )}
            <button
              onClick={tracking ? stopTracking : startTracking}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition shadow-sm ${
                tracking ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-emerald-500 text-white hover:bg-emerald-600'
              }`}
            >
              <Navigation size={16} />
              {tracking ? 'Stop Tracking' : 'Live Tracking'}
            </button>
            {tracking && position && (
              <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full animate-pulse flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                Live
              </span>
            )}
          </div>
        }
      />

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search cases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
          {(searchTerm || filterStatus !== 'all') && (
            <button
              onClick={() => { setSearchTerm(''); setFilterStatus('all'); }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
        <div className="rounded-xl overflow-hidden border border-gray-200" style={{ height: '500px' }}>
          <MapContainer center={[0.0236, 37.9062]} zoom={6} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredCases.map(loc => {
              const color = loc.status === 'active' ? 'red' : loc.status === 'pending' ? 'orange' : 'green';
              return (
                <CircleMarker
                  key={loc.id}
                  center={[loc.lat, loc.lng]}
                  radius={8}
                  fillColor={color}
                  color={color}
                  weight={2}
                  opacity={1}
                  fillOpacity={0.7}
                >
                  <Popup>
                    <strong>{loc.name}</strong><br />
                    <span className="text-sm">{loc.description}</span><br />
                    Status: <span className="capitalize font-medium">{loc.status}</span>
                  </Popup>
                </CircleMarker>
              );
            })}
            {position && (
              <Marker position={[position.lat, position.lng]} icon={locationIcon}>
                <Popup>You are here</Popup>
              </Marker>
            )}
            {tracking && position && (
              <MapController center={[position.lat, position.lng]} zoom={13} />
            )}
          </MapContainer>
        </div>
        {position && (
          <div className="mt-3 text-xs text-gray-500 border-t border-gray-100 pt-3 flex justify-between">
            <span>📍 {position.lat.toFixed(6)}, {position.lng.toFixed(6)}</span>
            <span className="text-emerald-600">{tracking ? 'Live tracking' : 'Position fixed'}</span>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs bg-white rounded-2xl shadow-sm p-3 border border-gray-100">
        <span className="font-medium text-gray-700">Legend:</span>
        <div className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500 rounded-full" /> Active</div>
        <div className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-400 rounded-full" /> Pending</div>
        <div className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded-full" /> Resolved</div>
        <div className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded-full" /> Your location</div>
      </div>
    </div>
  );
};

export default MapTracking;