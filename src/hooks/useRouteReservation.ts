import { useState } from 'react';

export function useRouteReservation() {
  const [selectedRoute, setSelectedRoute] = useState<any | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleReserve = (route: any) => {
    setSelectedRoute(route);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedRoute(null);
  };

  return {
    selectedRoute,
    showDetailModal,
    handleReserve,
    handleCloseDetailModal,
  };
}
