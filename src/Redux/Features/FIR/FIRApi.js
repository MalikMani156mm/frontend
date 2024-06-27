import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const FIRApi = createApi({
  reducerPath: 'FIRApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    mode: 'cors'
  }),
  tagTypes: ['FIRs', 'FIR'],
  endpoints: (builder) => ({
    getAllFIRs: builder.query({
      query: () => `/FIRs`,
      providesTags: ['FIRs']
    }),
    getFIRById: builder.query({
      query: (id) => `/FIR/${id}`,
      providesTags: ['FIR']
    }),
    addNewFIR: builder.mutation({
      query: (data) => ({
        url: `/new/FIR`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['FIRs']
    }),
    deleteFIR: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FIRs']
    }),

    updateFIR: builder.mutation({
      query: (id) => ({
        url: `/update/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['FIRs']
    }),
  }),
})

export const { useGetAllFIRsQuery, useAddNewFIRMutation, useGetFIRByIdQuery, useDeleteFIRMutation, useUpdateFIRMutation } = FIRApi