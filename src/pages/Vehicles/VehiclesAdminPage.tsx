import React from 'react';
import BaseModal from '../../components/shared/BaseModal';
import { useVehiclesAdmin } from '../../hooks/useVehiclesAdmin';
import { Toaster } from 'react-hot-toast';

const VehiclesAdminPage: React.FC = () => {
  const {
    vehicles, isLoading,
    showModal, setShowModal,
    editVehicle,
    modalLoading,
    registrationPlate, setRegistrationPlate,
    model, setModel,
    capacity, setCapacity,
    handleCreate, handleEdit, handleSubmit,
  } = useVehiclesAdmin();

  return (
    <div className="min-h-screen py-10">
      <Toaster position="top-right" />
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-blue-700">Gestión de vehículos</h1>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow transition cursor-pointer"
            onClick={handleCreate}
            disabled={modalLoading}
          >
            Crear vehículo
          </button>
        </div>
        {isLoading && <div className="text-blue-600 text-base font-medium mb-3">Cargando vehículos...</div>}
        <div className="w-full">
          <div className="overflow-x-auto rounded-xl border border-blue-100 shadow-sm">
            <table className="w-full bg-white">
              <thead>
                <tr className="bg-blue-50 text-blue-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold">Placa</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Modelo</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Capacidad</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr key={v.vehicleId} className="border-t border-blue-100 hover:bg-blue-50/40">
                    <td className="px-4 py-3 text-sm text-gray-900">{v.registrationPlate}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{v.model}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{v.capacity}</td>
                    <td className="px-4 py-3 text-sm text-right">
                      <div className="inline-flex gap-2">
                        <button
                          className="text-yellow-500 font-semibold px-3 py-2 rounded-lg cursor-pointer"
                          onClick={() => handleEdit(v)}
                        >
                          Editar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {vehicles.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-center text-gray-500" colSpan={4}>No hay vehículos registrados.</td>
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
              <h2 className="text-xl font-bold text-blue-700">{editVehicle ? 'Editar vehículo' : 'Nuevo vehículo'}</h2>
              <p className="text-sm text-gray-500 mt-1">Completa la información y guarda los cambios.</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Placa</label>
              <input
                type="text"
                value={registrationPlate}
                onChange={e => setRegistrationPlate(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ej. N1234"
                required
                disabled={modalLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
              <input
                type="text"
                value={model}
                onChange={e => setModel(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ej. Toyota Coaster"
                required
                disabled={modalLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacidad</label>
              <input
                type="number"
                value={capacity}
                onChange={e => setCapacity(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ej. 40"
                required
                disabled={modalLoading}
                min={1}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                onClick={() => setShowModal(false)}
                disabled={modalLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-70"
                disabled={modalLoading || registrationPlate.trim().length === 0 || model.trim().length === 0 || capacity === ''}
              >
                {modalLoading ? 'Guardando...' : editVehicle ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </BaseModal>
      )}
    </div>
  );
};

export default VehiclesAdminPage;
