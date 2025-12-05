export interface Round {
  id: string;
  startTime: string;
  endTime: string;
  totalScore: number;
  createdAt: string;
}

export interface UserStats {
  taps: number;
  score: number;
  user: {
    username: string;
  };
}

export interface MyStats {
  taps: number;
  score: number;
}

export interface RoundDetail {
  round: Round;
  topStats: UserStats[];
  myStats: MyStats;
}

export interface RoundsPagination {
  limit: number;
  nextCursor: string | null;
  hasMore: boolean;
}

export interface RoundsResponse {
  data: Round[];
  pagination: RoundsPagination;
}

export interface TapResponse {
  taps: number;
  score: number;
}

export type RoundStatus = 'active' | 'cooldown' | 'finished';