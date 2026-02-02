import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Navigation, MapPin } from 'lucide-react';

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
  height,
  zoom = 10 // Better zoom level for regional view
}) => {
  // Default coordinates (fallback to East Africa region - good center for PACT's operations)
  const defaultLat = 1.2921; // Nairobi, Kenya coordinates as fallback (central to their operations)
  const defaultLng = 36.8219;

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

  // If caller didn't pass an explicit height, use Tailwind responsive heights
  const responsiveClass = !height ? 'h-48 sm:h-64 md:h-80 lg:h-96' : '';

  return (
    <div style={height ? { height } : undefined} className={`rounded-lg relative overflow-hidden ${responsiveClass}`}>
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
              <button
                onClick={() => {
                  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                  window.open(googleMapsUrl, '_blank');
                }}
                className="mt-3 inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
              >
                <Navigation size={14} />
                Get Directions
              </button>
            </div>
          </Popup>
        </Marker>
        {/* Centered, fixed icon overlay (visible only when we have valid coordinates) */}
      </MapContainer>

      {hasValidCoordinates && (
        <div className="absolute left-1/2 top-1/2 pointer-events-none" style={{ transform: 'translate(-50%, -100%)' }} aria-hidden="true">
          {/* pin icon (visually centered at the map center) */}
          <div className="flex flex-col items-center">
            <MapPin size={36} className="text-blue-600 drop-shadow-lg" />
            <span className="block w-2 h-2 bg-blue-600 rounded-full mt-1 animate-pulse opacity-90"></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationMap;