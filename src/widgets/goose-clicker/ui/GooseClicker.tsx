import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CountdownTimer, useCountdown } from '@/features/timer';
import { useTapMutation, type RoundDetail } from '@/entities/round';
import { useQueryClient } from '@tanstack/react-query';
import { Zap, Hand, Award } from 'lucide-react';
import { ROUND_STATUS } from '@/shared/config';
import { useRoundStatus } from '../hooks/useRoundStatus';
import { queryKeys } from '@/shared/api/queryKeys';

interface GooseClickerProps {
  roundDetail: RoundDetail;
}

export const GooseClicker: React.FC<GooseClickerProps> = ({ roundDetail }) => {
  const { round, topStats, myStats } = roundDetail;

  const status = useRoundStatus(round.startTime, round.endTime);

  const targetTime =
    status === ROUND_STATUS.COOLDOWN
      ? round.startTime
      : status === ROUND_STATUS.ACTIVE
      ? round.endTime
      : null;

  const timeLeft = useCountdown(targetTime, status !== ROUND_STATUS.FINISHED);

  const queryClient = useQueryClient();
  const tapMutation = useTapMutation(round.id);

  useEffect(() => {
    if (timeLeft === 0 && status === ROUND_STATUS.FINISHED) {
      queryClient.invalidateQueries({ queryKey: queryKeys.rounds.detail(round.id) });
    }
  }, [timeLeft, status, round.id, queryClient]);

  const handleTap = () => {
    if (status !== ROUND_STATUS.ACTIVE) return;
    tapMutation.mutate();
  };

  const avgMultiplier =
    myStats.taps > 0 ? (myStats.score / myStats.taps).toFixed(2) : '0';

  const displayTaps = myStats.taps;

  return (
    <CardContent className="p-8 flex flex-col items-center space-y-6">
      {/* ---------- ГУСЬ ---------- */}
      <div className="relative">
        <div
          className={`
            text-8xl select-none transition-all duration-100
            ${status === ROUND_STATUS.ACTIVE
              ? 'cursor-pointer hover:scale-110 active:scale-95'
              : 'opacity-50 cursor-not-allowed'}
          `}
          onClick={handleTap}
          style={{ fontSize: '120px' }}
        >
          🦆
        </div>
      </div>

      {/* ---------- АКТИВНЫЙ ---------- */}
      {status === ROUND_STATUS.ACTIVE && (
        <div className="text-center space-y-3 w-full">
          <Badge variant="default" className="text-base px-4 py-2">
            Раунд активен!
          </Badge>

          <CountdownTimer timeLeft={timeLeft} label="До конца осталось:" />

          <Card className="bg-[hsl(var(--color-primary))]/10 border-[hsl(var(--color-primary))]/20">
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Очки */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-[hsl(var(--color-primary))]" />
                    <span className="text-sm text-[hsl(var(--color-muted-foreground))]">
                      Очки
                    </span>
                  </div>
                  <span className="text-2xl font-bold">{myStats.score}</span>
                </div>

                <Separator />

                {/* Тапы */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Hand className="h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
                    <span className="text-sm text-[hsl(var(--color-muted-foreground))]">
                      Тапов
                    </span>
                  </div>
                  <span className="text-lg font-semibold">{displayTaps}</span>
                </div>

                {/* Средний множитель */}
                {myStats.taps > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
                      <span className="text-xs text-[hsl(var(--color-muted-foreground))]">
                        Средний множитель
                      </span>
                    </div>
                    <span className="text-sm font-semibold">×{avgMultiplier}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <p className="text-xs text-[hsl(var(--color-muted-foreground))] italic">
            💡 За каждый тап может начисляться больше одного очка
          </p>
        </div>
      )}

      {/* ---------- COOLDOWN ---------- */}
      {status === ROUND_STATUS.COOLDOWN && (
        <div className="text-center space-y-3">
          <Badge variant="secondary" className="text-base px-4 py-2">
            Cooldown
          </Badge>
          <CountdownTimer timeLeft={timeLeft} label="до начала раунда" />
        </div>
      )}

      {/* ---------- ЗАВЕРШЕН ---------- */}
      {status === ROUND_STATUS.FINISHED && (
        <div className="w-full space-y-4">
          <Separator />

          <div className="space-y-3">
            {/* Общий счёт раунда */}
            <div className="flex justify-between items-center p-3 rounded-lg bg-[hsl(var(--color-accent))]/50">
              <span className="font-medium">Всего очков в раунде</span>
              <Badge variant="outline" className="text-base">
                {round.totalScore}
              </Badge>
            </div>

            {/* Победитель */}
            {topStats.length > 0 && (
              <div className="flex flex-col gap-2 p-3 rounded-lg bg-[hsl(var(--color-primary))]/10 border border-[hsl(var(--color-primary))]/20">
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    🏆 Победитель — {topStats[0].user.username}
                  </span>
                  <Badge variant="default" className="text-base">
                    {topStats[0].score} очков
                  </Badge>
                </div>
                <div className="text-xs text-[hsl(var(--color-muted-foreground))]">
                  {topStats[0].taps} тапов • множитель ×
                  {(topStats[0].score / topStats[0].taps).toFixed(2)}
                </div>
              </div>
            )}

            {/* Мои результаты */}
            <div className="flex flex-col gap-2 p-3 rounded-lg bg-[hsl(var(--color-accent))]/50">
              <div className="flex justify-between items-center">
                <span className="font-medium">Мои результаты</span>
                <Badge variant="outline" className="text-base">
                  {myStats.score} очков
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-[hsl(var(--color-muted-foreground))]">
                <div className="flex items-center gap-1">
                  <Hand className="h-3 w-3" />
                  <span>{myStats.taps} тапов</span>
                </div>
                {myStats.taps > 0 && (
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    <span>×{avgMultiplier} множитель</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </CardContent>
  );
};
