import { apiClient } from '@/shared/api';
import type { Round, RoundDetail, RoundsResponse, TapResponse, RoundStatus } from '../model/types';

export const roundApi = {
  getRounds: async (params?: {
    cursor?: string;
    limit?: number;
    status?: RoundStatus;
  }): Promise<RoundsResponse> => {
    const queryParams = new URLSearchParams();
    if (params?.cursor) queryParams.append('cursor', params.cursor);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    
    const query = queryParams.toString();
    return apiClient.get<RoundsResponse>(`/rounds${query ? `?${query}` : ''}`);
  },
  
  getRound: async (roundId: string): Promise<RoundDetail> => {
    return apiClient.get<RoundDetail>(`/rounds/${roundId}`);
  },
  
  createRound: async (): Promise<Round> => {
    return apiClient.post<Round>('/rounds');
  },
  
  // Тап по гусю
  tap: async (roundId: string): Promise<TapResponse> => {
    return apiClient.post<TapResponse>(`/rounds/${roundId}/tap`);
  },
};