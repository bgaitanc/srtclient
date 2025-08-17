import { srtApi } from './base/srtApi.service';
import type { SrtResponse } from '../types/srtApi.types';
import type { Locacion, CreateLocacionReq, UpdateLocacionReq } from '../types/locacion.types';

export const locacionesApi = srtApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLocaciones: builder.query<SrtResponse<Locacion[]>, { departamentoId?: number }>({
      query: ({ departamentoId } = {}) => ({
        url: '/locaciones/all',
        method: 'GET',
        params: departamentoId ? { departamentoId } : undefined,
      }),
    }),
    createLocacion: builder.mutation<SrtResponse<{locacionId: number}>, CreateLocacionReq>({
      query: (body) => ({
        url: '/locaciones/create',
        method: 'POST',
        body,
      }),
    }),
    updateLocacion: builder.mutation<SrtResponse<{locacionId: number}>, UpdateLocacionReq>({
      query: (body) => ({
        url: '/locaciones/update',
        method: 'PUT',
        body,
      }),
    }),
    deleteLocacion: builder.mutation<SrtResponse<any>, number>({
      query: (locacionId) => ({
        url: `/locaciones/${locacionId}/delete`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetAllLocacionesQuery, useCreateLocacionMutation, useUpdateLocacionMutation, useDeleteLocacionMutation } = locacionesApi;
