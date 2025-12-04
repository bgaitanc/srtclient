import { useState } from 'react';
import { useGetAllDestinationsQuery, useCreateDestinationMutation, useUpdateDestinationMutation, useDeleteDestinationMutation } from '../shared/services/destinations.service';
import { useGetAllStatesQuery } from '../shared/services/state.service';
import { toast } from 'react-hot-toast';
import type { Destination } from '../shared/types/destination.types';
import type { States } from '../shared/types/states.types';

export function useDestinationAdmin() {
  const { data: statesData } = useGetAllStatesQuery({});
  const states: States[] = (statesData?.data ?? []).filter(d => d.active !== false);
  const [selectedStateId, setSelectedStateId] = useState<string | ''>('');
  const { data, isLoading, error, refetch } = useGetAllDestinationsQuery(selectedStateId ? { stateId: selectedStateId } : {});
  const destinations: Destination[] = (data?.data ?? []).filter(l => l.active !== false);
  const [showModal, setShowModal] = useState(false);
  const [editDestination, setEditDestination] = useState<Destination | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [destinationToDelete, setDestinationToDelete] = useState<string | null>(null);
  const [createDestination] = useCreateDestinationMutation();
  const [updateDestination] = useUpdateDestinationMutation();
  const [deleteDestination] = useDeleteDestinationMutation();
  const [modalLoading, setModalLoading] = useState(false);
  const [destinationName, setDestinationName] = useState('');
  const [stateId, setStateId] = useState<string | ''>('');

  const handleCreate = () => {
    setEditDestination(null);
    setDestinationName('');
    setStateId('');
    setShowModal(true);
  };

  const handleEdit = (destination: Destination) => {
    setEditDestination(destination);
    setDestinationName(destination.destinationName);
    setStateId(String(destination.stateId));
    setShowModal(true);
  };

  const handleDelete = (destinationId: string) => {
    setDestinationToDelete(destinationId);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (destinationToDelete == null) return;
    setConfirmOpen(false);
    try {
      await deleteDestination(destinationToDelete as string).unwrap();
      toast.success('Locación eliminada correctamente');
      refetch();
    } catch {
      toast.error('Error al eliminar la locación');
    } finally {
      setDestinationToDelete(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    try {
      if (editDestination) {
        await updateDestination({ destinationId: editDestination.destinationId, destinationName, stateId: stateId as string }).unwrap();
        toast.success('Locación actualizada');
      } else {
        await createDestination({ destinationName, stateId: stateId as string }).unwrap();
        toast.success('Locación creada');
      }
      setShowModal(false);
      refetch();
    } catch {
      toast.error('Error al guardar la locación');
    } finally {
      setModalLoading(false);
    }
  };

  return {
    states, selectedStateId, setSelectedStateId,
    destinations, isLoading, error, refetch,
    showModal, setShowModal,
    editDestination, setEditDestination,
    confirmOpen, setConfirmOpen,
    destinationToDelete, setDestinationToDelete,
    destinationName, setDestinationName,
    stateId, setStateId,
    modalLoading, setModalLoading,
    handleCreate, handleEdit, handleDelete,
    confirmDelete, handleSubmit
  };
}
