import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ROUND_STATUS } from '@/shared/config';

interface RoundStatusProps {
  status: 'active' | 'cooldown' | 'finished';
}

const statusConfig = {
  [ROUND_STATUS.ACTIVE]: { label: 'Активен', variant: 'default' as const },
  [ROUND_STATUS.COOLDOWN]: { label: 'Cooldown', variant: 'secondary' as const },
  [ROUND_STATUS.FINISHED]: { label: 'Завершен', variant: 'outline' as const },
};

export const RoundStatus: React.FC<RoundStatusProps> = ({ status }) => {
  const config = statusConfig[status];
  
  return (
    <Badge variant={config.variant} className="text-sm">
      {config.label}
    </Badge>
  );
};