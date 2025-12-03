import React from 'react';
import type { Country } from '../../shared/types/countries.types';

interface CountryCardProps {
  country: Country;
  onEdit: (country: Country) => void;
  onDelete: (countryId: number) => void;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, onEdit, onDelete }) => (
  <div className="relative group bg-white rounded-3xl shadow-xl p-8 flex flex-col h-full border border-blue-100">
    <div className="flex flex-col items-center justify-center flex-1">
      <span className="text-xl font-extrabold text-blue-700 mb-2">{country.countryName}</span>
    </div>
    <div className="mt-auto w-full flex justify-center gap-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl shadow transition duration-200"
        onClick={() => onEdit(country)}
      >
        Editar
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-xl shadow transition duration-200"
        onClick={() => onDelete(country.countryId)}
      >
        Eliminar
      </button>
    </div>
  </div>
);

export default CountryCard;
