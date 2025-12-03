import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks.ts';
import {
  setAuth,
  logout as logoutAction,
  setUser,
  setRoles,
} from '@store/slices/authSlice';
import { getToken, removeToken, setToken, setRefreshToken, removeRefreshToken } from '@utils/token.ts';
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
        const parts = token.split('.');
        if (parts.length !== 3) {
          removeToken();
          removeRefreshToken();
          dispatch(setAuth(false));
          dispatch(setUser(null));
          dispatch(setRoles([]));
          setIsLoading(false);
          window.location.reload();
          return;
        }

        try {
          const decodedToken = jwtDecode<CustomJwtPayload>(token);
          const roles = JSON.parse(decodedToken.roles) as string[];
          dispatch(setAuth(true));
          dispatch(setUser(decodedToken.nameid));
          dispatch(setRoles(roles));
        } catch (error) {
          console.error('Error decoding token:', error);
          removeToken();
          removeRefreshToken();
          dispatch(setAuth(false));
          dispatch(setUser(null));
          dispatch(setRoles([]));
          window.location.reload();
          return;
        }
      } else {
        dispatch(setAuth(false));
        dispatch(setUser(null));
        dispatch(setRoles([]));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [dispatch]);

  const login = (token: string, refreshToken: string) => {
    setToken(token);
    setRefreshToken(refreshToken);
    dispatch(setAuth(true));
  };

  const logout = () => {
    removeToken();
    removeRefreshToken();
    dispatch(logoutAction());
  };

  return {
    isAuthenticated: authState.isAuthenticated,
    isLoading,
    login,
    logout,
  };
};
