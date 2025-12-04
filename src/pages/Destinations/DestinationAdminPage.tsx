import React, { useMemo, useState } from 'react';
import ConfirmModal from '../../components/shared/ConfirmModal';
import BaseModal from '../../components/shared/BaseModal';
import { useDestinationAdmin } from '../../hooks/useDestinationAdmin';
import { Toaster } from 'react-hot-toast';

const DestinationAdminPage: React.FC = () => {
  const {
    states, selectedStateId, setSelectedStateId,
    destinations, isLoading,
    showModal, setShowModal,
    editDestination,
    confirmOpen, setConfirmOpen,
    setDestinationToDelete,
    destinationName, setDestinationName,
    stateId, setStateId,
    modalLoading,
    handleCreate, handleEdit, handleDelete,
    confirmDelete, handleSubmit
  } = useDestinationAdmin();

  const [search, setSearch] = useState('');
  const filteredDestinations = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return destinations;
    return destinations.filter(d => {
      const idStr = String(d.destinationId).toLowerCase();
      const name = (d.destinationName ?? '').toLowerCase();
      const stateName = (states.find(s => s.id === d.stateId)?.name ?? '').toLowerCase();
      return idStr.includes(q) || name.includes(q) || stateName.includes(q);
    });
  }, [destinations, states, search]);

  return (
    <div className="min-h-screen py-10">
      <Toaster position="top-right" />
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-blue-700">Gestión de Destinos</h1>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow transition cursor-pointer"
            onClick={handleCreate}
            disabled={modalLoading}
          >
            Crear Destino
          </button>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por ID, nombre o departamento"
              className="w-72 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <span className="text-sm text-gray-500">{filteredDestinations.length} resultados</span>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-700">Filtrar por departamento</label>
            <select
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={selectedStateId}
              onChange={e => setSelectedStateId(e.target.value)}
            >
              <option value="">Todos</option>
              {states.map(state => (
                <option key={state.id} value={String(state.id)}>{state.name}</option>
              ))}
            </select>
          </div>
        </div>
        {isLoading && <div className="text-blue-600 text-base font-medium">Cargando Destinos...</div>}
        <div className="w-full">
          <div className="overflow-x-auto rounded-xl border border-blue-100 shadow-sm">
            <table className="w-full bg-white">
              <thead>
                <tr className="bg-blue-50 text-blue-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Nombre</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Departamento</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredDestinations.map((destination) => (
                  <tr key={destination.destinationId} className="border-t border-blue-100 hover:bg-blue-50/40">
                    <td className="px-4 py-3 text-sm text-gray-700">{destination.destinationId}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{destination.destinationName}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{states.find(s => s.id === destination.stateId)?.name}</td>
                    <td className="px-4 py-3 text-sm text-right">
                      <div className="inline-flex gap-2">
                        <button
                          className="text-yellow-600 font-semibold px-3 py-2 rounded-lg cursor-pointer"
                          onClick={() => handleEdit(destination)}
                        >
                          Editar
                        </button>
                        <button
                          className="text-red-600 font-semibold px-3 py-2 rounded-lg cursor-pointer"
                          onClick={() => handleDelete(destination.destinationId)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredDestinations.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-center text-gray-500" colSpan={4}>No hay destinos registrados.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal && (
        <BaseModal open={true} onClose={modalLoading ? undefined : () => setShowModal(false)} maxWidth="max-w-md">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-xl font-bold text-blue-700">{editDestination ? 'Editar locación' : 'Nueva locación'}</h2>
              <p className="text-sm text-gray-500 mt-1">Completa la información y guarda los cambios.</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Destino</label>
              <input
                type="text"
                value={destinationName}
                onChange={e => setDestinationName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ej. Col. Centro"
                required
                disabled={modalLoading}
              />
              <p className="mt-1 text-xs text-gray-400">Usa un nombre claro y único.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={stateId ?? ''}
                onChange={e => setStateId(e.target.value)}
                required
                disabled={modalLoading}
              >
                <option value="">Selecciona un departamento</option>
                {states.map(state => (
                  <option key={state.id} value={String(state.id)}>{state.name}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => setShowModal(false)}
                disabled={modalLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-70"
                disabled={modalLoading || destinationName.trim().length === 0 || !stateId}
              >
                {modalLoading ? 'Guardando...' : editDestination ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </BaseModal>
      )}
      <ConfirmModal
        open={confirmOpen}
        title="Eliminar locación"
        message="¿Seguro que deseas eliminar esta locación?"
        onConfirm={confirmDelete}
        onCancel={() => { setConfirmOpen(false); setDestinationToDelete(null); }}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default DestinationAdminPage;
