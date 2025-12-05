import React from 'react';
import { Button } from '@/components/ui/button';
import { useCreateRoundMutation } from '@/entities/round';
import { Plus, Loader2 } from 'lucide-react';

interface CreateRoundButtonProps {
  onSuccess: (roundId: string) => void;
}

export const CreateRoundButton: React.FC<CreateRoundButtonProps> = ({ onSuccess }) => {
  const createRoundMutation = useCreateRoundMutation();

  const handleCreate = () => {
    createRoundMutation.mutate(undefined, {
      onSuccess: (round) => {
        onSuccess(round.id);
      },
    });
  };

  return (
    <Button
      onClick={handleCreate}
      disabled={createRoundMutation.isPending}
      className="w-full md:w-auto cursor-pointer"
    >
      {createRoundMutation.isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Создание...
        </>
      ) : (
        <>
          <Plus className="mr-2 h-4 w-4" />
          Создать раунд
        </>
      )}
    </Button>
  );
};