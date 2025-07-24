import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@config/constants.ts';
import { getToken } from '@utils/token.ts';

/*
 * Esta es la base de las peticiones al BE, la idea es que los demás
 * services / endpoints utilicen esta base de la siguiente manera
 *
 * const myService = srtApi.injectEndpoints({
 *  endpoints: builder => ({
 *    myEndpoint: ...,
 *    anotherEndpoint: ...
 *  })
 * })
 *
 */
export const srtApi = createApi({
  reducerPath: 'srtApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = getToken();
      headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: () => ({}),
});
