import React, { useState } from 'react';
import BaseModal from '../shared/BaseModal';
import type { Country } from '../../shared/types/countries.types';

interface CountryFormModalProps {
  initialData?: Country;
  onSubmit: (data: { countryName: string; countryId?: number }) => void;
  onClose: () => void;
  loading?: boolean;
  isEdit?: boolean;
}

const CountryFormModal: React.FC<CountryFormModalProps> = ({ initialData, onSubmit, onClose, loading, isEdit }) => {
  const [countryName, setCountryName] = useState(initialData?.countryName ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && initialData) {
      onSubmit({ countryName, countryId: initialData.countryId });
    } else {
      onSubmit({ countryName });
    }
  };

  return (
    <BaseModal open={true} onClose={onClose} maxWidth="max-w-md">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">{isEdit ? 'Editar país' : 'Nuevo país'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Nombre del país</label>
          <input
            type="text"
            value={countryName}
            onChange={e => setCountryName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          disabled={loading}
        >
          {loading ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
        </button>
      </form>
    </BaseModal>
  );
};

export default CountryFormModal;
