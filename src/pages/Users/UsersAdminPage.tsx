import React from 'react';
import BaseModal from '../../components/shared/BaseModal';
import { useUsersAdmin } from '../../hooks/useUsersAdmin';
import { Toaster } from 'react-hot-toast';

const UsersAdminPage: React.FC = () => {
  const {
    currentUser,
    filteredUsers,
    search, setSearch,
    selectedUser,
    setSelectedUserId,
    allRoles,
    userRoles,
    showModal, setShowModal,
    modalLoading,
    roleId, setRoleId,
    openAssignModal,
    handleAssign,
  } = useUsersAdmin();

  return (
    <div className="min-h-screen py-10">
      <Toaster position="top-right" />
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-blue-700">Gestión de usuarios</h1>
        </div>
        <div className="mb-6">
          <div className="rounded-xl border border-blue-100 p-4 bg-white">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">Usuario actual</h2>
            {(selectedUser ?? currentUser) ? (
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <div><span className="font-medium">ID:</span> {(selectedUser ?? currentUser)?.id}</div>
                <div><span className="font-medium">Usuario:</span> {(selectedUser ?? currentUser)?.username}</div>
                <div><span className="font-medium">Nombre:</span> {(selectedUser ?? currentUser)?.name} {(selectedUser ?? currentUser)?.surname}</div>
                <div><span className="font-medium">Email:</span> {(selectedUser ?? currentUser)?.email}</div>
                <div className="col-span-2"><span className="font-medium">Teléfono:</span> {(selectedUser ?? currentUser)?.phoneNumber || '—'}</div>
                <div className="col-span-2"><span className="font-medium">Roles:</span> {(selectedUser ?? currentUser)?.roles?.join(', ') || '—'}</div>
              </div>
            ) : (
              <div className="text-gray-500">No hay información del usuario.</div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-blue-700">Usuarios</h2>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre o usuario"
              className="w-72 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <span className="text-sm text-gray-500">{filteredUsers.length} resultados</span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-blue-100 shadow-sm">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-blue-50 text-blue-700">
                <th className="px-4 py-3 text-left text-sm font-semibold">Usuario</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Nombre</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Roles</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u: any) => (
                <tr key={u.id} className="border-t border-blue-100 hover:bg-blue-50/40">
                  <td className="px-4 py-3 text-sm text-gray-900">{u.username}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{u.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{u.name} {u.surname}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{Array.isArray(u.roles) ? u.roles.join(', ') : '—'}</td>
                  <td className="px-4 py-3 text-sm text-right">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-2 rounded-lg"
                      onClick={() => { setSelectedUserId(u.id); openAssignModal(u.id); }}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-500" colSpan={5}>No hay usuarios.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <BaseModal open={true} onClose={modalLoading ? undefined : () => setShowModal(false)} maxWidth="max-w-md">
          <div className="mb-3">
            <h2 className="text-xl font-bold text-blue-700">Asignar rol</h2>
            <p className="text-sm text-gray-500 mt-1">Selecciona un rol para el usuario.</p>
          </div>
          <form onSubmit={handleAssign} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
              <select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                disabled={modalLoading}
              >
                <option value="" disabled>Selecciona un rol</option>
                {allRoles
                  .filter((role: any) => !(Array.isArray(userRoles) && userRoles.includes(role.name)))
                  .map((role: any) => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => setShowModal(false)}
                disabled={modalLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-70"
                disabled={modalLoading || !roleId}
              >
                {modalLoading ? 'Guardando...' : 'Asignar'}
              </button>
            </div>
          </form>
        </BaseModal>
      )}
    </div>
  );
};

export default UsersAdminPage;
