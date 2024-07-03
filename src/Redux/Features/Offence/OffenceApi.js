import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const OffenceApi = createApi({
  reducerPath: 'OffenceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' ,
    mode:'cors'
  }),
  tagTypes:['Offence'],
  endpoints: (builder) => ({
    getAllOffences: builder.query({
      query: () => `/Offences`,
      providesTags:['Offence']
    }),
    addNewOffence: builder.mutation({
      query: (data) => ({
        url : `/new/Offence`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags:['Offence'] 
    })
  }),
})

export const { useGetAllOffencesQuery , useAddNewOffenceMutation} = OffenceApi