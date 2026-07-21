import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const MapWidget = ({ locations }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800">Live Case Map</h3>
        <span className="text-xs text-gray-400">Active cases</span>
      </div>
      <div className="rounded-xl overflow-hidden border border-gray-200" style={{ height: '280px' }}>
        <MapContainer center={[0.0236, 37.9062]} zoom={6} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {locations.map((loc) => (
            <CircleMarker key={loc.id} center={[loc.lat, loc.lng]} radius={6} fillColor={loc.status === 'active' ? 'red' : 'orange'} color="white" weight={1} opacity={1} fillOpacity={0.8}>
              <Popup>{loc.name}</Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};
export default MapWidget;
