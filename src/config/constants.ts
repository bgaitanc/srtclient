// Storage keys and global configurations
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'srt_auth_token',
  USER_SETTINGS: 'srt_user_settings',
};

// URL of the API from Vite environment variable
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
