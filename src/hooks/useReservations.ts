import {
  useGetReservationDetailsQuery,
  usePostReservationMutation,
} from '@services/reservations.service.ts';

export const useReservations = ({ travelId }: { travelId: number }) => {
  const query = useGetReservationDetailsQuery(travelId, {
    skip: !travelId,
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
