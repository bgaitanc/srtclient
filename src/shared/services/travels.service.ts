import { srtApi } from '@services/base/srtApi.service.ts';
import type { SrtResponse } from '@srtTypes/srtApi.types.ts';
import type { Travel, CreateTravelReq } from '@srtTypes/travels.types.ts';

const travelsApi = srtApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTravels: builder.query<SrtResponse<Travel[]>, void>({
      query: () => ({
        url: '/travels/all',
        method: 'GET',
      }),
    }),
    createTravel: builder.mutation<SrtResponse<{ travelId: string }>, CreateTravelReq>({
      query: (req) => ({
        url: '/travels/create',
        method: 'POST',
        body: req,
      }),
    }),
  }),
});

export const { useGetAllTravelsQuery, useCreateTravelMutation } = travelsApi;
