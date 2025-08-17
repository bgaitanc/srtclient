import React from 'react';
import type { GetReservationInfoResponse } from '@srtTypes/reservation.types.ts';
import BaseModal from '@components/shared/BaseModal.tsx';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { SrtFormats } from '@config/constants.ts';

const ReservationTicket: React.FC<{
  data: GetReservationInfoResponse;
}> = ({ data }) => {
  const navigation = useNavigate();

  return (
    <BaseModal
      open={true}
      onClose={() => {
        navigation('/dashboard', { viewTransition: true });
      }}
      maxWidth="max-w-lg"
    >
      <h2 className="text-3xl font-extrabold text-blue-800 mb-6 text-center drop-shadow">
        {`Ticket # ${data.reservaId}`}
      </h2>
      <div className="flex flex-col gap-2 mb-6 text-lg text-gray-700">
        <div>
          <span className="font-bold text-blue-700">
            Fecha de Reserva:
          </span>{' '}
          {dayjs(data.fechaReserva).format(
            SrtFormats.DATE_TIME_SHORT
          )}
        </div>
        <div>
          <span className="font-bold text-blue-700">Origen:</span>{' '}
          {data.ruta.locacionOrigen}
        </div>
        <div>
          <span className="font-bold text-blue-700">Destino:</span>{' '}
          {data.ruta.locacionDestino}
        </div>
        <div>
          <span className="font-bold text-blue-700">Distancia:</span>{' '}
          {data.ruta.distanciaKM} km
        </div>
        <div>
          <span className="font-bold text-blue-700">Tiempo estimado:</span>{' '}
          {data.ruta.tiempoEstimado.replace(
            /^(d{2}):(d{2}):(d{2})$/,
            '$1h $2m'
          )}
        </div>
        <div>
          <span className="font-bold text-blue-700">Fecha de salida:</span>{' '}
          {dayjs(data.viaje.fechaHoraSalida).format(SrtFormats.DATE_TIME_SHORT)}
        </div>
        <div>
          <span className="font-bold text-blue-700">
            Fecha de llegada estimada:
          </span>{' '}
          {dayjs(data.viaje.fechaHoraLlegada).format(
            SrtFormats.DATE_TIME_SHORT
          )}
        </div>
        <div>
          <span className="font-bold text-blue-700">
            Asientos:
          </span>{' '}
          {data.detalle.map(x => x.numeroAsiento).join(', ')}
        </div>
      </div>
      <button
        className="mt-8 w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 rounded-xl shadow-lg transition duration-300 text-lg"
        onClick={() => {
          navigation('/dashboard', { viewTransition: true });
        }}
      >
        Entendido
      </button>
    </BaseModal>
  );
};

export default ReservationTicket;
