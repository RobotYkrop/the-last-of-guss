import React from 'react';
import { CalendarClock } from 'lucide-react';
import { formatDate } from '@/shared/lib';

interface RoundInfoProps {
  startTime: string;
  endTime: string;
}

export const RoundInfo: React.FC<RoundInfoProps> = ({ startTime, endTime }) => {
  return (
    <div className="space-y-1 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <CalendarClock className="h-4 w-4" />
        <span>Start: {formatDate(startTime)}</span>
      </div>
      <div className="flex items-center gap-2">
        <CalendarClock className="h-4 w-4" />
        <span>End: {formatDate(endTime)}</span>
      </div>
    </div>
  );
};