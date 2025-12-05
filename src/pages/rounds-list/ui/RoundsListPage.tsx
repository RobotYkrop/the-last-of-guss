import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Header } from '@/widgets/header';
import { RoundCard } from '@/widgets/round-card';
import { CreateRoundButton } from '@/features/round/create-round';
import { useUserQuery } from '@/entities/user';
import { useRoundsInfiniteQuery } from '@/entities/round';
import { USER_ROLE } from '@/shared/config';
import { Loader2, Gamepad2, RefreshCw } from 'lucide-react';

export const RoundsListPage: React.FC = () => {
  const navigate = useNavigate();
  
  const { data: user } = useUserQuery();
  
  const {
    data,
    isFetching: isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useRoundsInfiniteQuery();

  const isAdmin = user?.role === USER_ROLE.ADMIN;

  // Редирект если нет пользователя
  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  // Собираем все раунды из всех страниц
  const rounds = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.data);
  }, [data]);

  const handleRefresh = () => {
    refetch();
  };

  const handleCreateSuccess = (roundId: string) => {
    navigate(`/round/${roundId}`);
  };

  const handleRoundClick = (roundId: string) => {
    navigate(`/round/${roundId}`);
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--color-background))] via-[hsl(var(--color-background))] to-[hsl(var(--color-accent))]/20">
      <div className="max-w-4xl mx-auto p-4">
        <Card className="shadow-2xl">
          <Header title="Список РАУНДОВ" />
          
          <div className="p-6 space-y-4">
            {/* Кнопки управления */}
            <div className="flex gap-2">
              {isAdmin && (
                <CreateRoundButton onSuccess={handleCreateSuccess} />
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className='cursor-pointer'
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`}
                />
                Обновить
              </Button>
            </div>
            
            {/* Загрузка первой страницы */}
            {isLoading && rounds.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-[hsl(var(--color-primary))]" />
              </div>
            ) : rounds.length === 0 ? (
              // Пустое состояние
              <div className="text-center py-12 space-y-4">
                <Gamepad2 className="h-16 w-16 mx-auto text-[hsl(var(--color-muted-foreground))]" />
                <p className="text-[hsl(var(--color-muted-foreground))]">
                  Нет доступных раундов
                </p>
                {isAdmin && (
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                    Создайте первый раунд, чтобы начать игру
                  </p>
                )}
              </div>
            ) : (
              // Список раундов
              <>
                <div className="space-y-3">
                  {rounds.map((round) => (
                    <RoundCard
                      key={round.id}
                      round={round}
                      onClick={handleRoundClick}
                    />
                  ))}
                </div>
                
                {/* Кнопка загрузить ещё */}
                {hasNextPage && (
                  <Button
                    variant="outline"
                    className="w-full cursor-pointer"
                    onClick={handleLoadMore}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Загрузка...
                      </>
                    ) : (
                      'Загрузить ещё'
                    )}
                  </Button>
                )}
                
                {/* Индикатор когда больше нет данных */}
                {!hasNextPage && rounds.length > 10 && (
                  <p className="text-center text-sm text-[hsl(var(--color-muted-foreground))] py-4">
                    Все раунды загружены
                  </p>
                )}
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};