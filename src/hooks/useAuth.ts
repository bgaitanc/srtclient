import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks.ts';
import { setAuth, logout as logoutAction } from '@store/slices/authSlice';
import { getToken, removeToken, setToken } from '@utils/token.ts';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = getToken();
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
    setToken(token);
    dispatch(setAuth(true));
  };

  const logout = () => {
    removeToken();
    dispatch(logoutAction());
  };

  return {
    isAuthenticated: authState.isAuthenticated,
    isLoading,
    login,
    logout,
  };
};
