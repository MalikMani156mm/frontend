import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const OffenceApi = createApi({
  reducerPath: 'OffenceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' ,
    mode:'cors',  credentials: 'include'
  }),
  tagTypes:['Offence'],
  endpoints: (builder) => ({
    getAllOffences: builder.query({
      query: () => `/Offences`,
      providesTags:['Offence']
    }),
    getOffenceById: builder.query({
      query: (id) => `/Offence/${id}`,
      providesTags: ['Offence']
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

export const { useGetAllOffencesQuery ,useGetOffenceByIdQuery, useAddNewOffenceMutation} = OffenceApi