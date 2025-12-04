import { useMemo, useState } from 'react';
import { useGetAllTravelsQuery, useCreateTravelMutation } from '../shared/services/travels.service';
import { toast } from 'react-hot-toast';
import type { Travel } from '../shared/types/travels.types';
import { useGetAllRoutesQuery } from '../shared/services/routes.service';
import { useGetAllVehiclesQuery } from '../shared/services/vehicles.service';
import { useGetAllUsersQuery } from '../shared/services/users.service';

export function useTravelsAdmin() {
  const { data, isLoading, error, refetch } = useGetAllTravelsQuery();
  const travels: Travel[] = data?.data ?? [];
  const { data: routesResp } = useGetAllRoutesQuery();
  const { data: vehiclesResp } = useGetAllVehiclesQuery();
  const { data: usersResp } = useGetAllUsersQuery();
  const routes = useMemo(() => routesResp?.data ?? [], [routesResp]);
  const vehicles = useMemo(() => vehiclesResp?.data ?? [], [vehiclesResp]);
  const drivers = useMemo(() => {
    const list = usersResp?.data ?? [];
    return list.filter((u: any) => Array.isArray(u.roles) && u.roles.includes('Conductor'));
  }, [usersResp]);
  const [showModal, setShowModal] = useState(false);
  const [createTravel] = useCreateTravelMutation();
  const [modalLoading, setModalLoading] = useState(false);

  const [routeId, setRouteId] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');

  const handleCreate = () => {
    setRouteId('');
    setVehicleId('');
    setDriverId('');
    setPrice('');
    setDepartureDate('');
    setArrivalDate('');
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (price === '' || isNaN(Number(price))) {
      toast.error('Precio inválido');
      return;
    }
    if (!routeId || !vehicleId || !driverId || !departureDate || !arrivalDate) {
      toast.error('Completa todos los campos');
      return;
    }
    setModalLoading(true);
    try {
      await createTravel({
        routeId,
        vehicleId,
        driverId,
        price: Number(price),
        departureDate,
        arrivalDate,
      }).unwrap();
      toast.success('Viaje creado');
      setShowModal(false);
      refetch();
    } catch {
      toast.error('Error al crear el viaje');
    } finally {
      setModalLoading(false);
    }
  };

  return {
    travels, isLoading, error, refetch,
    showModal, setShowModal,
    routeId, setRouteId,
    vehicleId, setVehicleId,
    driverId, setDriverId,
    price, setPrice,
    departureDate, setDepartureDate,
    arrivalDate, setArrivalDate,
    modalLoading, setModalLoading,
    routes, vehicles,
    drivers,
    handleCreate, handleSubmit,
  };
}
