import { apiClient } from './client';
import type { ProjectContent } from '@shared/schema';

export const projectsApi = {
  getAllProjects: async (): Promise<ProjectContent[]> => {
    const response = await apiClient.get('/content/projects');
    return response.data.data;
  },

  getProject: async (id: number): Promise<ProjectContent> => {
    const response = await apiClient.get(`/content/projects/${id}`);
    return response.data.data;
  },

  // Admin endpoints
  createProject: async (project: FormData | Omit<ProjectContent, 'id' | 'updated_at' | 'updated_by'>): Promise<ProjectContent> => {
    const headers = project instanceof FormData ? 
      { 'Content-Type': 'multipart/form-data' } : 
      { 'Content-Type': 'application/json' };
    
    const response = await apiClient.post('/admin/content/project', project, { headers });
    return response.data.data;
  },

  updateProject: async (id: number, project: FormData | Partial<ProjectContent>): Promise<ProjectContent> => {
    const headers = project instanceof FormData ? 
      { 'Content-Type': 'multipart/form-data' } : 
      { 'Content-Type': 'application/json' };
    
    const response = await apiClient.patch(`/admin/content/project/${id}`, project, { headers });
    return response.data.data;
  },

  deleteProject: async (id: number): Promise<void> => {
    await apiClient.delete(`/admin/content/project/${id}`);
  }
};

export const getProjects = async () => {
  return projectsApi.getAllProjects();
}; 