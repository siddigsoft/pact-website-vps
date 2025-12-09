import { apiClient } from './client';
import { TeamMember } from '@/types'; // Assuming TeamMember type is in types.ts

// Get all team members
export const getTeamMembers = async () => {
  const response = await apiClient.get<{ success: boolean; data: TeamMember[] }>(
    '/team'
  );
  return response.data;
}; 