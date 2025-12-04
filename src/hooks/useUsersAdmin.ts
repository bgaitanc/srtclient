import { useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  useGetUserInfoQuery,
  useGetUserRolesQuery,
  useAssignUserRoleMutation,
  useRemoveUserRoleMutation,
  useGetAllUsersQuery,
} from '../shared/services/users.service';
import { useGetAllRolesQuery } from '../shared/services/roles.service';

export function useUsersAdmin() {
  const { data: infoResp, refetch: refetchInfo } = useGetUserInfoQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const currentUser = infoResp?.data;

  const { data: allUsersResp, refetch: refetchAllUsers } = useGetAllUsersQuery();
  const users = useMemo(() => allUsersResp?.data ?? [], [allUsersResp]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const selectedUser = useMemo(() => users.find((u: any) => u.id === selectedUserId), [users, selectedUserId]);
  const [search, setSearch] = useState('');
  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u: any) =>
      (u.username?.toLowerCase().includes(q)) ||
      (`${u.name ?? ''} ${u.surname ?? ''}`.toLowerCase().includes(q))
    );
  }, [users, search]);
  const { data: rolesResp, refetch: refetchRoles } = useGetUserRolesQuery(selectedUserId, { skip: !selectedUserId });
  const userRoles: string[] = useMemo(() => rolesResp?.data ?? [], [rolesResp]);

  const { data: allRolesResp } = useGetAllRolesQuery();
  const allRoles = useMemo(() => (Array.isArray(allRolesResp) ? allRolesResp : allRolesResp?.data ?? []), [allRolesResp]);

  const [assignRole] = useAssignUserRoleMutation();
  const [removeRole] = useRemoveUserRoleMutation();

  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [roleId, setRoleId] = useState('');

  const openAssignModal = (userId: string) => {
    setSelectedUserId(userId);
    setRoleId('');
    setShowModal(true);
  };

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId || !roleId) {
      toast.error('Selecciona usuario y rol');
      return;
    }
    setModalLoading(true);
    try {
      await assignRole({ userId: selectedUserId, roleId }).unwrap();
      toast.success('Rol asignado');
      setShowModal(false);
      refetchRoles();
      refetchInfo();
      refetchAllUsers();
    } catch {
      toast.error('Error al asignar rol');
    } finally {
      setModalLoading(false);
    }
  };

  const handleRemove = async (userId: string, roleIdToRemove: string) => {
    try {
      await removeRole({ userId, roleId: roleIdToRemove }).unwrap();
      toast.success('Rol removido');
      refetchRoles();
      refetchInfo();
      refetchAllUsers();
    } catch {
      toast.error('Error al remover rol');
    }
  };

  return {
    currentUser,
    users,
    filteredUsers,
    search, setSearch,
    selectedUserId, setSelectedUserId,
    selectedUser,
    userRoles,
    allRoles,
    showModal, setShowModal,
    modalLoading,
    roleId, setRoleId,
    openAssignModal,
    handleAssign,
    handleRemove,
  };
}
