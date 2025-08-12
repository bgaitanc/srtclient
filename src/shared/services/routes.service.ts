import { srtApi } from './base/srtApi.service';

export const routesApi = srtApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoutes: builder.query<any[], void>({
      query: () => ({
        url: '/rutas/all',
        method: 'GET',
      }),
    }),
    createRoute: builder.mutation<any, any>({
      query: (body) => ({
        url: '/rutas',
        method: 'POST',
        body,
      }),
    }),
    updateRoute: builder.mutation<any, { id: number; data: any }>({
      query: ({ id, data }) => ({
        url: `/rutas/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const { useGetAllRoutesQuery, useCreateRouteMutation, useUpdateRouteMutation } = routesApi;
