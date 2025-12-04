import React from 'react';
import type { Country } from '../../shared/types/countries.types';

interface CountriesListProps {
  countries: Country[];
  onEdit: (country: Country) => void;
  onDelete: (countryId: number) => void;
}

const CountriesList: React.FC<CountriesListProps> = ({ countries, onEdit, onDelete }) => (
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
          {countries.map((country) => (
            <tr key={country.id} className="border-t border-blue-100 hover:bg-blue-50/40">
              <td className="px-4 py-3 text-sm text-gray-700">{country.id}</td>
              <td className="px-4 py-3 text-sm font-medium text-gray-900">{country.name}</td>
              <td className="px-4 py-3 text-sm text-right">
                <div className="inline-flex gap-2">
                  <button
                    className="text-yellow-600 font-semibold px-3 py-2 rounded-lg cursor-pointer"
                    onClick={() => onEdit(country)}
                  >
                    Editar
                  </button>
                  <button
                    className="text-red-600 font-semibold px-3 py-2 rounded-lg cursor-pointer"
                    onClick={() => onDelete(country.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {countries.length === 0 && (
            <tr>
              <td className="px-4 py-6 text-center text-gray-500" colSpan={3}>No hay países registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default CountriesList;
