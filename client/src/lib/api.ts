// Service Content API

/**
 * Fetches all services from the API
 * @returns Promise with service data
 */
export const fetchServices = async () => {
  try {
    const response = await fetch('/api/content/services');
    
    if (!response.ok) {
      throw new Error(`Error fetching services: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Raw API response:', data);

    // Validate response format
    if (data.success && Array.isArray(data.data)) {
      // Validate each service object
      data.data = data.data.map((service: any) => ({
        id: service.id,
        title: service.title || '',
        description: service.description || '',
        details: Array.isArray(service.details) ? service.details : [],
        icon: service.icon,
        image: service.image || ''
      }));
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
}; 