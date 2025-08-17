import { useState } from 'react';
import { useGetAllLocacionesQuery, useCreateLocacionMutation, useUpdateLocacionMutation, useDeleteLocacionMutation } from '../shared/services/locaciones.service';
import { useGetAllDepartamentosQuery } from '../shared/services/departamentos.service';
import { toast } from 'react-hot-toast';
import type { Locacion } from '../shared/types/locacion.types';
import type { Departamento } from '../shared/types/departamento.types';

export function useLocacionesAdmin() {
  const { data: departamentosData } = useGetAllDepartamentosQuery({});
  const departamentos: Departamento[] = (departamentosData?.data ?? []).filter(d => d.activo !== false);
  const [selectedDepartamentoId, setSelectedDepartamentoId] = useState<number | ''>('');
  const { data, isLoading, error, refetch } = useGetAllLocacionesQuery(selectedDepartamentoId ? { departamentoId: selectedDepartamentoId } : {});
  const locaciones: Locacion[] = (data?.data ?? []).filter(l => l.activo !== false);
  const [showModal, setShowModal] = useState(false);
  const [editLocacion, setEditLocacion] = useState<Locacion | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [locacionToDelete, setLocacionToDelete] = useState<number | null>(null);
  const [createLocacion] = useCreateLocacionMutation();
  const [updateLocacion] = useUpdateLocacionMutation();
  const [deleteLocacion] = useDeleteLocacionMutation();
  const [modalLoading, setModalLoading] = useState(false);
  const [locacionName, setLocacionName] = useState('');
  const [departamentoId, setDepartamentoId] = useState<number | ''>('');

  const handleCreate = () => {
    setEditLocacion(null);
    setLocacionName('');
    setDepartamentoId('');
    setShowModal(true);
  };

  const handleEdit = (locacion: Locacion) => {
    setEditLocacion(locacion);
    setLocacionName(locacion.locacionName);
    setDepartamentoId(locacion.departamentoId);
    setShowModal(true);
  };

  const handleDelete = (locacionId: number) => {
    setLocacionToDelete(locacionId);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (locacionToDelete == null) return;
    setConfirmOpen(false);
    try {
      await deleteLocacion(locacionToDelete).unwrap();
      toast.success('Locación eliminada correctamente');
      refetch();
    } catch {
      toast.error('Error al eliminar la locación');
    } finally {
      setLocacionToDelete(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    try {
      if (editLocacion) {
        await updateLocacion({ locacionId: editLocacion.locacionId, locacionName, departamentoId: Number(departamentoId) }).unwrap();
        toast.success('Locación actualizada');
      } else {
        await createLocacion({ locacionName, departamentoId: Number(departamentoId) }).unwrap();
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
    departamentos, selectedDepartamentoId, setSelectedDepartamentoId,
    locaciones, isLoading, error, refetch,
    showModal, setShowModal,
    editLocacion, setEditLocacion,
    confirmOpen, setConfirmOpen,
    locacionToDelete, setLocacionToDelete,
    locacionName, setLocacionName,
    departamentoId, setDepartamentoId,
    modalLoading, setModalLoading,
    handleCreate, handleEdit, handleDelete,
    confirmDelete, handleSubmit
  };
}
