import { srtApi } from './base/srtApi.service';
import type { SrtResponse } from '../types/srtApi.types';
import type { States, CreateStateReq, UpdateStateReq } from '../types/states.types';

export const StatesApi = srtApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStates: builder.query<SrtResponse<States[]>, { countryId?: number }>({
      query: ({ countryId } = {}) => ({
        url: '/states/all',
        method: 'GET',
        params: countryId ? { countryId } : undefined,
      }),
    }),
    createState: builder.mutation<SrtResponse<{stateId: number}>, CreateStateReq>({
      query: (body) => ({
        url: '/states/create',
        method: 'POST',
        body,
      }),
    }),
    updateState: builder.mutation<SrtResponse<{stateId: number}>, UpdateStateReq>({
      query: (body) => ({
        url: '/states/update',
        method: 'PUT',
        body,
      }),
    }),
    deleteState: builder.mutation<SrtResponse<any>, number>({
      query: (stateId) => ({
        url: `/states/${stateId}/delete`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetAllStatesQuery, useCreateStateMutation, useUpdateStateMutation, useDeleteStateMutation } = StatesApi;
