import React from 'react';
import type { Country } from '../../shared/types/countries.types';
import CountryCard from './CountryCard';

interface CountriesListProps {
  countries: Country[];
  onEdit: (country: Country) => void;
  onDelete: (countryId: number) => void;
}

const CountriesList: React.FC<CountriesListProps> = ({ countries, onEdit, onDelete }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 max-w-7xl mx-auto">
    {countries.map((country) => (
      <CountryCard key={country.countryId} country={country} onEdit={onEdit} onDelete={onDelete} />
    ))}
  </div>
);

export default CountriesList;
