import React from 'react';
import BaseModal from '../shared/BaseModal';

import type { TravelDetailModalProps } from '@srtTypes/travels.types.ts';
import dayjs from 'dayjs';
import { SrtFormats } from '@config/constants.ts';

const TravelDetailModal: React.FC<TravelDetailModalProps> = ({
  travel,
  onClose,
  onSubmit,
}) => {
  return (
    <BaseModal open={true} onClose={onClose} maxWidth="max-w-lg">
      <h2 className="text-3xl font-extrabold text-blue-800 mb-6 text-center drop-shadow">
        Reserva tu viaje
      </h2>
      <div className="flex flex-col gap-2 mb-6 text-lg text-gray-700">
        <div>
          <span className="font-bold text-blue-700">Origen:</span>{' '}
          {travel.ruta.locacionOrigen}
        </div>
        <div>
          <span className="font-bold text-blue-700">Destino:</span>{' '}
          {travel.ruta.locacionDestino}
        </div>
        <div>
          <span className="font-bold text-blue-700">Distancia:</span>{' '}
          {travel.ruta.distanciaKM} km
        </div>
        <div>
          <span className="font-bold text-blue-700">Tiempo estimado:</span>{' '}
          {travel.ruta.tiempoEstimado.replace(
            /^(d{2}):(d{2}):(d{2})$/,
            '$1h $2m'
          )}
        </div>
        <div>
          <span className="font-bold text-blue-700">Fecha de salida:</span>{' '}
          {dayjs(travel.fechaHoraSalida).format(SrtFormats.DATE_TIME_SHORT)}
        </div>
        <div>
          <span className="font-bold text-blue-700">Fecha de llegada estimada:</span>{' '}
          {dayjs(travel.fechaHoraLlegada).format(SrtFormats.DATE_TIME_SHORT)}
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-6 text-base text-gray-600">
        <div>
          <span className="font-semibold">Chofer:</span>{' '}
          {`${travel.conductor.nombres} ${travel.conductor.apellidos}`}
        </div>
        <div>
          <span className="font-semibold">Vehículo:</span>{' '}
          {`(${travel.vehiculo.placa}) ${travel.vehiculo.modelo}`}
        </div>
        <div>
          <span className="font-semibold">Métodos de pago:</span> Efectivo,
          Tarjeta, Transferencia
        </div>
      </div>
      <button
        className="mt-8 w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 rounded-xl shadow-lg transition duration-300 text-lg"
        onClick={onSubmit}
      >
        Confirmar reserva
      </button>
    </BaseModal>
  );
};

export default TravelDetailModal;
