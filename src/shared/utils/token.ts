import { STORAGE_KEYS } from '@config/constants.ts';

export function getToken() {
  const token = sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  return token ? token.slice(1, -1) : null;
}

export function setToken(token: string) {
  sessionStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, JSON.stringify(token));
}

export function removeToken() {
  sessionStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
}
