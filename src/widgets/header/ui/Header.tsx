import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, User } from 'lucide-react';
import { useUserQuery } from '@/entities/user';
import { LogoutButton } from '@/features/auth/logout';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack, onBack }) => {
  const { data: user } = useUserQuery();

  return (
    <div>
      <div className="flex items-center justify-between p-6">
        {showBack && onBack ? (
          <Button variant="ghost" onClick={onBack} className="gap-2 cursor-pointer">
            <ArrowLeft className="h-4 w-4" />
            {title}
          </Button>
        ) : (
          <h1 className="text-2xl font-bold">{title}</h1>
        )}
        
        <div className="flex items-center gap-2 text-[hsl(var(--color-muted-foreground))]">
          <User className="h-4 w-4" />
          <span className="text-sm">{user?.username || 'Загрузка...'}</span>
          <LogoutButton />
        </div>
      </div>
      <Separator />
    </div>
  );
};