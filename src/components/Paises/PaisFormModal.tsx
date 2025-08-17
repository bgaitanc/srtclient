import React, { useState } from 'react';
import BaseModal from '../shared/BaseModal';
import type { Pais } from '../../shared/types/pais.types';

interface PaisFormModalProps {
  initialData?: Pais;
  onSubmit: (data: { paisName: string; paisId?: number }) => void;
  onClose: () => void;
  loading?: boolean;
  isEdit?: boolean;
}

const PaisFormModal: React.FC<PaisFormModalProps> = ({ initialData, onSubmit, onClose, loading, isEdit }) => {
  const [paisName, setPaisName] = useState(initialData?.paisName ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && initialData) {
      onSubmit({ paisName, paisId: initialData.paisId });
    } else {
      onSubmit({ paisName });
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
            value={paisName}
            onChange={e => setPaisName(e.target.value)}
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

export default PaisFormModal;
