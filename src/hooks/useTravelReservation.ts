import { useState } from 'react';
import type { Travel } from '@srtTypes/travels.types.ts';

export function useTravelReservation() {
  const [selectedTravel, setSelectedTravel] = useState<Travel | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showTravelReservation, setShowTravelReservation] = useState(false);

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
  }

  const cancelTravelReservation = () => {
    setShowTravelReservation(false);
    setSelectedTravel(null);
  }

  return {
    selectedTravel,
    showDetailModal,
    showTravelReservation,
    handleReserve,
    handleCloseDetailModal,
    goToTravelReservation,
    cancelTravelReservation
  };
}
