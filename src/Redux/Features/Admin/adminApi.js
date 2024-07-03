import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const AdminApi = createApi({
  reducerPath: 'AdminApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  endpoints: (builder) => ({
    RegisterAdmin: builder.mutation({
      query: (data) => ({
        url : `/adminAuth/register`,
        method: 'POST',
        body: data,
      }) 
    }),
    LoginAdmin: builder.mutation({
      query: (data) => ({
        url : `/adminAuth/login`,
        method: 'POST',
        body: data,
      }) 
    }),
    LogoutAdmin: builder.mutation({
      query: () => ({
        url : `/adminAuth/logout`,
        method: 'POST',
      }) 
    }),
  })
})

export const { useRegisterAdminMutation, useLoginAdminMutation, useLogoutAdminMutation  } = AdminApi