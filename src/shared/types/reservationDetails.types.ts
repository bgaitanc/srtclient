import React from 'react';
import type { GetReservationInfoResponse } from '@srtTypes/reservation.types.ts';

export type ReservationDetail = {
  viajeId: number;
  capacidad: number;
  asientosReservados: number[];
};

export type ReservationDetails = ReservationDetail;

export type TravelReservationFormProps = {
  viajeId: number;
  onCancel: () => void;
  setShowReservationTicket: React.Dispatch<React.SetStateAction<boolean>>;
  setCreatedReservation: React.Dispatch<
    React.SetStateAction<GetReservationInfoResponse | null>
  >;
};
