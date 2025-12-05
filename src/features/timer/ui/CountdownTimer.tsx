import React from 'react';
import { formatTime } from '@/shared/lib';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  timeLeft: number;
  label: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ timeLeft, label }) => {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Clock className="h-4 w-4" />
      <span>{label} {formatTime(timeLeft)}</span>
    </div>
  );
};