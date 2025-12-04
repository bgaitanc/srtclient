import { srtApi } from './base/srtApi.service';
import type { SrtResponse } from '../types/srtApi.types';
import type {
  RegisterUserRequest,
  RegisterUserResponse,
  UserInfoResponse,
  AssignUserRoleRequest,
  RemoveUserRoleRequest,
} from '../types/users.types';

export const usersApi = srtApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<SrtResponse<UserInfoResponse[]>, void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
    }),
    registerUser: builder.mutation<SrtResponse<RegisterUserResponse>, RegisterUserRequest>({
      query: (req) => ({
        url: '/users/register',
        method: 'POST',
        body: req,
      }),
    }),
    getUserInfo: builder.query<SrtResponse<UserInfoResponse>, void>({
      query: () => ({
        url: '/users/info',
        method: 'GET',
      }),
    }),
    assignUserRole: builder.mutation<SrtResponse<boolean>, AssignUserRoleRequest>({
      query: (req) => ({
        url: '/users/assign-role',
        method: 'POST',
        body: req,
      }),
    }),
    removeUserRole: builder.mutation<SrtResponse<boolean>, RemoveUserRoleRequest>({
      query: (req) => ({
        url: '/users/remove-role',
        method: 'POST',
        body: req,
      }),
    }),
    getUserRoles: builder.query<SrtResponse<string[]>, string>({
      query: (userId) => ({
        url: `/users/${userId}/roles`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useRegisterUserMutation,
  useGetUserInfoQuery,
  useAssignUserRoleMutation,
  useRemoveUserRoleMutation,
  useGetUserRolesQuery,
} = usersApi;
