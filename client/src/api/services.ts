import { apiClient } from './client';
import type { ServiceContent } from '@shared/schema';

export const servicesApi = {
  getAllServices: async (): Promise<ServiceContent[]> => {
    const response = await apiClient.get('/admin/content/service');
    return response.data.data;
  },

  getService: async (id: number): Promise<ServiceContent> => {
    const response = await apiClient.get(`/admin/content/service/${id}`);
    return response.data.data;
  },

  createService: async (service: Omit<ServiceContent, 'id' | 'updated_at' | 'updated_by'>): Promise<ServiceContent> => {
    const response = await apiClient.post('/admin/content/service', service);
    return response.data.data;
  },

  updateService: async (id: number, service: Partial<ServiceContent>): Promise<ServiceContent> => {
    const response = await apiClient.patch(`/admin/content/service/${id}`, service);
    return response.data.data;
  },

  deleteService: async (id: number): Promise<void> => {
    await apiClient.delete(`/admin/content/service/${id}`);
  }
};

export const getAllServices = async () => {
  const response = await apiClient.get('/content/services');
  return response.data;
};

export const getServices = async () => {
  return getAllServices();
}; 