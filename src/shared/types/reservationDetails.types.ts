import React from 'react';
import type { GetReservationInfoResponse } from '@srtTypes/reservation.types.ts';

export type ReservationDetail = {
  travelId: number;
  capacity: number;
  reservedSeats: number[];
};

export type ReservationDetails = ReservationDetail;

export type TravelReservationFormProps = {
  travelId: number;
  onCancel: () => void;
  setShowReservationTicket: React.Dispatch<React.SetStateAction<boolean>>;
  setCreatedReservation: React.Dispatch<
    React.SetStateAction<GetReservationInfoResponse | null>
  >;
};
