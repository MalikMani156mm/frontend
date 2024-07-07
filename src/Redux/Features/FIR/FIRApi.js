import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const FIRApi = createApi({
  reducerPath: 'FIRApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    mode: 'cors'
  }),
  tagTypes: ['FIRs'],
  endpoints: (builder) => ({
    getAllFIRs: builder.query({
      query: (url) => `/FIRs/${url}`,
      providesTags: ['FIRs']
    }),
    getPoliceStationFIRs: builder.query({
      query: (url) => `/PoliceStationFIRs/${url}`,
      providesTags: ['FIRs']
    }),
    getCitizensFIRs: builder.query({
      query: (url) => `/CitizenFIRs/${url}`,
      providesTags: ['FIRs']
    }),
    getSearchFIRs: builder.query({
      query: (url) => `/SearchFIRs/${url}`,
      providesTags: ['FIRs']
    }),
    getFIRById: builder.query({
      query: (id) => `/FIR/${id}`,
      providesTags: (result, error, id) => [{ type: 'FIRs', id }],
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
      query: ({ id, data }) => ({
        url: `/update/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'FIRs' }],
    }),
  }),
})

export const { useGetAllFIRsQuery, useGetCitizensFIRsQuery, useGetPoliceStationFIRsQuery, useAddNewFIRMutation, useGetFIRByIdQuery, useDeleteFIRMutation, useUpdateFIRMutation,useGetSearchFIRsQuery } = FIRApi