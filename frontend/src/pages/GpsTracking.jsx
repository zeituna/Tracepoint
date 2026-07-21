import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Satellite,
  MapPin,
  Navigation,
  Users,
  Target,
  Clock,
  AlertCircle,
} from 'lucide-react';
import PageHeader from '../components/PageHeader';

// Leaflet imports
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// ─── Custom location icon ──────────────────────────────────
const locationIcon = new L.Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// ─── Map controller ──────────────────────────────────────
const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, zoom || 13);
  }, [center, map, zoom]);
  return null;
};

// ─── Dummy data ────────────────────────────────────────────
const caseLocations = [
  {
    id: 1,
    name: 'Kibera, Nairobi',
    lat: -1.315,
    lng: 36.783,
    status: 'active',
    description: 'Missing child',
  },
  {
    id: 2,
    name: 'Garissa Town',
    lat: -0.462,
    lng: 39.646,
    status: 'active',
    description: 'Elderly woman',
  },
  {
    id: 3,
    name: 'Mombasa CBD',
    lat: -4.043,
    lng: 39.668,
    status: 'pending',
    description: 'Teenager',
  },
  {
    id: 4,
    name: 'Kisumu',
    lat: -0.102,
    lng: 34.762,
    status: 'resolved',
    description: 'Found safe',
  },
  {
    id: 5,
    name: 'Nakuru',
    lat: -0.303,
    lng: 36.080,
    status: 'active',
    description: 'Missing adult',
  },
];

const dummyAgents = [
  { id: 1, name: 'Ahmed Hassan', lat: -1.283, lng: 36.817, status: 'online' },
  { id: 2, name: 'Mary Wanjiku', lat: -1.292, lng: 36.780, status: 'online' },
  { id: 3, name: 'John Ochieng', lat: -1.302, lng: 36.795, status: 'offline' },
];

const GpsTracking = () => {
  const [position, setPosition] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [trackingError, setTrackingError] = useState(null);
  const [mapError, setMapError] = useState(false);
  const watchIdRef = useRef(null);

  const startTracking = () => {
    if (!navigator.geolocation) {
      setTrackingError('Geolocation is not supported by your browser.');
      return;
    }
    setTrackingError(null);
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lng: longitude });
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
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  // ─── Check if Leaflet loaded ────────────────────────────
  useEffect(() => {
    try {
      // Ensure Leaflet is available
      if (!L) {
        setMapError(true);
      }
    } catch (e) {
      setMapError(true);
    }
  }, []);

  const activeCases = caseLocations.filter((c) => c.status === 'active').length;
  const onlineAgents = dummyAgents.filter((a) => a.status === 'online').length;
  const resolvedCases = caseLocations.filter((c) => c.status === 'resolved')
    .length;

  return (
    <div className="p-6 md:p-8 space-y-6 bg-gradient-to-br from-slate-50/80 to-gray-100/80 min-h-screen">
      <PageHeader
        icon={Satellite}
        title="GPS Tracking"
        subtitle="Live tracking of field agents and case locations"
        actions={
          <div className="flex items-center gap-2">
            {trackingError && (
              <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">
                {trackingError}
              </span>
            )}
            <button
              onClick={tracking ? stopTracking : startTracking}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm ${
                tracking
                  ? 'bg-red-500 text-white hover:bg-red-600 hover:scale-[1.02]'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600 hover:scale-[1.02]'
              }`}
            >
              <Navigation size={16} />
              {tracking ? 'Stop Tracking' : 'Live Tracking'}
            </button>
            {tracking && position && (
              <span className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full animate-pulse flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                Live
              </span>
            )}
          </div>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider">
            <MapPin size={14} className="text-emerald-500" />
            Active Cases
          </div>
          <p className="text-2xl font-bold text-gray-800">{activeCases}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider">
            <Users size={14} className="text-blue-500" />
            Agents Online
          </div>
          <p className="text-2xl font-bold text-gray-800">{onlineAgents}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider">
            <Target size={14} className="text-purple-500" />
            Resolved Cases
          </div>
          <p className="text-2xl font-bold text-gray-800">{resolvedCases}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider">
            <Clock size={14} className="text-orange-500" />
            Last Update
          </div>
          <p className="text-sm font-medium text-gray-600">
            {position ? new Date().toLocaleTimeString() : '—'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
        <div
          className="rounded-xl overflow-hidden border border-gray-200"
          style={{ minHeight: '480px', height: '100%' }}
        >
          {mapError ? (
            <div className="h-full flex items-center justify-center bg-gray-50 text-gray-500 flex-col gap-2 p-8">
              <AlertCircle size={48} className="text-orange-400" />
              <p className="text-center">
                Map could not load. Please check your internet connection and refresh the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
              >
                Reload
              </button>
            </div>
          ) : (
            <MapContainer
              center={[0.0236, 37.9062]}
              zoom={6}
              style={{ height: '480px', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {caseLocations.map((loc) => {
                const color =
                  loc.status === 'active'
                    ? 'red'
                    : loc.status === 'pending'
                    ? 'orange'
                    : 'green';
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
                      <strong>{loc.name}</strong>
                      <br />
                      <span className="text-sm">{loc.description}</span>
                      <br />
                      Status:{' '}
                      <span className="capitalize font-medium">{loc.status}</span>
                    </Popup>
                  </CircleMarker>
                );
              })}
              {dummyAgents.map((agent) => (
                <Marker
                  key={agent.id}
                  position={[agent.lat, agent.lng]}
                  icon={locationIcon}
                >
                  <Popup>
                    <strong>{agent.name}</strong>
                    <br />
                    Status:{' '}
                    <span
                      className={`font-medium ${
                        agent.status === 'online'
                          ? 'text-emerald-600'
                          : 'text-gray-400'
                      }`}
                    >
                      {agent.status}
                    </span>
                  </Popup>
                </Marker>
              ))}
              {position && (
                <Marker position={[position.lat, position.lng]} icon={locationIcon}>
                  <Popup>You are here</Popup>
                </Marker>
              )}
              {tracking && position && (
                <MapController center={[position.lat, position.lng]} zoom={15} />
              )}
            </MapContainer>
          )}
        </div>
        {position && (
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
            <span className="font-mono">
              📍 {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
            </span>
            <span className="text-emerald-600">
              {tracking ? 'Live tracking' : 'Position fixed'}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
        <span className="font-medium text-gray-700">Legend:</span>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-red-500 rounded-full" /> Active case
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-orange-400 rounded-full" /> Pending case
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-green-500 rounded-full" /> Resolved case
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-blue-500 rounded-full" /> Agent
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />{' '}
          Your location
        </div>
      </div>
    </div>
  );
};

export default GpsTracking;