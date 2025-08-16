import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks.ts';
import {
  setAuth,
  logout as logoutAction,
  setUser,
} from '@store/slices/authSlice';
import { getToken, removeToken, setToken } from '@utils/token.ts';
import { jwtDecode } from 'jwt-decode';
import type { CustomJwtPayload } from '@models/authentication.ts';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = getToken();

      if (token) {
        // Validar token con backend
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        dispatch(setAuth(true));
        dispatch(setUser(decodedToken.nameid));
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
