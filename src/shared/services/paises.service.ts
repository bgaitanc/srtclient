import { srtApi } from './base/srtApi.service';
import type { SrtResponse } from '../types/srtApi.types';
import type { Pais, CreatePaisReq, UpdatePaisReq } from '../types/pais.types';

export const paisesApi = srtApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPaises: builder.query<SrtResponse<Pais[]>, void>({
      query: () => ({
        url: '/paises/all',
        method: 'GET',
      }),
    }),
    createPais: builder.mutation<SrtResponse<{paisId: number}>, CreatePaisReq>({
      query: (body) => ({
        url: '/paises/create',
        method: 'POST',
        body,
      }),
    }),
    updatePais: builder.mutation<SrtResponse<{paisId: number}>, UpdatePaisReq>({
      query: (body) => ({
        url: '/paises/update',
        method: 'PUT',
        body,
      }),
    }),
    deletePais: builder.mutation<SrtResponse<any>, number>({
      query: (paisId) => ({
        url: `/paises/${paisId}/delete`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetAllPaisesQuery, useCreatePaisMutation, useUpdatePaisMutation, useDeletePaisMutation } = paisesApi;
