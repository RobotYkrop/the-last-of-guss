// Фабрика ключей для React Query
export const queryKeys = {
  // User queries
  user: {
    all: ['user'] as const,
    me: () => [...queryKeys.user.all, 'me'] as const,
  },
  
  // Round queries
  rounds: {
    all: ['rounds'] as const,
    lists: () => [...queryKeys.rounds.all, 'list'] as const,
    list: (filters?: { status?: string; cursor?: string; limit?: number }) => 
      [...queryKeys.rounds.lists(), filters] as const,
    details: () => [...queryKeys.rounds.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.rounds.details(), id] as const,
  },
} as const;