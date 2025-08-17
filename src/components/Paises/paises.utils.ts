import type { Pais } from '../../shared/types/pais.types';

export function filterActivePaises(paises: Pais[]): Pais[] {
  return paises.filter(p => p.activo !== false);
}

export function validatePaisName(name: string): string | null {
  if (!name.trim()) return 'El nombre del país es obligatorio.';
  if (name.length < 3) return 'El nombre debe tener al menos 2 caracteres.';
  if (name.length > 20) return 'El nombre debe tener máximo 20 caracteres.';
  return null;
}
