import { useGetAllTravelsQuery } from '@services/travels.service.ts';

export const useTravels = () => {
  const query = useGetAllTravelsQuery(undefined, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  return { ...query };
};
