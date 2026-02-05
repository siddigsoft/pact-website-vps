import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Navigation, MapPin, RotateCcw } from 'lucide-react';

// Component to handle map controls
const MapControls: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();

  const handleRecenter = () => {
    map.setView(center, zoom);
  };

  return (
    <button
      onClick={handleRecenter}
      className="recenter-button absolute top-2 right-2 sm:top-4 sm:right-4 z-[1000] bg-white hover:bg-gray-50 active:bg-gray-100 border border-gray-300 rounded-md p-2 sm:p-2.5 shadow-lg transition-colors touch-manipulation"
      title="Recenter map"
      aria-label="Recenter map to location"
    >
      <RotateCcw size={18} className="sm:w-5 sm:h-5 text-gray-700" />
    </button>
  );
};

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
  const [mapError, setMapError] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Default coordinates (fallback to East Africa region - good center for PACT's operations)
  const defaultLat = 1.2921; // Nairobi, Kenya coordinates as fallback (central to their operations)
  const defaultLng = 36.8219;

  const lat = latitude ? parseFloat(latitude) : defaultLat;
  const lng = longitude ? parseFloat(longitude) : defaultLng;

  // Only render map if we have valid coordinates
  const hasValidCoordinates = latitude && longitude &&
    !isNaN(parseFloat(latitude)) && !isNaN(parseFloat(longitude));

  // Validate coordinate ranges
  const isValidLat = lat >= -90 && lat <= 90;
  const isValidLng = lng >= -180 && lng <= 180;
  const hasValidRange = isValidLat && isValidLng;

  useEffect(() => {
    // Reset error state when coordinates change
    setMapError(null);
    setIsMapLoaded(false);
  }, [latitude, longitude]);

  if (!hasValidCoordinates || !hasValidRange) {
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
          {!hasValidRange && (
            <p className="text-xs mt-2 text-red-500">
              Invalid coordinates: {lat}, {lng}
            </p>
          )}
        </div>
      </div>
    );
  }

  // If caller didn't pass an explicit height, use Tailwind responsive heights
  const responsiveClass = !height ? 'h-48 sm:h-64 md:h-80 lg:h-96' : '';

  if (mapError) {
    return (
      <div
        className="bg-red-50 rounded-lg flex items-center justify-center text-red-600"
        style={{ height }}
      >
        <div className="text-center">
          <div className="text-4xl mb-2">⚠️</div>
          <p className="text-sm">Map failed to load</p>
          <p className="text-xs mt-1">{mapError}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={height ? { height } : undefined} className={`rounded-lg relative overflow-hidden ${responsiveClass}`}>
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-sm text-gray-600 mt-2">Loading map...</p>
          </div>
        </div>
      )}
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
        whenReady={() => setIsMapLoaded(true)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          errorTileUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
          eventHandlers={{
            tileerror: () => setMapError('Failed to load map tiles'),
          }}
        />
        <Marker position={[lat, lng]}>
          <Popup
            maxWidth={280}
            className="leaflet-popup-mobile"
          >
            <div className="text-center max-w-xs p-1">
              <h3 className="font-semibold text-sm sm:text-base leading-tight">{city}, {country}</h3>
              {address && <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2 leading-tight">{address}</p>}
              <button
                onClick={() => {
                  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                  window.open(googleMapsUrl, '_blank');
                }}
                className="mt-2 sm:mt-3 inline-flex items-center justify-center gap-1 sm:gap-2 px-3 py-2 bg-blue-600 text-white text-xs sm:text-sm rounded-md hover:bg-blue-700 active:bg-blue-800 transition-colors touch-manipulation min-h-[36px] w-full sm:w-auto"
              >
                <Navigation size={12} className="sm:w-3.5 sm:h-3.5" />
                Get Directions
              </button>
            </div>
          </Popup>
        </Marker>
        <MapControls center={[lat, lng]} zoom={zoom} />
        {/* Centered, fixed icon overlay (visible only when we have valid coordinates) */}
      </MapContainer>

      {hasValidCoordinates && isMapLoaded && (
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