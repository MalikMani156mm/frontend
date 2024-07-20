import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const VVApi = createApi({
  reducerPath: 'VVApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' ,
    mode:'cors',  credentials: 'include'
  }),
  tagTypes:['VV'],
  endpoints: (builder) => ({
    getPoliceStationRequests: builder.query({
      query: (url) => `/PoliceStationRequests/${url}`,
      providesTags: ['VV']
    }),
    getCitizensRequests: builder.query({
      query: (url) => `/CitizenRequests/${url}`,
      providesTags: ['VV']
    }),
    ChangeRequestStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updateRequestStatus/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['FIRs']
    }),
    getRequestById: builder.query({
      query: (id) => `/Request/${id}`,
      providesTags: (result, error, id) => [{ type: 'VV', id }],
    }),
    deleteRequest: builder.mutation({
      query: (id) => ({
        url: `/deleteRequest/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['VV']
    }),
    updateRequest: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updateRequest/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'VV' }],
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

export const { useAddNewRequestMutation, useGetCitizensRequestsQuery, useGetPoliceStationRequestsQuery, useGetRequestByIdQuery,useDeleteRequestMutation, useChangeRequestStatusMutation,useUpdateRequestMutation} = VVApi