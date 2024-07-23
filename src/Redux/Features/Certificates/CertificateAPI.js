import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const CertificateApi = createApi({
  reducerPath: 'CertificateApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' ,
    mode:'cors',  credentials: 'include'
  }),
  tagTypes:['Certificates'],
  endpoints: (builder) => ({
    getPoliceStationCertificates: builder.query({
      query: (url) => `/PoliceStationCertificates/${url}`,
      providesTags: ['Certificates']
    }),
    getCitizensCertificates: builder.query({
      query: (url) => `/CitizenCertificates/${url}`,
      providesTags: ['Certificates']
    }),
    getCertificateById: builder.query({
      query: (id) => `/Certificate/${id}`,
      providesTags: (result, error, id) => [{ type: 'Certificates', id }],
    }),
    ChangeCertificatePoliceStation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updateCertificatePoliceStation/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Certificates']
    }),
    updateCertificate: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updateCertificate/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Certificates' }],
    }),
    deleteCertificate: builder.mutation({
      query: (id) => ({
        url: `/deleteCertificate/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Certificates']
    }),
    ChangeCertificateStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updateCertificateStatus/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Certificates']
    }),
    ChangeCertificateRating: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updateCertificateRating/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Certificates']
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

export const { useAddNewCertificateMutation,useGetPoliceStationCertificatesQuery,useGetCitizensCertificatesQuery,useDeleteCertificateMutation,useChangeCertificateStatusMutation,useGetCertificateByIdQuery,useChangeCertificatePoliceStationMutation,useChangeCertificateRatingMutation,useUpdateCertificateMutation} = CertificateApi