import React from 'react';
import { useAuth } from '@hooks/useAuth.ts';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="w-full bg-blue-300 border-b border-blue-100 py-3 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-xl font-extrabold text-white">SRT Backoffice</span>
      </div>
      <div className="flex items-center gap-4">
        {isAuthenticated && (
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
          >
            Cerrar sesión
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
