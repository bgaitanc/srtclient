import { srtApi } from './base/srtApi.service';
import type { SrtResponse } from '../types/srtApi.types.ts';
import type {
  CreateRouteReq,
  Route,
  UpdateRouteReq,
} from '../types/route.types.ts';

export const routesApi = srtApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoutes: builder.query<SrtResponse<Route[]>, void>({
      query: () => ({
        url: '/rutas/all',
        method: 'GET',
      }),
    }),
    createRoute: builder.mutation<SrtResponse<{rutaId: number}>, CreateRouteReq>({
      query: (body) => ({
        url: '/rutas',
        method: 'POST',
        body,
      }),
    }),
    updateRoute: builder.mutation<SrtResponse<{rutaId: number}>, UpdateRouteReq>({
      query: req => ({
        url: `/rutas/update`,
        method: 'PUT',
        body: req,
      }),
    }),
  }),
});

export const { useGetAllRoutesQuery, useCreateRouteMutation, useUpdateRouteMutation } = routesApi;
