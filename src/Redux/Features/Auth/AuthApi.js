import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  endpoints: (builder) => ({
    RegisterUser: builder.mutation({
      query: (data) => ({
        url : `/auth/register`,
        method: 'POST',
        body: data,
      }) 
    }),
    LoginUser: builder.mutation({
      query: (data) => ({
        url : `/auth/login`,
        method: 'POST',
        body: data,
      }) 
    }),
    LogoutUser: builder.mutation({
      query: () => ({
        url : `/auth/logout`,
        method: 'POST',
      }) 
    }),
  })
})

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation  } = AuthApi