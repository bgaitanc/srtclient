import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth.ts';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Bienvenido a la App de Reservas de Buses
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Encuentra y reserva tus boletos de bus de forma rápida y sencilla.
      </p>
      <div className="space-x-4">
        {!isAuthenticated && (
          <Link
            to="/login"
            className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg shadow-md transition duration-300"
          >
            Iniciar Sesión
          </Link>
        )}
        <Link
          to="/dashboard"
          className="bg-amber-400 hover:bg-amber-600 text-white font-bold py-4 px-6 rounded-lg shadow-md transition duration-300"
        >
          Dashboard (Protegido)
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
