import type { RouteCardProps } from '@srtTypes/route.types';
import React from 'react';

const RouteCard: React.FC<RouteCardProps> = ({ route, onReserve }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col h-full border border-blue-100 hover:scale-[1.04] hover:shadow-blue-300 transition-transform duration-300 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 rounded-t-3xl" />
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="flex items-center justify-center gap-4 mb-6 mt-2">
          <span className="text-xl font-extrabold text-blue-700 drop-shadow">{route.origen}</span>
          <span className="mx-2 text-blue-400 text-4xl">→</span>
          <span className="text-xl font-extrabold text-blue-700 drop-shadow">{route.destino}</span>
        </div>
        <div className="flex flex-row justify-center gap-8 text-lg text-gray-700 mb-8">
          <span className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-1 shadow-sm">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17a5 5 0 00-10 0" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v10" />
            </svg>
            {route.distanciaKm} km
          </span>
          <span className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-1 shadow-sm">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            {route.tiempoEstimado.replace(/^(\d{2}):(\d{2}):(\d{2})$/, '$1h $2m')}
          </span>
        </div>
      </div>
      <div className="mt-auto w-full flex justify-center">
        <button
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition duration-300 text-lg tracking-wide"
          onClick={() => onReserve(route)}
        >
          Editar
        </button>
      </div>
    </div>
  );
};

export default RouteCard;
