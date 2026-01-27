import { fetchWithAuth } from '@/config/api.config';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  usersByRole: Record<string, number>;
}

export const userService = {
  async getUserStats(): Promise<UserStats> {
    try {
      return await fetchWithAuth<UserStats>('/user/stats');
    } catch (error) {
      console.error('Error fetching user stats:', error);
      throw error;
    }
  },
};
