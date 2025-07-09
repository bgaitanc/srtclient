import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    // Definir aqui los endpoints
  }),
});

// Export for usage in functional components, e.g. api.useGetSomethingQuery
export const {} = api;
