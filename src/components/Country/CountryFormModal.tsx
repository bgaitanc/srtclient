import React, { useState } from 'react';
import BaseModal from '../shared/BaseModal';
import type { Country } from '../../shared/types/countries.types';

interface CountryFormModalProps {
  initialData?: Country;
  onSubmit: (data: { name: string; id?: string }) => void;
  onClose: () => void;
  loading?: boolean;
  isEdit?: boolean;
}

const CountryFormModal: React.FC<CountryFormModalProps> = ({ initialData, onSubmit, onClose, loading, isEdit }) => {
  const [countryName, setCountryName] = useState(initialData?.name ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && initialData) {
      onSubmit({ name: countryName, id: initialData.id });
    } else {
      onSubmit({ name: countryName });
    }
  };

  return (
    <BaseModal open={true} onClose={loading ? undefined : onClose} maxWidth="max-w-md">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h2 className="text-xl font-bold text-blue-700">{isEdit ? 'Editar país' : 'Nuevo país'}</h2>
          <p className="text-sm text-gray-500 mt-1">Completa la información y guarda los cambios.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del país</label>
          <input
            type="text"
            value={countryName}
            onChange={e => setCountryName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ej. Honduras"
            required
            disabled={loading}
          />
          <p className="mt-1 text-xs text-gray-400">Usa el nombre oficial del país.</p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-70"
            disabled={loading || countryName.trim().length === 0}
          >
            {loading ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default CountryFormModal;
