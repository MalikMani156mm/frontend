import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const CategoryApi = createApi({
  reducerPath: 'CategoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' ,
    mode:'cors',  credentials: 'include'
  }),
  tagTypes:['Category'],
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => `/Categories`,
      providesTags:['Category']
    }),
    getCategoryById: builder.query({
      query: (id) => `/Category/${id}`,
      providesTags: ['Category']
    }),
    addNewCategory: builder.mutation({
      query: (data) => ({
        url : `/new/Category`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags:['Category'] 
    })
  }),
})

export const { useGetAllCategoriesQuery ,useGetCategoryByIdQuery, useAddNewCategoryMutation} = CategoryApi