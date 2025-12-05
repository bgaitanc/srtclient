import { srtApi } from './base/srtApi.service';
import type { SrtResponse } from '../types/srtApi.types';
import type { Role, CreateRoleReq, UpdateRoleReq, DeleteRoleReq } from '../types/roles.types';

export const rolesApi = srtApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoles: builder.query<SrtResponse<Role[]>, void>({
      query: () => ({
        url: '/roles',
        method: 'GET',
      }),
    }),
    createRole: builder.mutation<SrtResponse<{ id: string }>, CreateRoleReq>({
      query: (req) => ({
        url: '/roles',
        method: 'POST',
        body: req,
      }),
    }),
    updateRole: builder.mutation<SrtResponse<{ id: string }>, UpdateRoleReq>({
      query: (req) => ({
        url: '/roles',
        method: 'PUT',
        body: req,
      }),
    }),
    deleteRole: builder.mutation<SrtResponse<null>, DeleteRoleReq>({
      query: (req) => ({
        url: '/roles',
        method: 'DELETE',
        body: req,
      }),
    }),
  }),
});

export const { useGetAllRolesQuery, useCreateRoleMutation, useUpdateRoleMutation, useDeleteRoleMutation } = rolesApi;
