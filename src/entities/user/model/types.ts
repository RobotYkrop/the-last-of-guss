export interface User {
  username: string;
  role: 'SURVIVOR' | 'ADMIN';
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  username: string;
  role: 'SURVIVOR' | 'ADMIN';
  token: string;
}

export interface LogoutResponse {
  success: boolean;
}