import { apiClient } from '@/shared/api';
import type { LoginCredentials, LoginResponse, LogoutResponse, User } from '../model/types';

export const userApi = {
  // Вход или регистрация
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const data = await apiClient.post<LoginResponse>('/auth/login', credentials);

    // сохраняем токен внутрь apiClient
    apiClient.setToken(data.token);

    return data;
  },
  
  // Получить текущего пользователя
  me: async (): Promise<User> => {
    return apiClient.get<User>('/auth/me');
  },
  
  // Выход
  logout: async (): Promise<LogoutResponse> => {
    return apiClient.post<LogoutResponse>('/auth/logout');
  },
};