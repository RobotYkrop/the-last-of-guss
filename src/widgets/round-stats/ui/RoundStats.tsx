import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { UserStats } from '@/entities/round';
import { Trophy, Target } from 'lucide-react';

interface RoundStatsProps {
  stats: UserStats[];
}

export const RoundStats: React.FC<RoundStatsProps> = ({ stats }) => {
  const topThree = stats.slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-[hsl(var(--color-primary))]" />
          Топ игроков
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {topThree.map((stat, index) => (
            <div 
              key={stat.user.username}
              className="flex items-center justify-between p-3 rounded-lg bg-[hsl(var(--color-accent))]/50"
            >
              <div className="flex items-center gap-3">
                <Badge 
                  variant={index === 0 ? 'default' : 'outline'}
                  className="w-8 h-8 flex items-center justify-center rounded-full"
                >
                  {index + 1}
                </Badge>
                <div>
                  <div className="font-medium">{stat.user.username}</div>
                  <div className="text-xs text-[hsl(var(--color-muted-foreground))]">
                    {stat.taps} тапов
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
                <span className="font-bold">{stat.score}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};