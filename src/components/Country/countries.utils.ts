import type { Country } from '../../shared/types/countries.types';

export function filterActiveCountries(countries: Country[]): Country[] {
  return countries.filter(c => c.active !== false);
}

export function validateCountryName(name: string): string | null {
  if (!name.trim()) return 'El nombre del país es obligatorio.';
  if (name.length < 3) return 'El nombre debe tener al menos 2 caracteres.';
  if (name.length > 20) return 'El nombre debe tener máximo 20 caracteres.';
  return null;
}
