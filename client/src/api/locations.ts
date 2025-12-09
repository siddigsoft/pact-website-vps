import { apiClient } from './client';
import type { LocationContent } from '../../../shared/schema';

export const getLocations = async () => {
  const response = await apiClient.get('/locations');
  return response.data;
};

export const getLocation = async (id: number) => {
  const response = await apiClient.get(`/locations/${id}`);
  return response.data;
};

export const createLocation = async (data: Omit<LocationContent, 'id' | 'created_at' | 'updated_at'> & { image?: File | string | null }) => {
  const formData = new FormData();
  
  // Handle image file
  if (data.image && data.image instanceof File) {
    formData.append('image', data.image);
  }
  
  // Add other fields
  Object.entries(data).forEach(([key, value]) => {
    if (value && (key !== 'image' || !(value instanceof File))) {
      formData.append(key, value as string);
    }
  });

  const response = await apiClient.post('/locations', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const updateLocation = async (id: number, data: Partial<LocationContent> & { image?: File | string | null }) => {
  const formData = new FormData();
  
  // Handle image file
  if (data.image && data.image instanceof File) {
    formData.append('image', data.image);
  }
  
  // Add other fields
  Object.entries(data).forEach(([key, value]) => {
    if (value && (key !== 'image' || !(value instanceof File))) {
      formData.append(key, value as string);
    }
  });

  const response = await apiClient.put(`/locations/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const deleteLocation = async (id: number) => {
  const response = await apiClient.delete(`/locations/${id}`);
  return response.data;
}; 