import { useGetAllRoutesQuery } from '@services/routes.service';

export const useRoutes = () => {
  const { data: routes = [], isLoading: loading, error, refetch } = useGetAllRoutesQuery();
  return { routes, loading, error, refetch };
};
