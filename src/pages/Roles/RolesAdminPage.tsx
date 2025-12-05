import ConfirmModal from '../../components/shared/ConfirmModal';
import React from 'react';
import BaseModal from '../../components/shared/BaseModal';
import { useRolesAdmin } from '../../hooks/useRolesAdmin';
import { Toaster } from 'react-hot-toast';

const RolesAdminPage: React.FC = () => {
  const {
    roles, filteredRoles, isLoading,
    showModal, setShowModal,
    editRole,
    confirmOpen, setConfirmOpen,
    roleToDelete, setRoleToDelete,
    modalLoading,
    name, setName,
    search, setSearch,
    handleCreate, handleEdit, handleDelete,
    confirmDelete, handleSubmit
  } = useRolesAdmin();

  return (
    <div className="min-h-screen py-10">
      <Toaster position="top-right" />
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-blue-700">Gestión de roles</h1>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow transition cursor-pointer"
            onClick={handleCreate}
            disabled={modalLoading}
          >
            Crear rol
          </button>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por ID o nombre"
              className="w-72 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <span className="text-sm text-gray-500">{filteredRoles.length} resultados</span>
          </div>
        </div>
        {isLoading && <div className="text-blue-600 text-base font-medium">Cargando roles...</div>}
        <div className="w-full">
          <div className="overflow-x-auto rounded-xl border border-blue-100 shadow-sm">
            <table className="w-full bg-white">
              <thead>
                <tr className="bg-blue-50 text-blue-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Nombre</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoles.map((role) => (
                  <tr key={role.id} className="border-t border-blue-100 hover:bg-blue-50/40">
                    <td className="px-4 py-3 text-sm text-gray-700">{role.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{role.name}</td>
                    <td className="px-4 py-3 text-sm text-right">
                      <div className="inline-flex gap-2">
                        <button
                          className="text-yellow-500 font-semibold px-3 py-2 rounded-lg cursor-pointer"
                          onClick={() => handleEdit(role)}
                        >
                          Editar
                        </button>
                        <button
                          className="text-red-500 font-semibold px-3 py-2 rounded-lg cursor-pointer"
                          onClick={() => handleDelete(role)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {roles.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-center text-gray-500" colSpan={3}>No hay roles registrados.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <BaseModal open={true} onClose={modalLoading ? undefined : () => setShowModal(false)} maxWidth="max-w-md">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-xl font-bold text-blue-700">{editRole ? 'Editar rol' : 'Nuevo rol'}</h2>
              <p className="text-sm text-gray-500 mt-1">Asigna un nombre claro y único.</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ej. Administrador"
                required
                disabled={modalLoading}
              />
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
                disabled={modalLoading || name.trim().length === 0}
              >
                {modalLoading ? 'Guardando...' : editRole ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </BaseModal>
      )}

      <ConfirmModal
        open={confirmOpen}
        title="Eliminar rol"
        message={roleToDelete ? `¿Seguro que deseas eliminar el rol "${roleToDelete.name}"?` : '¿Seguro que deseas eliminar este rol?'}
        onConfirm={confirmDelete}
        onCancel={() => { setConfirmOpen(false); setRoleToDelete(null); }}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default RolesAdminPage;
