import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth.ts';
import srtLogo from '@assets/images/srt_logo_transparent.png';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col justify-center items-center min-h-full w-full">
      <div className="relative z-10 h-full w-full bg-white/90 rounded-3xl p-10 flex flex-col items-center">
        <img src={srtLogo} alt="SRT Logo" className="h-20 w-20 mb-4 object-contain drop-shadow-lg" />
        <h1 className="text-5xl font-extrabold text-blue-500 mb-3 tracking-tight text-center">Sistema de Reservas de Transporte</h1>
        <p className="text-xl text-gray-700 mb-8 text-center">Reserva tu viaje en bus de manera rápida, segura y sencilla.</p>
        <div className="flex flex-col sm:flex-row gap-6 mb-8 w-full justify-center">
          {!isAuthenticated && (
            <Link
              to="/login"
              className="group bg-blue-200 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl shadow-md transition duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
            >
              Iniciar Sesión
            </Link>
          )}
          <Link
            to="/dashboard"
            className="group bg-amber-400 hover:bg-amber-500 text-white font-bold py-4 px-8 rounded-xl shadow-md transition duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber-300 text-lg"
          >
            Dashboard
          </Link>
          <Link
            to="/routes"
            className="group bg-white hover:bg-blue-100 text-blue-500 font-bold py-4 px-8 rounded-xl shadow-md transition duration-300 flex items-center gap-2 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg"
          >
            Ver Rutas
          </Link>
        </div>
        <div className="w-full mt-2">
          <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center">¿Cómo funciona?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-blue-100 rounded-xl p-6 shadow hover:shadow-xl transition duration-300 flex flex-col items-center">
              <span className="text-5xl mb-3">🔍</span>
              <h3 className="font-semibold text-black mb-2 text-lg">Busca tu ruta</h3>
              <p className="text-base text-gray-600 text-center">Explora las rutas disponibles y elige tu destino.</p>
            </div>
            <div className="bg-blue-100 rounded-xl p-6 shadow hover:shadow-xl transition duration-300 flex flex-col items-center">
              <span className="text-5xl mb-3">📝</span>
              <h3 className="font-semibold text-black mb-2 text-lg">Reserva tu viaje</h3>
              <p className="text-base text-gray-600 text-center">Completa tu reserva en pocos pasos y asegura tu asiento.</p>
            </div>
            <div className="bg-blue-100 rounded-xl p-6 shadow hover:shadow-xl transition duration-300 flex flex-col items-center">
              <span className="text-5xl mb-3">🎫</span>
              <h3 className="font-semibold text-black mb-2 text-lg">Recibe tu boleto</h3>
              <p className="text-base text-gray-600 text-center">Obtén tu boleto digital y prepárate para viajar.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
