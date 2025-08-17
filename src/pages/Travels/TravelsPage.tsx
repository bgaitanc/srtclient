import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useTravelReservation } from '@hooks/useTravelReservation.ts';
import { useTravels } from '@hooks/useTravels.ts';
import TravelsHeader from '@components/Travels/TravelsHeader.tsx';
import TravelCard from '@components/Travels/TravelCard.tsx';
import TravelDetailModal from '@components/Travels/TravelDetailModal.tsx';
import TravelReservationForm from '@components/Travels/TravelReservationForm.tsx';
import ReservationTicket from '@components/Reservations/ReservationTicket.tsx';

const TravelsPage: React.FC = () => {
  const { data: travels, isLoading, error } = useTravels();
  const {
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
  } = useTravelReservation();

  return (
    <div className="min-h-screen py-10">
      <Toaster position="top-right" />
      <TravelsHeader />
      {isLoading && (
        <div className="text-center text-blue-600 text-xl font-semibold">
          Cargando rutas...
        </div>
      )}
      {error && (
        <div className="text-center text-red-600 text-lg font-semibold">
          {String(
            'status' in error && error.status === 404
              ? 'No se encontraron viajes disponibles.'
              : 'data' in error &&
                  error.data &&
                  typeof error.data === 'object' &&
                  'message' in error.data
                ? error.data.message
                : 'Ocurrió un error al cargar las rutas.'
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 max-w-7xl mx-auto">
        {travels?.data.map((travel) => (
          <TravelCard
            key={travel.viajeId}
            travel={travel}
            onReserve={handleReserve}
          />
        ))}
      </div>
      {showDetailModal && selectedTravel && (
        <TravelDetailModal
          travel={selectedTravel}
          onClose={handleCloseDetailModal}
          onSubmit={goToTravelReservation}
        />
      )}
      {showTravelReservation && selectedTravel && (
        <TravelReservationForm
          viajeId={selectedTravel.viajeId}
          onCancel={cancelTravelReservation}
          setShowReservationTicket={setShowReservationTicket}
          setCreatedReservation={setCreatedReservation}
        />
      )}

      {showReservationTicket && (
        <ReservationTicket data={createdReservation!}/>
      )}
    </div>
  );
};

export default TravelsPage;
