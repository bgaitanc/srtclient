import { srtApi } from '@services/base/srtApi.service.ts';
import type { SrtResponse } from '@srtTypes/srtApi.types.ts';
import type { Travel } from '@srtTypes/travels.types.ts';

const travelsApi = srtApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTravels: builder.query<SrtResponse<Travel[]>, void>({
      query: () => ({
        url: '/viajes/all',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllTravelsQuery } = travelsApi;
