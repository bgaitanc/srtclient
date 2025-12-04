import { useState } from 'react';
import { useGetAllStatesQuery, useCreateStateMutation, useUpdateStateMutation, useDeleteStateMutation } from '../shared/services/state.service';
import { useGetAllCountriesQuery } from '../shared/services/countries.service';
import { toast } from 'react-hot-toast';
import type { States } from '../shared/types/states.types';
import type { Country } from '../shared/types/countries.types';

export function useStatesAdmin() {
  const { data: countriesData } = useGetAllCountriesQuery();
  const countries: Country[] = (countriesData?.data ?? []).filter(c => c.active !== false);
  const [selectedCountryId, setSelectedCountryId] = useState<string | ''>('');
  const { data, isLoading, error, refetch } = useGetAllStatesQuery(selectedCountryId ? { countryId: selectedCountryId } : {});
  const states: States[] = (data?.data ?? []).filter(d => d.active !== false);
  const [showModal, setShowModal] = useState(false);
  const [editState, setEditState] = useState<States | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [stateToDelete, setStateToDelete] = useState<string | null>(null);
  const [createState] = useCreateStateMutation();
  const [updateState] = useUpdateStateMutation();
  const [deleteState] = useDeleteStateMutation();
  const [modalLoading, setModalLoading] = useState(false);
  const [stateName, setStateName] = useState('');
  const [countryId, setCountryId] = useState<string | ''>('');

  const handleCreate = () => {
    setEditState(null);
    setStateName('');
    setCountryId('');
    setShowModal(true);
  };

  const handleEdit = (state: States) => {
    setEditState(state);
    setStateName(state.name);
    setCountryId(String(state.countryId));
    setShowModal(true);
  };

  const handleDelete = (stateId: string) => {
    setStateToDelete(stateId);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (stateToDelete == null) return;
    setConfirmOpen(false);
    try {
      await deleteState(stateToDelete as string).unwrap();
      toast.success('Departamento eliminado correctamente');
      refetch();
    } catch {
      toast.error('Error al eliminar el departamento');
    } finally {
      setStateToDelete(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    try {
      if (editState && editState.id) {
        await updateState({ id: editState.id, stateName: stateName, countryId: countryId as string }).unwrap();
        toast.success('Departamento actualizado');
      } else {
        await createState({ stateName: stateName, countryId: countryId as string }).unwrap();
        toast.success('Departamento creado');
      }
      setShowModal(false);
      refetch();
    } catch {
      toast.error('Error al guardar el departamento');
    } finally {
      setModalLoading(false);
    }
  };

  return {
    countries, selectedCountryId, setSelectedCountryId,
    states, isLoading, error, refetch,
    showModal, setShowModal,
    editState, setEditState,
    confirmOpen, setConfirmOpen,
    stateToDelete, setStateToDelete,
    stateName, setStateName,
    countryId, setCountryId,
    modalLoading, setModalLoading,
    handleCreate, handleEdit, handleDelete,
    confirmDelete, handleSubmit
  };
}
