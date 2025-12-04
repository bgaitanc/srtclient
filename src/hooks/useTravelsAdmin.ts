import { useState } from 'react';
import { useGetAllTravelsQuery, useCreateTravelMutation } from '../shared/services/travels.service';
import { toast } from 'react-hot-toast';
import type { Travel } from '../shared/types/travels.types';

export function useTravelsAdmin() {
  const { data, isLoading, error, refetch } = useGetAllTravelsQuery();
  const travels: Travel[] = data?.data ?? [];
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
    handleCreate, handleSubmit,
  };
}
