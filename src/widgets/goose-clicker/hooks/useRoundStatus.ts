import { useMemo } from 'react';
import { ROUND_STATUS } from '@/shared/config';
import { useNow } from './useNow';

export const useRoundStatus = (startTime: string, endTime: string) => {
  const now = useNow(1000);

  const status = useMemo(() => {
    const start = new Date(startTime).getTime();
    const finish = new Date(endTime).getTime();

    if (now < start) return ROUND_STATUS.COOLDOWN;
    if (now < finish) return ROUND_STATUS.ACTIVE;
    return ROUND_STATUS.FINISHED;
  }, [now, startTime, endTime]);

  return status;
};