import { srtApi } from '@services/base/srtApi.service.ts';
import type { SrtResponse } from '@srtTypes/srtApi.types.ts';
import type { ReservationDetails } from '@srtTypes/reservationDetails.types.ts';
import type {
  GetReservationInfoResponse,
  ReservationReq,
} from '@srtTypes/reservation.types.ts';

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
    getUserReservations: builder.query<
      SrtResponse<GetReservationInfoResponse[]>,
      number
    >({
      query: (param) => ({
        url: '/reservas/user',
        params: {
          userId: param,
        },
        method: 'GET',
      }),
    }),
    postReservation: builder.mutation<
      SrtResponse<GetReservationInfoResponse>,
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

export const {
  useGetReservationDetailsQuery,
  usePostReservationMutation,
  useGetUserReservationsQuery,
} = reservationsApi;
