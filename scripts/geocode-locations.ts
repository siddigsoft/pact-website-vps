#!/usr/bin/env tsx

// Script to geocode existing locations and update their coordinates
// Run with: npx tsx scripts/geocode-locations.ts

import { geocodeAddress } from '../client/src/lib/geocoding.js';
import { supabase } from '../server/db.js';

async function geocodeLocations() {
  try {
    console.log('Starting geocoding process...');

    // Get all locations that don't have coordinates yet
    const { data: locations, error } = await supabase
      .from('locations')
      .select('id, city, country, address')
      .or('latitude.is.null,longitude.is.null')
      .not('address', 'is', null);

    if (error) {
      console.error('Database error:', error);
      return;
    }

    console.log(`Found ${locations?.length || 0} locations to geocode`);

    if (!locations) return;

    for (const location of locations) {
      try {
        console.log(`Geocoding: ${location.city}, ${location.country}`);

        const result = await geocodeAddress(
          location.address,
          location.city,
          location.country
        );

        if ('error' in result) {
          console.log(`  ❌ Failed: ${result.error}`);
          continue;
        }

        // Update the location with coordinates
        const { error: updateError } = await supabase
          .from('locations')
          .update({
            latitude: result.latitude,
            longitude: result.longitude
          })
          .eq('id', location.id);

        if (updateError) {
          console.log(`  ❌ Update failed: ${updateError.message}`);
          continue;
        }

        console.log(`  ✅ Updated: ${result.latitude}, ${result.longitude}`);

        // Add a small delay to be respectful to the geocoding service
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        console.error(`  ❌ Error geocoding location ${location.id}:`, error);
      }
    }

    console.log('Geocoding process completed!');

  } catch (error) {
    console.error('Script error:', error);
  }
}

// Run the script
geocodeLocations().catch(console.error);