import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth.ts';

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-blue-400 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          SRT
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
            {!isAuthenticated && (
              <li>
                <Link to="/login" className="hover:text-blue-200">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
