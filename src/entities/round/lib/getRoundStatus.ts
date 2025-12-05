import { ROUND_STATUS } from '@/shared/config';
import type { Round } from '../model/types';

export const getRoundStatus = (round: Round): 'active' | 'cooldown' | 'finished' => {
  const now = Date.now();
  const start = new Date(round.startTime).getTime();
  const end = new Date(round.endTime).getTime();
  
  if (now < start) {
    return ROUND_STATUS.COOLDOWN;
  } else if (now >= start && now < end) {
    return ROUND_STATUS.ACTIVE;
  } else {
    return ROUND_STATUS.FINISHED;
  }
};