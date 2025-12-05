import { useState } from 'react';
import { useGetAllVehiclesQuery, useCreateVehicleMutation, useUpdateVehicleMutation } from '../shared/services/vehicles.service';
import { toast } from 'react-hot-toast';
import type { Vehicle } from '../shared/types/vehicles.types';

export function useVehiclesAdmin() {
  const { data, isLoading, error, refetch } = useGetAllVehiclesQuery();
  const vehicles: Vehicle[] = data?.data ?? [];
  const [showModal, setShowModal] = useState(false);
  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);
  const [createVehicle] = useCreateVehicleMutation();
  const [updateVehicle] = useUpdateVehicleMutation();
  const [modalLoading, setModalLoading] = useState(false);
  const [registrationPlate, setRegistrationPlate] = useState('');
  const [model, setModel] = useState('');
  const [capacity, setCapacity] = useState<number | ''>('');

  const handleCreate = () => {
    setEditVehicle(null);
    setRegistrationPlate('');
    setModel('');
    setCapacity('');
    setShowModal(true);
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditVehicle(vehicle);
    setRegistrationPlate(vehicle.registrationPlate);
    setModel(vehicle.model);
    setCapacity(vehicle.capacity);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (capacity === '' || isNaN(Number(capacity))) {
      toast.error('Capacidad inválida');
      return;
    }
    setModalLoading(true);
    try {
      if (editVehicle) {
        await updateVehicle({ vehicleId: editVehicle.vehicleId, registrationPlate, model, capacity: Number(capacity) }).unwrap();
        toast.success('Vehículo actualizado');
      } else {
        await createVehicle({ registrationPlate, model, capacity: Number(capacity) }).unwrap();
        toast.success('Vehículo creado');
      }
      setShowModal(false);
      refetch();
    } catch {
      toast.error('Error al guardar el vehículo');
    } finally {
      setModalLoading(false);
    }
  };

  return {
    vehicles, isLoading, error, refetch,
    showModal, setShowModal,
    editVehicle, setEditVehicle,
    modalLoading, setModalLoading,
    registrationPlate, setRegistrationPlate,
    model, setModel,
    capacity, setCapacity,
    handleCreate, handleEdit, handleSubmit,
  };
}
