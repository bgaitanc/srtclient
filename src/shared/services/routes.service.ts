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
        url: '/routes/all',
        method: 'GET',
      }),
    }),
    createRoute: builder.mutation<SrtResponse<{routeId: number}>, CreateRouteReq>({
      query: (body) => ({
        url: '/routes/create',
        method: 'POST',
        body,
      }),
    }),
    updateRoute: builder.mutation<SrtResponse<{routeId: number}>, UpdateRouteReq>({
      query: req => ({
        url: `/routes/update`,
        method: 'PUT',
        body: req,
      }),
    }),
    deleteRoute: builder.mutation<SrtResponse<any>, number>({
      query: (routeId) => ({
        url: `/routes/${routeId}/delete`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetAllRoutesQuery, useCreateRouteMutation, useUpdateRouteMutation, useDeleteRouteMutation } = routesApi;
