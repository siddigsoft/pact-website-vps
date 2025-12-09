import React from 'react';
import { motion } from 'framer-motion';

import sudanImg from '@/assets/locations/sudan.jpg';
import southSudanImg from '@/assets/locations/south-sudan.jpeg';
import ugandaImg from '@/assets/locations/uganda.webp';
import rwandaImg from '@/assets/locations/rwanda.jpg';
import qatarImg from '@/assets/locations/qatar.jpg';
import usaImg from '@/assets/locations/usa.jpg';

interface Location {
  name: string;
  description: string;
  imageUrl: string;
}

const locations: Location[] = [
  {
    name: 'Sudan',
    description: 'Our operations in Sudan focus on humanitarian aid and development projects.',
    imageUrl: sudanImg
  },
  {
    name: 'South Sudan',
    description: 'Supporting peacebuilding and community development initiatives.',
    imageUrl: southSudanImg
  },
  {
    name: 'Uganda',
    description: 'Working on sustainable development and humanitarian assistance programs.',
    imageUrl: ugandaImg
  },
  {
    name: 'Rwanda',
    description: 'Contributing to economic development and social welfare projects.',
    imageUrl: rwandaImg
  },
  {
    name: 'Qatar',
    description: 'Regional coordination and strategic partnerships.',
    imageUrl: qatarImg
  },
  {
    name: 'USA',
    description: 'Headquarters and international coordination center.',
    imageUrl: usaImg
  }
];

const LocationsPage: React.FC = () => {
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={location.imageUrl}
                    alt={location.name}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">{location.name}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{location.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsPage; 