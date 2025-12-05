// src/entities/round/api/roundQueries.ts

import { 
  useQuery, 
  useMutation, 
  useQueryClient, 
  useInfiniteQuery,
  type QueryFunctionContext
} from '@tanstack/react-query';
import { roundApi } from './roundApi';
import { queryKeys } from '@/shared/api/queryKeys';
import type { RoundDetail, RoundStatus, TapResponse } from '../model/types';

// Infinite query для списка раундов с пагинацией
export const useRoundsInfiniteQuery = (status?: RoundStatus) => {
  return useInfiniteQuery({
    queryKey: queryKeys.rounds.list({ status }),
    queryFn: (context: QueryFunctionContext) => {
      const cursor = context.pageParam as string | undefined;
      return roundApi.getRounds({ 
        cursor, 
        limit: 20,
        status 
      });
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => 
      lastPage.pagination.hasMore ? lastPage.pagination.nextCursor : undefined,
  });
};

// Query для списка раундов (простая версия без пагинации)
export const useRoundsQuery = (status?: RoundStatus) => {
  return useQuery({
    queryKey: queryKeys.rounds.list({ status, limit: 20 }),
    queryFn: () => roundApi.getRounds({ limit: 20, status }),
    refetchInterval: 5000,
  });
};

// Query для детальной информации о раунде
export const useRoundQuery = (roundId: string | undefined) => {
  return useQuery({
    queryKey: queryKeys.rounds.detail(roundId!),
    queryFn: () => roundApi.getRound(roundId!),
    enabled: !!roundId,
    refetchInterval: 1000
  });
};

// Mutation для создания раунда
export const useCreateRoundMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: roundApi.createRound,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.rounds.lists() 
      });
    },
  });
};

export const useTapMutation = (roundId: string) => {
  const qc = useQueryClient();

  return useMutation<TapResponse, unknown, void>({
    mutationFn: () => roundApi.tap(roundId),

    onSuccess: (data) => {
      // Патчим только те поля, которые реально изменились
      qc.setQueryData<RoundDetail>(queryKeys.rounds.detail(roundId), (old) => {
        if (!old) return old;
        return {
          ...old,
          myStats: {
            ...old.myStats,
            taps: data.taps,
            score: data.score,
          },
        };
      });
    },

    onError: (err) => {
      console.error('Tap failed', err);
    },
  });
};