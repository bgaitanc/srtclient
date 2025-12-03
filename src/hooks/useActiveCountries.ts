import {
  useGetAllCountriesQuery,
  useCreateCountryMutation,
  useUpdateCountryMutation,
  useDeleteCountryMutation,
} from '../shared/services/countries.service';
import { filterActiveCountries } from '../components/Country/countries.utils';
import type { Country } from '../shared/types/countries.types';

export function useActiveCountries() {
  const { data, isLoading, error, refetch } = useGetAllCountriesQuery();
  const countries: Country[] = filterActiveCountries(data?.data ?? []);
  return { countries, isLoading, error, refetch };
}

export const useCountryMutations = () => {
  const [createCountry] = useCreateCountryMutation();
  const [updateCountry] = useUpdateCountryMutation();
  const [deleteCountry] = useDeleteCountryMutation();
  return { createCountry, updateCountry, deleteCountry };
};
