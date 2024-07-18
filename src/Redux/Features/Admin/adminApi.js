import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const AdminApi = createApi({
  reducerPath: 'AdminApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' ,  credentials: 'include'}),
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
    ConfirmAdminPassword: builder.mutation({
      query: (data) => ({
        url : `/auth/confirmAdminPassword`,
        method: 'POST',
        body: data,
      }) 
    }),
    ForgetPasswordEmail: builder.mutation({
      query: (data) => ({
        url : `/auth/AdminForgetPassword`,
        method: 'POST',
        body: data,
      }) 
    }),
    ResetAdminPassword: builder.mutation({
      query: ({url,data}) => ({
        url : `/auth/AdminResetPassword/${url}`,
        method: 'POST',
        body: data,
      }) 
    }),
    ChangeAdminPassword: builder.mutation({
      query: ({ id, data }) => ({
        url: `/auth/changeAdminPassword/${id}`,
        method: 'POST',
        body: data,
      }),
    }),
    ChangeAdminName: builder.mutation({
      query: ({ id, data }) => ({
        url: `/auth/changeAdminName/${id}`,
        method: 'POST',
        body: data,
      }),
    }),
    SendMeetingMessage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/meetingNotification/send/${id}`,
        method: 'POST',
        body: data,
      }),
    }),
    LogoutAdmin: builder.mutation({
      query: () => ({
        url : `/adminAuth/logout`,
        method: 'POST',
      }) 
    }),
  })
})

export const { useRegisterAdminMutation, useLoginAdminMutation, useLogoutAdminMutation,useForgetPasswordEmailMutation,useResetAdminPasswordMutation,useChangeAdminNameMutation, useChangeAdminPasswordMutation, useConfirmAdminPasswordMutation,useSendMeetingMessageMutation  } = AdminApi