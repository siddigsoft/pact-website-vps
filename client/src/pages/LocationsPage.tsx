import React from 'react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import * as locationsApi from '@/api/locations';

interface Location {
  id: number;
  city: string;
  country: string;
  image: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
  updated_by: number | null;
}

const LocationsPage: React.FC = () => {
  // Fetch locations from API
  const { data: locationsData, isLoading, error } = useQuery({
    queryKey: ['locations'],
    queryFn: locationsApi.getLocations
  });

  const locations = locationsData?.data || [];
  
  // Ensure AOS (animate-on-scroll) is initialized/refreshed when this page mounts
  // or when locations data changes. This fixes cases where navigating back
  // shows elements hidden until a full page refresh because AOS wasn't re-initialized.
  useEffect(() => {
    // @ts-ignore - AOS is loaded globally in index.html / App
    const AOS = (window as any).AOS;
    if (AOS) {
      // prefer refreshHard if available (newer AOS), fallback to refresh
      if (typeof AOS.refreshHard === 'function') {
        AOS.refreshHard();
      } else if (typeof AOS.refresh === 'function') {
        AOS.refresh();
      } else if (typeof AOS.init === 'function') {
        AOS.init({ duration: 800, once: true, offset: 100 });
      }
    }
  }, [locationsData]);
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary text-white py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl" data-aos="fade-up">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">Our Locations</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8">
              PACT Consultancy operates in multiple countries, bringing expertise and commitment to communities worldwide. Discover where we make an impact.
            </p>
            <a
              href="/contact"
              className="bg-white text-primary hover:bg-white/90 py-2.5 sm:py-3 px-6 sm:px-8 rounded-md font-medium inline-block transition-all text-sm sm:text-base"
            >
              Contact Us About Our Work
            </a>
          </div>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Our Global Presence</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              We operate across multiple countries, bringing our expertise and commitment to communities worldwide.
            </p>
          </div>

          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading locations...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600">Failed to load locations. Please try again later.</p>
            </div>
          )}

          {!isLoading && !error && locations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No locations available at the moment.</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {locations.map((location: Location, index: number) => (
              <Link key={location.id} href={`/locations/${location.id}`} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={location.image || '/placeholder-location.jpg'}
                      alt={`${location.city}, ${location.country}`}
                      className="w-full h-40 sm:h-48 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('placeholder')) {
                          target.src = '/placeholder-location.jpg';
                        }
                      }}
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">{location.city}, {location.country}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{location.address || 'Location details available upon request'}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsPage; 