import React from 'react';
import { useCountriesAdmin } from '../../hooks/useCountriesAdmin';
import { Toaster } from 'react-hot-toast';
import ConfirmModal from '../../components/shared/ConfirmModal';
import CountryFormModal from '../../components/Country/CountryFormModal';
import CountriesList from '../../components/Country/CountriesList';

const CountriesAdminPage: React.FC = () => {
  const {
    countries, isLoading, error,
    showModal, handleCreate, handleEdit, handleDelete,
    editCountry, handleSubmit, modalLoading,
    confirmOpen, confirmDelete, setConfirmOpen, setCountryToDelete
  } = useCountriesAdmin();

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
      <CountriesList countries={countries} onEdit={handleEdit} onDelete={handleDelete} />
      {showModal && (
        <CountryFormModal
          initialData={editCountry}
          onSubmit={handleSubmit}
          onClose={handleCreate}
          loading={modalLoading}
          isEdit={!!editCountry}
        />
      )}
      <ConfirmModal
        open={confirmOpen}
        title="Eliminar país"
        message="¿Seguro que deseas eliminar este país?"
        onConfirm={confirmDelete}
        onCancel={() => { setConfirmOpen(false); setCountryToDelete(null); }}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default CountriesAdminPage;