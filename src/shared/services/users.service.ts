import { srtApi } from '@services/base/srtApi.service.ts';
import type { SrtResponse } from '@srtTypes/srtApi.types.ts';
import type { UserInfo } from '@srtTypes/users.types.ts';

const usersApi = srtApi.injectEndpoints({
  endpoints: (builder) => ({
   getUserInfo: builder.query<SrtResponse<UserInfo>, void>({
     query: () => ({
      url: '/users/info',
      method: 'GET',
     })
   })
  })
})

export const { useGetUserInfoQuery } = usersApi;
