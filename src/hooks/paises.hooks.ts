import {
  useGetAllPaisesQuery,
  useCreatePaisMutation,
  useUpdatePaisMutation,
  useDeletePaisMutation,
} from '../shared/services/paises.service';
import { filterActivePaises } from '../components/Paises/paises.utils';
import type { Pais } from '../shared/types/pais.types';

export function useActivePaises() {
  const { data, isLoading, error, refetch } = useGetAllPaisesQuery();
  const paises: Pais[] = filterActivePaises(data?.data ?? []);
  return { paises, isLoading, error, refetch };
}

export const usePaisMutations = () => {
  const [createPais] = useCreatePaisMutation();
  const [updatePais] = useUpdatePaisMutation();
  const [deletePais] = useDeletePaisMutation();
  return { createPais, updatePais, deletePais };
};
