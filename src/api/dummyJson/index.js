import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dummyJsonApi = createApi({
  reducerPath: 'dummyJsonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  endpoints: (build) => ({
    getUsers: build.mutation({
      query: (params) => {
        return {
          url: '/users',
          method: 'GET',
          params,
        };
      },
    }),
  }),
});

export const { useGetUsersMutation } = dummyJsonApi;
