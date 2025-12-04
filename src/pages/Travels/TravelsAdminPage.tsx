import React from 'react';
import BaseModal from '../../components/shared/BaseModal';
import { useTravelsAdmin } from '../../hooks/useTravelsAdmin';
import { Toaster } from 'react-hot-toast';

const TravelsAdminPage: React.FC = () => {
  const {
    travels, isLoading,
    showModal, setShowModal,
    modalLoading,
    routeId, setRouteId,
    vehicleId, setVehicleId,
    driverId, setDriverId,
    price, setPrice,
    departureDate, setDepartureDate,
    arrivalDate, setArrivalDate,
    routes, vehicles,
    drivers,
    handleCreate, handleSubmit,
  } = useTravelsAdmin();

  return (
    <div className="min-h-screen py-10">
      <Toaster position="top-right" />
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-blue-700">Gestión de viajes</h1>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow transition"
            onClick={handleCreate}
            disabled={modalLoading}
          >
            Crear viaje
          </button>
        </div>
        {isLoading && <div className="text-blue-600 text-base font-medium mb-3">Cargando viajes...</div>}
        <div className="w-full">
          <div className="overflow-x-auto rounded-xl border border-blue-100 shadow-sm">
            <table className="w-full bg-white">
              <thead>
                <tr className="bg-blue-50 text-blue-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold">Ruta</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Vehículo</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Conductor</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Precio</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Salida</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Llegada</th>
                </tr>
              </thead>
              <tbody>
                {travels.map((t) => (
                  <tr key={t.travelId} className="border-t border-blue-100 hover:bg-blue-50/40">
                    <td className="px-4 py-3 text-sm text-gray-900">{t.route?.originDestination} → {t.route?.finalDestination}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{t.vehicle?.registrationPlate} ({t.vehicle?.model})</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{t.driver?.name} {t.driver?.surname}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">${t.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{new Date(t.departureDate).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{new Date(t.arrivalDate).toLocaleString()}</td>
                  </tr>
                ))}
                {travels.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>No hay viajes registrados.</td>
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
              <h2 className="text-xl font-bold text-blue-700">Nuevo viaje</h2>
              <p className="text-sm text-gray-500 mt-1">Completa la información y guarda los cambios.</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ruta</label>
              <select
                value={routeId}
                onChange={e => setRouteId(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                disabled={modalLoading}
              >
                <option value="" disabled>Selecciona una ruta</option>
                {routes.map(r => (
                  <option key={r.routeId} value={r.routeId}>
                    {r.originDestinationName} → {r.finalDestinationName} ({r.distanceInKm} km)
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehículo</label>
                <select
                  value={vehicleId}
                  onChange={e => setVehicleId(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                  disabled={modalLoading}
                >
                  <option value="" disabled>Selecciona un vehículo</option>
                  {vehicles.map(v => (
                    <option key={v.vehicleId} value={v.vehicleId}>
                      {v.registrationPlate} ({v.model})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Conductor</label>
                <select
                  value={driverId}
                  onChange={e => setDriverId(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                  disabled={modalLoading}
                >
                  <option value="" disabled>Selecciona un conductor</option>
                  {drivers.map((d: any) => (
                    <option key={d.id} value={d.id}>
                      {d.name} {d.surname}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Ej. 10.00"
                  required
                  disabled={modalLoading}
                  min={0}
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salida</label>
                <input
                  type="datetime-local"
                  value={departureDate}
                  onChange={e => setDepartureDate(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                  disabled={modalLoading}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Llegada</label>
              <input
                type="datetime-local"
                value={arrivalDate}
                onChange={e => setArrivalDate(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                disabled={modalLoading}
              />
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
                disabled={modalLoading || !routeId || !vehicleId || !driverId || price === '' || !departureDate || !arrivalDate}
              >
                {modalLoading ? 'Guardando...' : 'Crear'}
              </button>
            </div>
          </form>
        </BaseModal>
      )}
    </div>
  );
};

export default TravelsAdminPage;
