import { useState } from 'react';
import type { Travel } from '@srtTypes/travels.types.ts';
import type { GetReservationInfoResponse } from '@srtTypes/reservation.types.ts';

export function useTravelReservation() {
  const [selectedTravel, setSelectedTravel] = useState<Travel | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showTravelReservation, setShowTravelReservation] = useState(false);
  const [showReservationTicket, setShowReservationTicket] = useState(false);
  const [createdReservation, setCreatedReservation] =

    useState<GetReservationInfoResponse | null>(null);

  const handleReserve = (travel: Travel) => {
    setSelectedTravel(travel);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedTravel(null);
  };

  const goToTravelReservation = () => {
    setShowDetailModal(false);
    setShowTravelReservation(true);
  };

  const cancelTravelReservation = () => {
    setShowTravelReservation(false);
    setSelectedTravel(null);
  };

  return {
    selectedTravel,
    showDetailModal,
    showTravelReservation,
    handleReserve,
    handleCloseDetailModal,
    goToTravelReservation,
    cancelTravelReservation,
    showReservationTicket,
    setShowReservationTicket,
    createdReservation,
    setCreatedReservation,
  };
}
