import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const CertificateApi = createApi({
  reducerPath: 'CertificateApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' ,
    mode:'cors'
  }),
  tagTypes:['Certificates'],
  endpoints: (builder) => ({
    getAllCertificates: builder.query({
      query: () => `/Certificates`,
      providesTags:['Certificates']
    }),
    addNewCertificate: builder.mutation({
      query: (data) => ({
        url : `/new/Certificate`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags:['Certificates'] 
    })
  }),
})

export const { useGetAllCertificatesQuery , useAddNewCertificateMutation} = CertificateApi