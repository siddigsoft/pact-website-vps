// Geocoding utility for converting addresses to coordinates
// Uses Nominatim (OpenStreetMap) geocoding service - free and no API key required

export interface GeocodeResult {
  latitude: string;
  longitude: string;
  displayName: string;
}

export interface GeocodeError {
  error: string;
}

/**
 * Geocode an address using Nominatim (OpenStreetMap) service
 * @param address - The address to geocode
 * @param city - The city (optional, for better accuracy)
 * @param country - The country (optional, for better accuracy)
 * @returns Promise with geocode result or error
 */
export async function geocodeAddress(
  address: string,
  city?: string,
  country?: string
): Promise<GeocodeResult | GeocodeError> {
  try {
    // Build the query string
    let query = address;
    if (city) query += `, ${city}`;
    if (country) query += `, ${country}`;

    // Encode the query for URL
    const encodedQuery = encodeURIComponent(query);

    // Nominatim API endpoint
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedQuery}&limit=1&addressdetails=1`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'PACT-Consultancy-Website/1.0' // Required by Nominatim
      }
    });

    if (!response.ok) {
      return { error: `Geocoding service error: ${response.status}` };
    }

    const data = await response.json();

    if (data && data.length > 0) {
      const result = data[0];
      return {
        latitude: result.lat,
        longitude: result.lon,
        displayName: result.display_name
      };
    } else {
      return { error: 'Address not found' };
    }
  } catch (error) {
    console.error('Geocoding error:', error);
    return { error: 'Failed to geocode address' };
  }
}

/**
 * Reverse geocode coordinates to get address information
 * @param latitude - Latitude coordinate
 * @param longitude - Longitude coordinate
 * @returns Promise with address information or error
 */
export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<{ displayName: string } | GeocodeError> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'PACT-Consultancy-Website/1.0'
      }
    });

    if (!response.ok) {
      return { error: `Reverse geocoding service error: ${response.status}` };
    }

    const data = await response.json();

    if (data && data.display_name) {
      return {
        displayName: data.display_name
      };
    } else {
      return { error: 'Location not found' };
    }
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return { error: 'Failed to reverse geocode coordinates' };
  }
}