import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const borrowedBookApi = createApi({
  reducerPath: "borrowedBookApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASEAPI}` }),
  tagTypes: ["borrowedBooksApi", "books"],
  endpoints: (builder) => ({
    getBorrowSummery: builder.query({
      query: () => "/api/borrow",
      providesTags: ["borrowedBooksApi"],
    }),
    borrowBook: builder.mutation({
      query: (borrowBookData) => ({
        method: "POST",
        body: borrowBookData,
        url: "/api/borrow",
      }),
      invalidatesTags: ["borrowedBooksApi", "books"],
    }),
  }),
});

export const {useGetBorrowSummeryQuery, useBorrowBookMutation} = borrowedBookApi;
