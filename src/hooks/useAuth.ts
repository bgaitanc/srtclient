import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { setAuth, logout as logoutAction } from '../store/slices/authSlice';
import { STORAGE_KEYS } from '../config/constants';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        // Validar token con backend
        dispatch(setAuth(true));
      } else {
        dispatch(setAuth(false));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [dispatch]);

  const login = (token: string) => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    dispatch(setAuth(true));
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    dispatch(logoutAction());
  };

  return {
    isAuthenticated: authState.isAuthenticated,
    isLoading,
    login,
    logout,
  };
};
