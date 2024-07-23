import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ContactMessageApi = createApi({
  reducerPath: 'ContactMessageApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' ,
    mode:'cors',  credentials: 'include'
  }),
  tagTypes:['ContactMessage'],
  endpoints: (builder) => ({
    getAllContactMessage: builder.query({
      query: () => `/ContactMessage/get`,
      providesTags:['ContactMessage']
    }),
    SendCertificateMeetingMessage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/meetingCertificateNotification/send/${id}`,
        method: 'POST',
        body: data,
      }),
    }),
    SendRequestMeetingMessage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/meetingRequestNotification/send/${id}`,
        method: 'POST',
        body: data,
      }),
    }),
    addNewContactMessage: builder.mutation({
      query: (data) => ({
        url : `/ContactMessage/send`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags:['ContactMessage'] 
    })
  }),
})

export const { useGetAllContactMessageQuery, useAddNewContactMessageMutation,useSendCertificateMeetingMessageMutation,useSendRequestMeetingMessageMutation } = ContactMessageApi