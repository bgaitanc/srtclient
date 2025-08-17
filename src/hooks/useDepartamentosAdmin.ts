import { useState } from 'react';
import { useGetAllDepartamentosQuery, useCreateDepartamentoMutation, useUpdateDepartamentoMutation, useDeleteDepartamentoMutation } from '../shared/services/departamentos.service';
import { useGetAllPaisesQuery } from '../shared/services/paises.service';
import { toast } from 'react-hot-toast';
import type { Departamento } from '../shared/types/departamento.types';
import type { Pais } from '../shared/types/pais.types';

export function useDepartamentosAdmin() {
  const { data: paisesData } = useGetAllPaisesQuery();
  const paises: Pais[] = (paisesData?.data ?? []).filter(p => p.activo !== false);
  const [selectedPaisId, setSelectedPaisId] = useState<number | ''>('');
  const { data, isLoading, error, refetch } = useGetAllDepartamentosQuery(selectedPaisId ? { paisId: selectedPaisId } : {});
  const departamentos: Departamento[] = (data?.data ?? []).filter(d => d.activo !== false);
  const [showModal, setShowModal] = useState(false);
  const [editDepartamento, setEditDepartamento] = useState<Departamento | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [departamentoToDelete, setDepartamentoToDelete] = useState<number | null>(null);
  const [createDepartamento] = useCreateDepartamentoMutation();
  const [updateDepartamento] = useUpdateDepartamentoMutation();
  const [deleteDepartamento] = useDeleteDepartamentoMutation();
  const [modalLoading, setModalLoading] = useState(false);
  const [departamentoName, setDepartamentoName] = useState('');
  const [paisId, setPaisId] = useState<number | ''>('');

  const handleCreate = () => {
    setEditDepartamento(null);
    setDepartamentoName('');
    setPaisId('');
    setShowModal(true);
  };

  const handleEdit = (departamento: Departamento) => {
    setEditDepartamento(departamento);
    setDepartamentoName(departamento.departamentoName);
    setPaisId(departamento.paisId);
    setShowModal(true);
  };

  const handleDelete = (departamentoId: number) => {
    setDepartamentoToDelete(departamentoId);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (departamentoToDelete == null) return;
    setConfirmOpen(false);
    try {
      await deleteDepartamento(departamentoToDelete).unwrap();
      toast.success('Departamento eliminado correctamente');
      refetch();
    } catch {
      toast.error('Error al eliminar el departamento');
    } finally {
      setDepartamentoToDelete(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    try {
      if (editDepartamento) {
        await updateDepartamento({ departamentoId: editDepartamento.departamentoId, departamentoName, paisId: Number(paisId) }).unwrap();
        toast.success('Departamento actualizado');
      } else {
        await createDepartamento({ departamentoName, paisId: Number(paisId) }).unwrap();
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
    paises, selectedPaisId, setSelectedPaisId,
    departamentos, isLoading, error, refetch,
    showModal, setShowModal,
    editDepartamento, setEditDepartamento,
    confirmOpen, setConfirmOpen,
    departamentoToDelete, setDepartamentoToDelete,
    departamentoName, setDepartamentoName,
    paisId, setPaisId,
    modalLoading, setModalLoading,
    handleCreate, handleEdit, handleDelete,
    confirmDelete, handleSubmit
  };
}
