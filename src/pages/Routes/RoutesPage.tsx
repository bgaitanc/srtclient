import React from 'react';
import RouteCard from '@components/Routes/RouteCard';
import RouteDetailModal from '@components/Routes/RouteDetailModal';
import RoutesHeader from '@components/Routes/RoutesHeader';
import { Toaster } from 'react-hot-toast';
import { useRoutes } from '@hooks/useRoutes';
import { useRouteReservation } from '@hooks/useRouteReservation';

const RoutesPage: React.FC = () => {
  const { routes, loading, error } = useRoutes();
  const {
    selectedRoute,
    showDetailModal,
    handleReserve,
    handleCloseDetailModal,
  } = useRouteReservation();

  return (
    <div className="min-h-screen py-10">
      <Toaster position="top-right" />
      <RoutesHeader />
      {loading && <div className="text-center text-blue-600 text-xl font-semibold">Cargando rutas...</div>}
      {error && (
        <div className="text-center text-red-600 text-lg font-semibold">
          {String(
            'status' in error && error.status === 404
              ? 'No se encontraron rutas disponibles.'
              : 'data' in error && error.data && typeof error.data === 'object' && 'message' in error.data
                ? error.data.message
                : 'Ocurrió un error al cargar las rutas.'
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 max-w-7xl mx-auto">
        {routes?.data.map((route) => (
          <RouteCard
            key={route.rutaId}
            route={{
              id: route.rutaId,
              origen: route.locacionOrigenNombre,
              destino: route.locacionDestinoNombre,
              distanciaKm: route.distanciaKm,
              tiempoEstimado: route.tiempoEstimado,
            }}
            onReserve={handleReserve}
          />
        ))}
      </div>
      {showDetailModal && selectedRoute && (
        <RouteDetailModal route={selectedRoute} onClose={handleCloseDetailModal} />
      )}
    </div>
  );
};

export default RoutesPage;
