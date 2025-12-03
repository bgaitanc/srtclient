import { useState } from 'react';
import { useActiveCountries, useCountryMutations } from './useActiveCountries';
import { showSuccess, showError } from '../shared/utils/toast.utils';
import type { Country } from '../shared/types/countries.types';

export function useCountriesAdmin() {
  const { countries, isLoading, error, refetch } = useActiveCountries();
  const { createCountry, updateCountry, deleteCountry } = useCountryMutations();
  const [showModal, setShowModal] = useState(false);
  const [editCountry, setEditCountry] = useState<Country | undefined>(undefined);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [countryToDelete, setCountryToDelete] = useState<number | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  const handleCreate = () => {
    setEditCountry(undefined);
    setShowModal(true);
  };

  const handleEdit = (country: Country) => {
    setEditCountry(country);
    setShowModal(true);
  };

  const handleDelete = (countryId: number) => {
    setCountryToDelete(countryId);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (countryToDelete == null) return;
    setConfirmOpen(false);
    setModalLoading(true);
    try {
      await deleteCountry(countryToDelete).unwrap();
      showSuccess('País eliminado correctamente');
      refetch();
    } catch (error: any) {
      showError(error?.data?.message || 'Error al eliminar el país');
    } finally {
      setCountryToDelete(null);
      setModalLoading(false);
    }
  };

  const handleSubmit = async (data: { countryName: string; countryId?: number }) => {
    setModalLoading(true);
    try {
      if (editCountry && data.countryId) {
        await updateCountry({ countryId: data.countryId, countryName: data.countryName }).unwrap();
        showSuccess('País actualizado');
      } else {
        await createCountry({ countryName: data.countryName }).unwrap();
        showSuccess('País creado');
      }
      setShowModal(false);
      refetch();
    } catch (error: any) {
      showError(error?.data?.message || 'Error al guardar el país');
    } finally {
      setModalLoading(false);
    }
  };

  return {
    countries, isLoading, error, refetch,
    showModal, setShowModal,
    editCountry, setEditCountry,
    confirmOpen, setConfirmOpen,
    countryToDelete, setCountryToDelete,
    modalLoading, setModalLoading,
    handleCreate, handleEdit, handleDelete,
    confirmDelete, handleSubmit
  };
}
