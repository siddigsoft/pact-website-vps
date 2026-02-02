import React from 'react';
import { useRoute } from 'wouter';
import { Link } from 'wouter';
import { Loader2, ArrowLeft, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import * as locationsApi from '@/api/locations';
import type { Location } from '@shared/schema';
import LocationMap from '@/components/ui/LocationMap';

const LocationDetailPage: React.FC = () => {
  const [, params] = useRoute('/locations/:id');
  const id = params?.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ['location', id],
    queryFn: async () => {
      if (!id) return null;
      const res = await locationsApi.getLocation(Number(id));
      // API returns the location object directly (or a wrapper) — normalize to the object
      // If the endpoint returns { data: {...} } then use that, otherwise return res
      return (res && (res.data || res)) || null;
    },
    enabled: !!id,
  });

  const location: Location | null = data || null;

  if (isLoading) {
    return (
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto" />
            <p className="mt-4">Loading location details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !location) {
    return (
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center py-12">
            <div className="bg-red-50 p-6 rounded-lg max-w-xl mx-auto">
              <h2 className="text-2xl font-bold text-red-700 mb-4">Error</h2>
              <p className="text-red-600 mb-6">{(error as any)?.message || 'Location not found'}</p>
              <Link href="/locations" className="text-primary hover:underline">
                Return to Locations
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = location.image?.toString() || '';

  // Note: metadata (timestamps, updated_by) removed from UI for a cleaner public view.

  // Raw JSON view and copy were removed for a cleaner, reader-friendly UI.

  return (
    <div className="pt-20">
      {/* Hero */}
      <div
        className="bg-cover bg-center h-72 relative"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 md:px-8 h-full flex items-center relative z-10">
          <div>
            <Link href="/locations" className="inline-flex items-center text-white hover:text-primary mb-4">
              <ArrowLeft size={16} className="mr-2" />
              Back to Locations
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">{location.city}, {location.country}</h1>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          {imageUrl && (
            <div className="mb-6">
              <img src={imageUrl} alt={`${location.city}, ${location.country}`} className="w-full h-72 object-cover rounded" />
            </div>
          )}

          <div className="grid grid-cols-1 gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{location.city}, {location.country}</h2>

              <div className="mb-4 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Address</h3>
                  <p className="text-gray-800 mt-1 whitespace-pre-wrap">{location.address || 'Address not provided'}</p>
                </div>
              </div>

              {/* Location Map */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-600 mb-3">Location Map</h3>
                <LocationMap
                  latitude={location.latitude}
                  longitude={location.longitude}
                  city={location.city}
                  country={location.country}
                  address={location.address}
                  height="300px"
                />
              </div>

              {/* Dynamically render any extra fields returned from the API (phone, email, etc.) */}
              {(() => {
                const known = new Set(['id','city','country','image','address','latitude','longitude','created_at','updated_at','updated_by']);
                const extras = Object.entries(location as any).filter(([k, v]) => !known.has(k) && v !== null && v !== undefined && String(v).trim() !== '');
                if (extras.length === 0) return null;

                return (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-600">Contact & Info</h3>
                    <div className="mt-2 space-y-2 text-gray-800 text-sm">
                      {extras.map(([key, value]) => {
                        const label = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                        const val = String(value);
                        // phone-like detection
                        const isPhone = /^(?:\+|\d)[0-9\-()\s]{5,}$/.test(val);
                        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

                        return (
                          <div key={key} className="flex items-center gap-3">
                            <div className="text-xs text-gray-500 w-28">{label}</div>
                            <div className="flex-1">
                              {isPhone ? (
                                <a href={`tel:${val}`} className="text-primary hover:underline">{val}</a>
                              ) : isEmail ? (
                                <a href={`mailto:${val}`} className="text-primary hover:underline">{val}</a>
                              ) : (
                                <span className="whitespace-pre-wrap">{val}</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Raw JSON view removed to keep the layout clean. */}
            </div>

            {/* Metadata intentionally omitted from public view */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetailPage;
