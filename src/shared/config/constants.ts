export const API_BASE_URL = 'http://v2991160.hosted-by-vdsina.ru/api/v1';

export const ROUTES = {
  LOGIN: '/',
  ROUNDS: '/rounds',
  ROUND: '/round/:id',
} as const;

export const ROUND_STATUS = {
  ACTIVE: 'active',
  COOLDOWN: 'cooldown',
  FINISHED: 'finished',
} as const;

export const USER_ROLE = {
  SURVIVOR: 'SURVIVOR',
  ADMIN: 'ADMIN',
} as const;