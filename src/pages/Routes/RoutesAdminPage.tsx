import ConfirmModal from '../../components/shared/ConfirmModal';
import React from 'react';
import RouteCard from '@components/Routes/RouteCard';
import RouteFormModal from '@components/Routes/RouteFormModal';
import { useRoutesAdmin } from '../../hooks/useRoutesAdmin';
import { Toaster } from 'react-hot-toast';

const RoutesAdminPage: React.FC = () => {
  const {
  routes, isLoading, error,
  showModal, setShowModal,
  editRoute,
  confirmOpen, setConfirmOpen,
  setRouteToDelete,
  modalLoading,
  handleCreate, handleEdit, handleDelete,
  confirmDelete, handleSubmit
  } = useRoutesAdmin();

  return (
    <div className="min-h-screen py-10">
      <Toaster position="top-right" />
      <div className="flex flex-col items-center mb-8 px-4">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2 drop-shadow-lg">Gestión de rutas</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition duration-300 text-lg tracking-wide mb-4"
          onClick={handleCreate}
        >
          Crear nueva ruta
        </button>
      </div>
  {isLoading && <div className="text-center text-blue-600 text-xl font-semibold">Cargando rutas...</div>}
      {error && (
        <div className="text-center text-red-600 text-lg font-semibold">Ocurrió un error al cargar las rutas.</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 max-w-7xl mx-auto">
  {routes.map((route) => (
          <div key={route.rutaId} className="relative group">
            <RouteCard
              route={{
                id: route.rutaId,
                origen: route.locacionOrigenNombre,
                destino: route.locacionDestinoNombre,
                distanciaKm: route.distanciaKm,
                tiempoEstimado: route.tiempoEstimado,
              }}
              onReserve={() => handleEdit(route)}
            />
            <button
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white rounded-full p-2 shadow transition duration-200"
              onClick={() => handleDelete(route.rutaId)}
              title="Eliminar ruta"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
      {showModal && (
        <RouteFormModal
          initialData={editRoute ?? undefined}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
          loading={modalLoading}
          isEdit={!!editRoute}
        />
      )}
      <ConfirmModal
        open={confirmOpen}
        title="Eliminar ruta"
        message="¿Seguro que deseas eliminar esta ruta?"
        onConfirm={confirmDelete}
        onCancel={() => { setConfirmOpen(false); setRouteToDelete(null); }}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default RoutesAdminPage;
