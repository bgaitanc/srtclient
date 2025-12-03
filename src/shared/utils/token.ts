import { STORAGE_KEYS } from '@config/constants.ts';

export function getToken() {
  return sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
}

export function setToken(token: string) {
  sessionStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
}

export function removeToken() {
  sessionStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
}

export function getRefreshToken() {
  return sessionStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
}

export function setRefreshToken(token: string) {
  sessionStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
}

export function removeRefreshToken() {
  sessionStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
}
