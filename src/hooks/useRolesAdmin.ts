import { useMemo, useState } from 'react';
import { useGetAllRolesQuery, useCreateRoleMutation, useUpdateRoleMutation, useDeleteRoleMutation } from '../shared/services/roles.service';
import type { Role } from '../shared/types/roles.types';
import { toast } from 'react-hot-toast';

export function useRolesAdmin() {
  const { data, isLoading, error, refetch } = useGetAllRolesQuery();
  const roles: Role[] = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? (data as Role[]) : (data as { data?: Role[] }).data ?? [];
  }, [data]);

  const [showModal, setShowModal] = useState(false);
  const [editRole, setEditRole] = useState<Role | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');

  const [createRole] = useCreateRoleMutation();
  const [updateRole] = useUpdateRoleMutation();
  const [deleteRole] = useDeleteRoleMutation();

  const filteredRoles = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return roles;
    return roles.filter(r => r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q));
  }, [roles, search]);

  const handleCreate = () => {
    setEditRole(null);
    setName('');
    setShowModal(true);
  };

  const handleEdit = (role: Role) => {
    setEditRole(role);
    setName(role.name);
    setShowModal(true);
  };

  const handleDelete = (role: Role) => {
    setRoleToDelete(role);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!roleToDelete) return;
    setConfirmOpen(false);
    try {
      await deleteRole({ id: roleToDelete.id }).unwrap();
      toast.success('Rol eliminado');
      refetch();
    } catch {
      toast.error('Error al eliminar el rol');
    } finally {
      setRoleToDelete(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    try {
      if (editRole) {
        await updateRole({ id: editRole.id, name }).unwrap();
        toast.success('Rol actualizado');
      } else {
        await createRole({ name }).unwrap();
        toast.success('Rol creado');
      }
      setShowModal(false);
      refetch();
    } catch {
      toast.error('Error al guardar el rol');
    } finally {
      setModalLoading(false);
    }
  };

  return {
    roles, filteredRoles, isLoading, error, refetch,
    showModal, setShowModal,
    editRole, setEditRole,
    confirmOpen, setConfirmOpen,
    roleToDelete, setRoleToDelete,
    modalLoading, setModalLoading,
    name, setName,
    search, setSearch,
    handleCreate, handleEdit, handleDelete,
    confirmDelete, handleSubmit,
  };
}
