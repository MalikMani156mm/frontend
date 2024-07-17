import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ContactMessageApi = createApi({
  reducerPath: 'ContactMessageApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' ,
    mode:'cors'
  }),
  tagTypes:['ContactMessage'],
  endpoints: (builder) => ({
    getAllContactMessage: builder.query({
      query: () => `/ContactMessage/get`,
      providesTags:['ContactMessage']
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

export const { useGetAllContactMessageQuery, useAddNewContactMessageMutation } = ContactMessageApi