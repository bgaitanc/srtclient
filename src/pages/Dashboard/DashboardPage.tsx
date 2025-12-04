import React, { useMemo } from 'react';
import CircularLoading from '@components/Loading/CircularLoading.tsx';
import { useGetAllCountriesQuery } from '@services/countries.service.ts';
import { useGetAllStatesQuery } from '@services/state.service.ts';
import { useGetAllDestinationsQuery } from '@services/destinations.service.ts';
import { useGetAllRoutesQuery } from '@services/routes.service.ts';
import { useGetAllTravelsQuery } from '@services/travels.service.ts';

const DashboardPage: React.FC = () => {
  const { data: countriesData, isLoading: loadingCountries } = useGetAllCountriesQuery();
  const { data: statesData, isLoading: loadingStates } = useGetAllStatesQuery({});
  const { data: destinationsData, isLoading: loadingDestinations } = useGetAllDestinationsQuery({});
  const { data: routesData, isLoading: loadingRoutes } = useGetAllRoutesQuery();
  const { data: travelsData, isLoading: loadingTravels } = useGetAllTravelsQuery();

  const isLoading = useMemo(
    () => loadingCountries || loadingStates || loadingDestinations || loadingRoutes || loadingTravels,
    [loadingCountries, loadingStates, loadingDestinations, loadingRoutes, loadingTravels]
  );

  const kpis = useMemo(() => {
    const countries = (countriesData?.data ?? []).filter((c: any) => c.active !== false).length;
    const states = (statesData?.data ?? []).filter((s: any) => s.active !== false).length;
    const destinations = (destinationsData?.data ?? []).filter((d: any) => d.active !== false).length;
    const routes = (routesData?.data ?? []).length;
    const travels = (travelsData?.data ?? []).length;
    return { countries, states, destinations, routes, travels };
  }, [countriesData, statesData, destinationsData, routesData, travelsData]);

  const recentRoutes = useMemo(() => {
    const list = (routesData?.data ?? []);
    return list.slice(0, 5);
  }, [routesData]);

  return (
    <>
      <CircularLoading show={isLoading} />
      <div className="min-h-screen p-6">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-blue-700">Panel de control</h1>
            {isLoading && <span className="text-sm text-gray-500">Cargando estadísticas...</span>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <KpiCard title="Países" value={kpis.countries} color="bg-blue-600" />
            <KpiCard title="Departamentos" value={kpis.states} color="bg-indigo-600" />
            <KpiCard title="Destinos" value={kpis.destinations} color="bg-cyan-600" />
            <KpiCard title="Rutas" value={kpis.routes} color="bg-teal-600" />
            <KpiCard title="Viajes" value={kpis.travels} color="bg-emerald-600" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Rutas recientes</h2>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-gray-700">
                      <th className="px-4 py-2 text-left text-sm font-medium">ID</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Origen</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Destino</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Distancia (km)</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Tiempo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRoutes.map((r: any) => (
                      <tr key={r.routeId} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-700">{r.routeId}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{r.originDestinationName}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{r.finalDestinationName}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{r.distanceInKm}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{r.estimatedTime}</td>
                      </tr>
                    ))}
                    {recentRoutes.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-gray-500">Sin datos de rutas.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Actividad</h2>
              <ul className="space-y-3 text-sm text-gray-700">
                <li>Países activos: {(countriesData?.data ?? []).filter((c: any) => c.active !== false).length}</li>
                <li>Departamentos activos: {(statesData?.data ?? []).filter((s: any) => s.active !== false).length}</li>
                <li>Destinos activos: {(destinationsData?.data ?? []).filter((d: any) => d.active !== false).length}</li>
                <li>Total rutas: {(routesData?.data ?? []).length}</li>
                <li>Total viajes: {(travelsData?.data ?? []).length}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const KpiCard: React.FC<{ title: string; value: number; color: string }> = ({ title, value, color }) => (
  <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
    <div className={`w-10 h-10 rounded-lg ${color}`}></div>
    <div>
      <div className="text-sm text-gray-600">{title}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  </div>
);

export default DashboardPage;
