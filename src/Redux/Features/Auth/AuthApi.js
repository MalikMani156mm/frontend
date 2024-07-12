import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' ,  credentials: 'include'}),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    RegisterUser: builder.mutation({
      query: (data) => ({
        url : `/auth/register`,
        method: 'POST',
        body: data,
      }) 
    }),
    VerifyUser: builder.mutation({
      query: ({url,data}) => ({
        url : `/auth/register/otp/${url}`,
        method: 'POST',
        body: data,
      }) 
    }),
    SendOTPAgain: builder.query({
      query: (url) => ({
        url : `/auth/register/sendOTPagain/${url}`,
      }) 
    }),
    LoginUser: builder.mutation({
      query: (data) => ({
        url : `/auth/login`,
        method: 'POST',
        body: data,
      }) 
    }),
    ForgetPasswordCNIC: builder.mutation({
      query: (data) => ({
        url : `/auth/forgetPasswordCNIC`,
        method: 'POST',
        body: data,
      }) 
    }),
    ResetPassword: builder.mutation({
      query: ({url,data}) => ({
        url : `/auth/resetPassword/${url}`,
        method: 'POST',
        body: data,
      }) 
    }),
    ConfirmPassword: builder.mutation({
      query: (data) => ({
        url : `/auth/confirmPassword`,
        method: 'POST',
        body: data,
      }) 
    }),
    ChangePassword: builder.mutation({
      query: ({ id, data }) => ({
        url: `/auth/changePassword/${id}`,
        method: 'POST',
        body: data,
      }),
    }),
    ChangeUsername: builder.mutation({
      query: ({ id, data }) => ({
        url: `/auth/changeUsername/${id}`,
        method: 'POST',
        body: data,
      }),
    }),
    LogoutUser: builder.mutation({
      query: () => ({
        url : `/auth/logout`,
        method: 'POST',
      }) 
    }),
  })
})

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useConfirmPasswordMutation, useChangePasswordMutation, useChangeUsernameMutation ,useForgetPasswordCNICMutation,useResetPasswordMutation, useVerifyUserMutation , useSendOTPAgainQuery} = AuthApi