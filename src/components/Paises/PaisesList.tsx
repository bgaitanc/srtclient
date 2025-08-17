import React from 'react';
import type { Pais } from '../../shared/types/pais.types';
import PaisCard from './PaisCard';

interface PaisesListProps {
  paises: Pais[];
  onEdit: (pais: Pais) => void;
  onDelete: (paisId: number) => void;
}

const PaisesList: React.FC<PaisesListProps> = ({ paises, onEdit, onDelete }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 max-w-7xl mx-auto">
    {paises.map((pais) => (
      <PaisCard key={pais.paisId} pais={pais} onEdit={onEdit} onDelete={onDelete} />
    ))}
  </div>
);

export default PaisesList;
