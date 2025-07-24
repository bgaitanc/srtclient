export const STORAGE_KEYS = {
  AUTH_TOKEN: import.meta.env.VITE_AUTH_TOKEN_KEY ?? 'default_auth_token',
  USER_SETTINGS:
    import.meta.env.VITE_USER_SETTINGS_KEY ?? 'default_user_settings',
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
