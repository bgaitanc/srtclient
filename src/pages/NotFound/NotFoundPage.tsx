import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-4">
        Página No Encontrada
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        Lo sentimos, la página que estás buscando no existe.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300"
      >
        Volver a la Página de Inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;
