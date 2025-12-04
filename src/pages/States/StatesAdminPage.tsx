import ConfirmModal from '../../components/shared/ConfirmModal';
import React, { useMemo, useState } from 'react';
import BaseModal from '../../components/shared/BaseModal';
import { useStatesAdmin } from '../../hooks/useStatesAdmin';
import { Toaster } from 'react-hot-toast';

const StatesAdminPage: React.FC = () => {
  const {
  countries, selectedCountryId, setSelectedCountryId,
  states, isLoading, error,
  showModal, setShowModal,
  editState,
  confirmOpen, setConfirmOpen,
  setStateToDelete,
  stateName, setStateName,
  countryId, setCountryId,
  modalLoading,
  handleCreate, handleEdit, handleDelete,
  confirmDelete, handleSubmit
  } = useStatesAdmin();

  const [search, setSearch] = useState('');
  const filteredStates = useMemo(() => {
    const q = search.trim().toLowerCase();
    const byCountry = selectedCountryId ? (s: any) => String(s.countryId) === selectedCountryId : () => true;
    return states.filter(s => byCountry(s)).filter(s => {
      const name = (s.name ?? '').toLowerCase();
      const idStr = String(s.id ?? '').toLowerCase();
      return !q || name.includes(q) || idStr.includes(q);
    });
  }, [states, search, selectedCountryId]);

  return (
    <div className="min-h-screen py-10">
      <Toaster position="top-right" />
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-blue-700">Gestión de departamentos</h1>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow transition cursor-pointer"
            onClick={handleCreate}
            disabled={modalLoading}
          >
            Crear departamento
          </button>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre o ID"
              className="w-64 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <span className="text-sm text-gray-500">{filteredStates.length} resultados</span>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-700">Filtrar por país</label>
              <select
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={selectedCountryId}
              onChange={e => setSelectedCountryId(e.target.value)}
            >
              <option value="">Todos</option>
              {countries.map(country => (
                  <option key={country.id} value={String(country.id)}>{country.name}</option>
              ))}
            </select>
          </div>
        </div>
        {isLoading && <div className="text-blue-600 text-base font-medium">Cargando departamentos...</div>}
        {error && (
          <div className="text-red-600 text-base font-medium">Ocurrió un error al cargar los departamentos.</div>
        )}
        <div className="w-full">
          <div className="overflow-x-auto rounded-xl border border-blue-100 shadow-sm">
            <table className="w-full bg-white">
              <thead>
                <tr className="bg-blue-50 text-blue-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Nombre</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">País</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredStates.map((state) => (
                  <tr key={state.id} className="border-t border-blue-100 hover:bg-blue-50/40">
                    <td className="px-4 py-3 text-sm text-gray-700">{state.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{state.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{countries.find(c => c.id === state.countryId)?.name}</td>
                    <td className="px-4 py-3 text-sm text-right">
                      <div className="inline-flex gap-2">
                        <button
                          className="text-yellow-500 font-semibold px-3 py-2 rounded-lg cursor-pointer"
                          onClick={() => handleEdit(state)}
                        >
                          Editar
                        </button>
                        <button
                          className="text-red-600 font-semibold px-3 py-2 rounded-lg cursor-pointer"
                          onClick={() => handleDelete(state.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredStates.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-center text-gray-500" colSpan={4}>No hay departamentos registrados.</td>
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
              <h2 className="text-xl font-bold text-blue-700">{editState ? 'Editar departamento' : 'Nuevo departamento'}</h2>
              <p className="text-sm text-gray-500 mt-1">Completa la información y guarda los cambios.</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del departamento</label>
              <input
                type="text"
                value={stateName}
                onChange={e => setStateName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ej. Cortés"
                required
                disabled={modalLoading}
              />
              <p className="mt-1 text-xs text-gray-400">Usa el nombre oficial del departamento.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={countryId ?? ''}
                onChange={e => setCountryId(e.target.value)}
                required
                disabled={modalLoading}
              >
                <option value="">Selecciona un país</option>
                {countries.map(country => (
                  <option key={country.id} value={String(country.id)}>{country.name}</option>
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
                disabled={modalLoading || stateName.trim().length === 0 || !countryId}
              >
                {modalLoading ? 'Guardando...' : editState ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </BaseModal>
      )}
      <ConfirmModal
        open={confirmOpen}
        title="Eliminar departamento"
        message="¿Seguro que deseas eliminar este departamento?"
        onConfirm={confirmDelete}
        onCancel={() => { setConfirmOpen(false); setStateToDelete(null); }}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default StatesAdminPage;
