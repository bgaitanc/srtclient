import React from 'react';
import type { Pais } from '../../shared/types/pais.types';

interface PaisCardProps {
  pais: Pais;
  onEdit: (pais: Pais) => void;
  onDelete: (paisId: number) => void;
}

const PaisCard: React.FC<PaisCardProps> = ({ pais, onEdit, onDelete }) => (
  <div className="relative group bg-white rounded-3xl shadow-xl p-8 flex flex-col h-full border border-blue-100">
    <div className="flex flex-col items-center justify-center flex-1">
      <span className="text-xl font-extrabold text-blue-700 mb-2">{pais.paisName}</span>
    </div>
    <div className="mt-auto w-full flex justify-center gap-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl shadow transition duration-200"
        onClick={() => onEdit(pais)}
      >
        Editar
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-xl shadow transition duration-200"
        onClick={() => onDelete(pais.paisId)}
      >
        Eliminar
      </button>
    </div>
  </div>
);

export default PaisCard;
