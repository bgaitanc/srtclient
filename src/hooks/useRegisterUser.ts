import { useState, useEffect } from 'react';
import { useRegisterMutation } from '@services/authentication.service.ts';
import type { UserRegisterReq } from '@models/authentication.ts';
import { useNavigate } from 'react-router-dom';

export const useRegisterUser = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const [
    registerAction,
    {
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
      isLoading: isRegisterLoading,
    },
  ] = useRegisterMutation();

  useEffect(() => {
    if (isRegisterSuccess) {
      // Se muestra el mensaje de éxito y luego se redirige
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
    if (isRegisterError) {
      if (registerError && 'data' in registerError) {
        setError(
          (registerError.data as { message?: string }).message ||
            'Error desconocido al registrar usuario'
        );
      } else {
        setError('Error al conectar con el servidor para registrar usuario');
      }
    }
  }, [isRegisterSuccess, isRegisterError, registerError, navigate]);

  const registerUser = async (values: UserRegisterReq) => {
    setError('');
    try {
      await registerAction(values).unwrap();
    } catch (err) {
      console.error('Error al registrar usuario:', err);
      throw err;
    }
  };

  return {
    registerUser,
    isLoading: isRegisterLoading,
    error,
    isSuccess: isRegisterSuccess,
  };
};
