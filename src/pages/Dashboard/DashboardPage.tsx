import React from 'react';
import { useAuth } from '../../hooks/useAuth'; // Para usar la función de logout
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';

const DashboardPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirigir al login después de cerrar sesión
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Bienvenido al Dashboard</h1>
        <p className="text-lg text-gray-600 mb-8">
          Esta es una página protegida a la que solo los usuarios autenticados pueden acceder.
          Aquí podrás gestionar tus reservas, ver tu perfil, etc.
        </p>
        <Button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg shadow-md transition duration-300"
        >
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;