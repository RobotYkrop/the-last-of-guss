import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RoundStatus, RoundInfo, getRoundStatus, type Round } from '@/entities/round';
import { Separator } from '@/components/ui/separator';

interface RoundCardProps {
  round: Round;
  onClick: (roundId: string) => void;
}

export const RoundCard: React.FC<RoundCardProps> = ({ round, onClick }) => {
  const status = getRoundStatus(round);
  
  return (
    <Card 
      className="cursor-pointer hover:bg-[hsl(var(--color-accent))]/50 transition-colors"
      onClick={() => onClick(round.id)}
    >
      <CardHeader className="pb-3">
        <div className="font-mono text-sm text-[hsl(var(--color-primary))] flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-[hsl(var(--color-primary))] rounded-full"></span>
          Round ID: {round.id}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <RoundInfo startTime={round.startTime} endTime={round.endTime} />
        
        <Separator />
        
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Статус:</span>
          <RoundStatus status={status} />
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <span className="text-[hsl(var(--color-muted-foreground))]">Всего очков:</span>
          <span className="font-semibold">{round.totalScore}</span>
        </div>
      </CardContent>
    </Card>
  );
};