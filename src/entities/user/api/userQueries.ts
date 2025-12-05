import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userApi } from './userApi';
import { queryKeys } from '@/shared/api/queryKeys';
import type { LoginCredentials } from '../model/types';
import { useNavigate } from 'react-router-dom';

// Query для получения текущего пользователя
export const useUserQuery = () => {
  return useQuery({
    queryKey: queryKeys.user.me(),
    queryFn: userApi.me,
    retry: false,
    staleTime: Infinity,
  });
};

// Mutation для логина
export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => userApi.login(credentials),
    onSuccess: (data) => {
      // Сохраняем пользователя в кэш
      queryClient.setQueryData(queryKeys.user.me(), {
        username: data.username,
        role: data.role,
      });
    },
  });
};

// Mutation для логаута
export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: userApi.logout,

    onSuccess: () => {
      queryClient.clear();
      navigate('/', { replace: true });
    },

    onError: (err: unknown) => {
      console.error('Logout failed', err);
    },
  });
};