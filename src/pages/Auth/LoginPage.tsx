import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import InputField from '../../components/Input/InputField';
import Button from '@mui/material/Button';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      setTimeout(() => {
        if (formData.username === 'user' && formData.password === 'password') {
          const fakeToken = 'token123455';
          login(fakeToken);
          navigate('/dashboard');
        } else {
          setError('Credenciales inválidas. Inténtalo de nuevo.');
        }
        setIsLoading(false);
      }, 3000);
    } catch (err) {
      setError('Ocurrió un error inesperado.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Iniciar Sesión
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <InputField
                id="username"
                label="Usuario"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <InputField
                id="password"
                label="Contraseña"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300"
              variant="contained"
            >
              Entrar
            </Button>
          </form>
          <p className="text-center text-gray-600 text-sm mt-6">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
