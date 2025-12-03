import ConfirmModal from '../../components/shared/ConfirmModal';
import React from 'react';
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

  return (
    <div className="min-h-screen py-10">
      <Toaster position="top-right" />
      <div className="flex flex-col items-center mb-8 px-4">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2 drop-shadow-lg">Gestión de departamentos</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition duration-300 text-lg tracking-wide mb-4"
          onClick={handleCreate}
        >
          Crear nuevo departamento
        </button>
        <div className="w-full max-w-md mt-4">
          <label className="block text-sm font-semibold mb-1">Filtrar por país</label>
          <select
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={selectedCountryId}
            onChange={e => setSelectedCountryId(e.target.value ? Number(e.target.value) : '')}
          >
            <option value="">Todos</option>
            {countries.map(country => (
              <option key={country.countryId} value={country.countryId}>{country.countryName}</option>
            ))}
          </select>
        </div>
      </div>
      {isLoading && <div className="text-center text-blue-600 text-xl font-semibold">Cargando departamentos...</div>}
      {error && (
        <div className="text-center text-red-600 text-lg font-semibold">Ocurrió un error al cargar los departamentos.</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 max-w-7xl mx-auto">
        {states.map((state) => (
          <div key={state.stateId} className="relative group bg-white rounded-3xl shadow-xl p-8 flex flex-col h-full border border-blue-100">
            <div className="flex flex-col items-center justify-center flex-1">
              <span className="text-xl font-extrabold text-blue-700 mb-2">{state.stateName}</span>
              <span className="text-sm text-gray-500">{countries.find(c => c.countryId === state.countryId)?.countryName}</span>
            </div>
            <div className="mt-auto w-full flex justify-center gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl shadow transition duration-200"
                onClick={() => handleEdit(state)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-xl shadow transition duration-200"
                onClick={() => handleDelete(state.stateId)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <BaseModal open={true} onClose={() => setShowModal(false)} maxWidth="max-w-md">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">{editState ? 'Editar departamento' : 'Nuevo departamento'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Nombre del departamento</label>
              <input
                type="text"
                value={stateName}
                onChange={e => setStateName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">País</label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={countryId}
                onChange={e => setCountryId(Number(e.target.value))}
                required
              >
                <option value="">Selecciona un país</option>
                {countries.map(country => (
                  <option key={country.countryId} value={country.countryId}>{country.countryName}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
              disabled={modalLoading}
            >
              {modalLoading ? 'Guardando...' : editState ? 'Actualizar' : 'Crear'}
            </button>
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
