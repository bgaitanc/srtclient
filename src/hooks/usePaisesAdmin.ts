import { useState } from 'react';
import { useActivePaises, usePaisMutations } from './paises.hooks';
import { showSuccess, showError } from '../shared/utils/toast.utils';
import type { Pais } from '../shared/types/pais.types';

export function usePaisesAdmin() {
  const { paises, isLoading, error, refetch } = useActivePaises();
  const { createPais, updatePais, deletePais } = usePaisMutations();
  const [showModal, setShowModal] = useState(false);
  const [editPais, setEditPais] = useState<Pais | undefined>(undefined);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [paisToDelete, setPaisToDelete] = useState<number | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  const handleCreate = () => {
    setEditPais(undefined);
    setShowModal(true);
  };

  const handleEdit = (pais: Pais) => {
    setEditPais(pais);
    setShowModal(true);
  };

  const handleDelete = (paisId: number) => {
    setPaisToDelete(paisId);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (paisToDelete == null) return;
    setConfirmOpen(false);
    setModalLoading(true);
    try {
      await deletePais(paisToDelete).unwrap();
      showSuccess('País eliminado correctamente');
      refetch();
    } catch (error: any) {
      showError(error?.data?.message || 'Error al eliminar el país');
    } finally {
      setPaisToDelete(null);
      setModalLoading(false);
    }
  };

  const handleSubmit = async (data: { paisName: string; paisId?: number }) => {
    setModalLoading(true);
    try {
      if (editPais && data.paisId) {
        await updatePais({ paisId: data.paisId, paisName: data.paisName }).unwrap();
        showSuccess('País actualizado');
      } else {
        await createPais({ paisName: data.paisName }).unwrap();
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
    paises, isLoading, error, refetch,
    showModal, setShowModal,
    editPais, setEditPais,
    confirmOpen, setConfirmOpen,
    paisToDelete, setPaisToDelete,
    modalLoading, setModalLoading,
    handleCreate, handleEdit, handleDelete,
    confirmDelete, handleSubmit
  };
}
