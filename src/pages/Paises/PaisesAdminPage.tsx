import React from 'react';
import { usePaisesAdmin } from '../../hooks/usePaisesAdmin';
import { Toaster } from 'react-hot-toast';
import ConfirmModal from '../../components/shared/ConfirmModal';
import PaisesList from '../../components/Paises/PaisesList';
import PaisFormModal from '../../components/Paises/PaisFormModal';

const PaisesAdminPage: React.FC = () => {
  const {
    paises, isLoading, error,
    showModal, handleCreate, handleEdit, handleDelete,
    editPais, handleSubmit, modalLoading,
    confirmOpen, confirmDelete, setConfirmOpen, setPaisToDelete
  } = usePaisesAdmin();

  return (
    <div className="min-h-screen py-10">
      <Toaster position="top-right" />
      <div className="flex flex-col items-center mb-8 px-4">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2 drop-shadow-lg">Gestión de países</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition duration-300 text-lg tracking-wide mb-4"
          onClick={handleCreate}
          disabled={modalLoading}
        >
          Crear nuevo país
        </button>
      </div>
      {isLoading && <div className="text-center text-blue-600 text-xl font-semibold">Cargando países...</div>}
      {error && (
        <div className="text-center text-red-600 text-lg font-semibold">Ocurrió un error al cargar los países.</div>
      )}
      <PaisesList paises={paises} onEdit={handleEdit} onDelete={handleDelete} />
      {showModal && (
        <PaisFormModal
          initialData={editPais}
          onSubmit={handleSubmit}
          onClose={handleCreate}
          loading={modalLoading}
          isEdit={!!editPais}
        />
      )}
      <ConfirmModal
        open={confirmOpen}
        title="Eliminar país"
        message="¿Seguro que deseas eliminar este país?"
        onConfirm={confirmDelete}
        onCancel={() => { setConfirmOpen(false); setPaisToDelete(null); }}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default PaisesAdminPage;
