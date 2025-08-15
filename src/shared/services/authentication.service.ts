import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@config/constants.ts';

import type {
  UserLoginReq,
  UserLoginRes,
  UserRegisterReq,
  UserRegisterRes,
} from '@models/authentication.ts';
import type { SrtResponse } from '../types/srtApi.types.ts';

export const authenticationApi = createApi({
  reducerPath: 'authenticationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<SrtResponse<UserLoginRes>, UserLoginReq>({
      query: (body) => ({
        url: '/Authentication/login',
        method: 'POST',
        body,
      }),
      transformErrorResponse: error => error.data,
    }),
    register: builder.mutation<SrtResponse<UserRegisterRes>, UserRegisterReq>({
      query: (body) => ({
        url: '/Users/register',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authenticationApi;
