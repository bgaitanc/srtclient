import { srtApi } from './base/srtApi.service';
import type { SrtResponse } from '../types/srtApi.types';
import type { Destination, CreateDestinationReq, UpdateDestinationReq } from '../types/destination.types';

export const destinationsApi = srtApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDestinations: builder.query<SrtResponse<Destination[]>, { stateId?: number }>({
      query: ({ stateId } = {}) => ({
        url: '/destinations/all',
        method: 'GET',
        params: stateId ? { stateId } : undefined,
      }),
    }),
    createDestination: builder.mutation<SrtResponse<{destinationId: number}>, CreateDestinationReq>({
      query: (body) => ({
        url: '/destinations/create',
        method: 'POST',
        body,
      }),
    }),
    updateDestination: builder.mutation<SrtResponse<{destinationId: number}>, UpdateDestinationReq>({
      query: (body) => ({
        url: '/destinations/update',
        method: 'PUT',
        body,
      }),
    }),
    deleteDestination: builder.mutation<SrtResponse<any>, number>({
      query: (destinationId) => ({
        url: `/destinations/${destinationId}/delete`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetAllDestinationsQuery, useCreateDestinationMutation, useUpdateDestinationMutation, useDeleteDestinationMutation } = destinationsApi;
