import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const FIRApi = createApi({
  reducerPath: 'FIRApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    mode: 'cors',  
    credentials: 'include'
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
    getAllFIRcount: builder.query({
      query: (url) => `/FIRs/count/${url}`,
      providesTags: ['FIRs']
    }),
    getPoliceStationFIRcount: builder.query({
      query: (url) => `/PoliceStationFIRs/count/${url}`,
      providesTags: ['FIRs']
    }),
    getCitizensFIRcount: builder.query({
      query: (url) => `/CitizenFIRs/count/${url}`,
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
    ChangeFIRStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updateStatus/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['FIRs']
    }),
    ChangeFIRRating: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updateRating/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['FIRs']
    }),
    ChangeFIRPoliceStation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updatePoliceStation/${id}`,
        method: 'POST',
        body: data,
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

export const { useGetAllFIRsQuery, useGetCitizensFIRsQuery, useGetPoliceStationFIRsQuery, useAddNewFIRMutation, useGetFIRByIdQuery, useDeleteFIRMutation, useUpdateFIRMutation , useChangeFIRStatusMutation , useChangeFIRRatingMutation, useChangeFIRPoliceStationMutation ,useGetSearchFIRsQuery,useGetAllFIRcountQuery,useGetCitizensFIRcountQuery,useGetPoliceStationFIRcountQuery } = FIRApi