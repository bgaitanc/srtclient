import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simular la verificación de autenticación (ej. verificar token en localStorage)
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        // Aquí podrías validar el token con tu backend si es necesario
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Aquí podrías añadir funciones para login y logout
  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isLoading, login, logout };
};