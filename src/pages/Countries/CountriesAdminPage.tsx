import React, { useMemo, useState } from 'react';
import { useCountriesAdmin } from '../../hooks/useCountriesAdmin';
import { Toaster } from 'react-hot-toast';
import ConfirmModal from '../../components/shared/ConfirmModal';
import CountryFormModal from '../../components/Country/CountryFormModal';
import CountriesList from '../../components/Country/CountriesList';

const CountriesAdminPage: React.FC = () => {
  const {
    countries, isLoading, error,
    showModal, setShowModal, handleCreate, handleEdit, handleDelete,
    editCountry, handleSubmit, modalLoading,
    confirmOpen, confirmDelete, setConfirmOpen, setCountryToDelete
  } = useCountriesAdmin();

  const [search, setSearch] = useState('');
  const filteredCountries = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter(c => {
      const name = (c.countryName ?? '').toLowerCase();
      const idStr = String(c.id ?? '').toLowerCase();
      return name.includes(q) || idStr.includes(q);
    });
  }, [countries, search]);

  return (
    <div className="min-h-screen py-10">
      <Toaster position="top-right" />
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-blue-700">Gestión de países</h1>
          <button
            className="bg-green-600 hover:bg-green-700 cursor-pointer text-white font-semibold py-2.5 px-5 rounded-lg shadow transition"
            onClick={handleCreate}
            disabled={modalLoading}
          >
            Crear país
          </button>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre o ID"
              className="w-64 border bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <span className="text-sm text-gray-500">{filteredCountries.length} resultados</span>
          </div>
        </div>
        {isLoading && <div className="text-blue-600 text-base font-medium">Cargando países...</div>}
        {error && (
          <div className="text-red-600 text-base font-medium">Ocurrió un error al cargar los países.</div>
        )}
        <CountriesList countries={filteredCountries} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      {showModal && (
        <CountryFormModal
          initialData={editCountry}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
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
