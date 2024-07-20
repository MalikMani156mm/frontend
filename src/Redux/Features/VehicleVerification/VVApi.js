import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const VVApi = createApi({
  reducerPath: 'VVApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' ,
    mode:'cors',  credentials: 'include'
  }),
  tagTypes:['VV'],
  endpoints: (builder) => ({
    getAllRequests: builder.query({
      query: () => `/Requests`,
      providesTags:['VV']
    }),
    addNewRequest: builder.mutation({
      query: (data) => ({
        url : `/new/Request`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags:['VV'] 
    })
  }),
})

export const { useGetAllRequestsQuery , useAddNewRequestMutation} = VVApi