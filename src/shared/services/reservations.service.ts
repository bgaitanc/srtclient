import { srtApi } from '@services/base/srtApi.service.ts';
import type { SrtResponse } from '@srtTypes/srtApi.types.ts';
import type { ReservationDetails } from '@srtTypes/reservationDetails.types.ts';
import type { ReservationReq } from '@srtTypes/reservation.types.ts';

const reservationsApi = srtApi.injectEndpoints({
  endpoints: (builder) => ({
    getReservationDetails: builder.query<
      SrtResponse<ReservationDetails>,
      number
    >({
      query: (param) => ({
        url: '/reservas/detalle',
        params: {
          viajeId: param,
        },
        method: 'GET',
      }),
    }),
    postReservation: builder.mutation<
      SrtResponse<{ reservaId: number }>,
      ReservationReq
    >({
      query: (body) => ({
        url: '/reservas/create',
        body,
        method: 'POST',
      }),
    }),
  }),
});

export const { useGetReservationDetailsQuery, usePostReservationMutation } =
  reservationsApi;
