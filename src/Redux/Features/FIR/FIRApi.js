import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const FIRApi = createApi({
  reducerPath: 'FIRApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' ,
    mode:'cors'
  }),
  endpoints: (builder) => ({
    getAllFIRs: builder.query({
      query: () => `/FIRs`,
    }),
    addNewFIR: builder.mutation({
      query: (data) => ({
        url : `/new/FIR`,
        method: 'POST',
        body: data,
      }) 
    })
  }),
})

export const { useGetAllFIRsQuery , useAddNewFIRMutation} = FIRApi