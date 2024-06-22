import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const PoliceStationApi = createApi({
  reducerPath: 'PoliceStationApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' ,
    mode:'cors'
  }),
  tagTypes:['PoliceStations' ,'PoliceStation'],
  endpoints: (builder) => ({
    getAllPoliceStations: builder.query({
      query: () => `/PoliceStations`,
      providesTags:['PoliceStations']
    }),
    getPoliceStationById: builder.query({
      query: (id) => `/PoliceStation/${id}`,
      providesTags:['PoliceStation']
    }),
    addNewPoliceStation: builder.mutation({
      query: (data) => ({
        url : `/new/PoliceStation`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags:['PoliceStations'] 
    })
  }),
})

export const { useGetAllPoliceStationsQuery ,useGetPoliceStationByIdQuery, useAddNewPoliceStationMutation} = PoliceStationApi