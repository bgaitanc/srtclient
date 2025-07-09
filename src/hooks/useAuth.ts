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
    // simulation of authentication
    const checkAuth = () => {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        // Validar token con backend si es necesario
        // api call to validate token can be added here
        dispatch(setAuth(true));
      } else {
        dispatch(setAuth(false));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [dispatch]);

  // Aquí podrías añadir funciones para login y logout
  // Por ejemplo, podrías hacer una llamada a la API para autenticar al usuario
  // y luego guardar el token en localStorage y actualizar el estado de autenticación.
  const login = (token: string) => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    dispatch(setAuth(true));
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    dispatch(logoutAction());
  };

  return { isAuthenticated: authState.isAuthenticated, isLoading, login, logout };
};