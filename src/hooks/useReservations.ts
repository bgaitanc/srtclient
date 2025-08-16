import {
  useGetReservationDetailsQuery,
  usePostReservationMutation,
} from '@services/reservations.service.ts';

export const useReservations = ({ viajeId }: { viajeId: number }) => {
  const query = useGetReservationDetailsQuery(viajeId, {
    skip: !viajeId,
    refetchOnMountOrArgChange: true,
  });

  const [createReservation, createReservationMeta] =
    usePostReservationMutation();

  return {
    reservationDetailsQuery: query,
    createReservation,
    createReservationMeta,
  };
};
