import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LocationMapProps {
  latitude?: string | null;
  longitude?: string | null;
  city: string;
  country: string;
  address?: string | null;
  height?: string;
  zoom?: number;
}

const LocationMap: React.FC<LocationMapProps> = ({
  latitude,
  longitude,
  city,
  country,
  address,
  height = '400px',
  zoom = 13
}) => {
  // Default coordinates (fallback to a central location if no coordinates provided)
  const defaultLat = 51.505; // London coordinates as fallback
  const defaultLng = -0.09;

  const lat = latitude ? parseFloat(latitude) : defaultLat;
  const lng = longitude ? parseFloat(longitude) : defaultLng;

  // Only render map if we have valid coordinates
  const hasValidCoordinates = latitude && longitude &&
    !isNaN(parseFloat(latitude)) && !isNaN(parseFloat(longitude));

  if (!hasValidCoordinates) {
    return (
      <div
        className="bg-gray-100 rounded-lg flex items-center justify-center text-gray-500"
        style={{ height }}
      >
        <div className="text-center">
          <div className="text-4xl mb-2">📍</div>
          <p className="text-sm">Map not available</p>
          <p className="text-xs mt-1">{city}, {country}</p>
          {address && <p className="text-xs mt-1 text-gray-400">{address}</p>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ height }} className="rounded-lg overflow-hidden">
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>
            <div className="text-center">
              <h3 className="font-semibold">{city}, {country}</h3>
              {address && <p className="text-sm text-gray-600 mt-1">{address}</p>}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationMap;