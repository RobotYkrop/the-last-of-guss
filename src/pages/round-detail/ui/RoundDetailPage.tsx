import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Header } from '@/widgets/header';
import { GooseClicker } from '@/widgets/goose-clicker';
import { RoundStats } from '@/widgets/round-stats';
import { useRoundQuery, getRoundStatus } from '@/entities/round';
import { ROUND_STATUS, ROUTES } from '@/shared/config';
import { Loader2 } from 'lucide-react';

export const RoundDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: currentRound, isLoading } = useRoundQuery(id);

  const handleBack = () => {
    navigate(ROUTES.ROUNDS);
  };

  if (isLoading || !currentRound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(var(--color-background))] via-[hsl(var(--color-background))] to-[hsl(var(--color-accent))]/20">
        <div className="flex items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[hsl(var(--color-primary))]" />
          <span className="text-xl">Загрузка раунда...</span>
        </div>
      </div>
    );
  }

  const getHeaderTitle = () => {
    if (!currentRound) return 'Раунды';
    const status = getRoundStatus(currentRound.round);
    if (status === ROUND_STATUS.COOLDOWN) return 'Cooldown';
    if (status === ROUND_STATUS.FINISHED) return 'Раунд завершен';
    return 'Раунды';
  };

  const status = getRoundStatus(currentRound.round);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--color-background))] via-[hsl(var(--color-background))] to-[hsl(var(--color-accent))]/20 p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <Card className="shadow-2xl">
          <Header title={getHeaderTitle()} showBack onBack={handleBack} />
          <GooseClicker roundDetail={currentRound} />
        </Card>
        
        {status === ROUND_STATUS.FINISHED && currentRound.topStats.length > 0 && (
          <RoundStats stats={currentRound.topStats} />
        )}
      </div>
    </div>
  );
};