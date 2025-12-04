import { srtApi } from './base/srtApi.service';
import type { SrtResponse } from '../types/srtApi.types';
import type { Destination, CreateDestinationReq, UpdateDestinationReq } from '../types/destination.types';

export const destinationsApi = srtApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDestinations: builder.query<SrtResponse<Destination[]>, { stateId?: string }>({
      query: ({ stateId } = {}) => ({
        url: '/destinations/all',
        method: 'GET',
        params: stateId ? { stateId } : undefined,
      }),
    }),
    createDestination: builder.mutation<SrtResponse<{destinationId: string}>, CreateDestinationReq>({
      query: (body) => ({
        url: '/destinations/create',
        method: 'POST',
        body,
      }),
    }),
    updateDestination: builder.mutation<SrtResponse<{destinationId: string}>, UpdateDestinationReq>({
      query: (body) => ({
        url: '/destinations/update',
        method: 'PUT',
        body,
      }),
    }),
    deleteDestination: builder.mutation<SrtResponse<any>, string>({
      query: (destinationId) => ({
        url: `/destinations/${destinationId}/delete`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetAllDestinationsQuery, useCreateDestinationMutation, useUpdateDestinationMutation, useDeleteDestinationMutation } = destinationsApi;
