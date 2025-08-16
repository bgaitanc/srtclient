import React from 'react';
import srtLogo from '@assets/images/srt_logo_transparent.png';
import { Link } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth.ts';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-blue-300 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <img src={srtLogo} alt="SRT Logo" className="h-10 w-10 object-contain" />
          <span className="text-2xl font-bold">Sistema de Reservas de Transporte</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-blue-200">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-blue-200">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/travels" className="hover:text-blue-200">
                Viajes
              </Link>
            </li>
            {!isAuthenticated ? (
              <li>
                <Link to="/login" className="hover:text-blue-200">
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition-colors duration-200"
                >
                  Cerrar sesión
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
