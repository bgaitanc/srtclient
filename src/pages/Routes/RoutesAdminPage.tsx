import ConfirmModal from '../../components/shared/ConfirmModal';
import React, { useMemo, useState } from 'react';
import RouteFormModal from '@components/Routes/RouteFormModal';
import { useRoutesAdmin } from '../../hooks/useRoutesAdmin';
import { Toaster } from 'react-hot-toast';

const RoutesAdminPage: React.FC = () => {
  const {
  routes, isLoading,
  showModal, setShowModal,
  editRoute,
  confirmOpen, setConfirmOpen,
  setRouteToDelete,
  modalLoading,
  handleCreate, handleEdit, handleDelete,
  confirmDelete, handleSubmit
  } = useRoutesAdmin();

  const [search, setSearch] = useState('');
  const filteredRoutes = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return routes;
    return routes.filter(r => {
      const idStr = String(r.routeId).toLowerCase();
      const origin = (r.originDestinationName ?? '').toLowerCase();
      const dest = (r.finalDestinationName ?? '').toLowerCase();
      return idStr.includes(q) || origin.includes(q) || dest.includes(q);
    });
  }, [routes, search]);

  return (
    <div className="min-h-screen py-10">
      <Toaster position="top-right" />
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-blue-700">Gestión de rutas</h1>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow transition cursor-pointer"
            onClick={handleCreate}
            disabled={modalLoading}
          >
            Crear ruta
          </button>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por ID, origen o destino"
              className="w-72 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <span className="text-sm text-gray-500">{filteredRoutes.length} resultados</span>
          </div>
        </div>
        {isLoading && <div className="text-blue-600 text-base font-medium">Cargando rutas...</div>}
        <div className="w-full">
          <div className="overflow-x-auto rounded-xl border border-blue-100 shadow-sm">
            <table className="w-full bg-white">
              <thead>
                <tr className="bg-blue-50 text-blue-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Origen</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Destino</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Distancia (km)</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Tiempo</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoutes.map((route) => (
                  <tr key={route.routeId} className="border-t border-blue-100 hover:bg-blue-50/40">
                    <td className="px-4 py-3 text-sm text-gray-700">{route.routeId}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{route.originDestinationName}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{route.finalDestinationName}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{route.distanceInKm}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{route.estimatedTime}</td>
                    <td className="px-4 py-3 text-sm text-right">
                      <div className="inline-flex gap-2">
                        <button
                          className="text-yellow-600 font-semibold px-3 py-2 rounded-lg cursor-pointer"
                          onClick={() => handleEdit(route)}
                        >
                          Editar
                        </button>
                        <button
                          className="text-red-600 font-semibold px-3 py-2 rounded-lg cursor-pointer"
                          onClick={() => handleDelete(route.routeId)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredRoutes.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>No hay rutas registradas.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
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
