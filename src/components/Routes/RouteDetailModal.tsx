import React from 'react';

import type { RouteDetailModalProps } from '@srtTypes/route.types';

const RouteDetailModal: React.FC<RouteDetailModalProps> = ({ route, onClose }) => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-blue-300 bg-opacity-60">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg relative border border-blue-100">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-blue-600 text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-3xl font-extrabold text-blue-800 mb-6 text-center drop-shadow">Reserva tu viaje</h2>
        <div className="flex flex-col gap-2 mb-6 text-lg text-gray-700">
          <div><span className="font-bold text-blue-700">Origen:</span> {route.origen}</div>
          <div><span className="font-bold text-blue-700">Destino:</span> {route.destino}</div>
          <div><span className="font-bold text-blue-700">Distancia:</span> {route.distanciaKm} km</div>
          <div><span className="font-bold text-blue-700">Tiempo estimado:</span> {route.tiempoEstimado.replace(/^(\d{2}):(\d{2}):(\d{2})$/, '$1h $2m')}</div>
        </div>
        <div className="flex flex-col gap-2 mb-6 text-base text-gray-600">
          <div><span className="font-semibold">Chofer:</span> Juan Pérez</div>
          <div><span className="font-semibold">Vehículo:</span> Toyota Hiace 2022</div>
          <div><span className="font-semibold">Métodos de pago:</span> Efectivo, Tarjeta, Transferencia</div>
        </div>
        <button
          className="mt-8 w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 rounded-xl shadow-lg transition duration-300 text-lg"
          onClick={onClose}
        >
          Confirmar reserva
        </button>
      </div>
    </div>
  );
};

export default RouteDetailModal;
