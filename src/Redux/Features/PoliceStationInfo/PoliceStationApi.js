import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const PoliceStationApi = createApi({
  reducerPath: 'PoliceStationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    mode: 'cors'
  }),
  tagTypes: ['PoliceStations'],
  endpoints: (builder) => ({
    getAllPoliceStations: builder.query({
      query: () => `/PoliceStations`,
      providesTags: ['PoliceStations']
    }),
    getPoliceStationById: builder.query({
      query: (id) => `/PoliceStation/${id}`,
      providesTags: ['PoliceStations']
    }),
    addNewPoliceStation: builder.mutation({
      query: (data) => ({
        url: `/new/PoliceStation`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['PoliceStations']
    }),
    updatePoliceStation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updatePoliceStation/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'PoliceStations' }],
    }),
    deletePoliceStation: builder.mutation({
      query: (id) => ({
        url: `/deletePoliceStation/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PoliceStations']
    }),
  }),
})

export const { useGetAllPoliceStationsQuery, useGetPoliceStationByIdQuery, useAddNewPoliceStationMutation, useUpdatePoliceStationMutation, useDeletePoliceStationMutation } = PoliceStationApi