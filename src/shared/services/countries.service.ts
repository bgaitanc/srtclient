import { srtApi } from './base/srtApi.service';
import type { SrtResponse } from '../types/srtApi.types';
import type { Country, CreateCountryReq, UpdateCountryReq } from '../types/countries.types';

export const countriesApi = srtApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCountries: builder.query<SrtResponse<Country[]>, void>({
      query: () => ({
        url: '/countries/all',
        method: 'GET',
      }),
    }),
    createCountry: builder.mutation<SrtResponse<{countryId: number}>, CreateCountryReq>({
      query: (body) => ({
        url: '/countries/create',
        method: 'POST',
        body,
      }),
    }),
    updateCountry: builder.mutation<SrtResponse<{countryId: number}>, UpdateCountryReq>({
      query: (body) => ({
        url: '/countries/update',
        method: 'PUT',
        body,
      }),
    }),
    deleteCountry: builder.mutation<SrtResponse<any>, number>({
      query: (countryId) => ({
        url: `/countries/${countryId}/delete`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetAllCountriesQuery, useCreateCountryMutation, useUpdateCountryMutation, useDeleteCountryMutation } = countriesApi;