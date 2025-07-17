import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@config/constants.ts';

import type {
  UserLoginReq,
  UserLoginRes,
  UserRegisterReq,
  UserRegisterRes,
} from '@models/authentication.ts';

export const authenticationApi = createApi({
  reducerPath: 'authenticationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserLoginRes, UserLoginReq>({
      query: (body) => ({
        url: '/Authentication/login',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation<UserRegisterRes, UserRegisterReq>({
      query: (body) => ({
        url: '/Users/register',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authenticationApi;
