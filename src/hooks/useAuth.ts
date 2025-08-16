import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks.ts';
import {
  setAuth,
  logout as logoutAction,
  setUser,
  setRoles,
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
        const roles = JSON.parse(decodedToken.roles) as string[];
        dispatch(setAuth(true));
        dispatch(setUser(decodedToken.nameid));
        dispatch(setRoles(roles));
      } else {
        dispatch(setAuth(false));
        dispatch(setUser(null));
        dispatch(setRoles([]));
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
