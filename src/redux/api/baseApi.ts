import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { IBooks } from "@/types";


export interface BookArguments {
  page?: number;
  limit?: number;
  filter?: string;
  sortBy?: string;
  sort?: "asc" | "desc";
}

export interface BookRes {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: IBooks[];
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASEAPI}` }),
  tagTypes: ["books"],
  endpoints: (builder) => ({
    getBook: builder.query<BookRes, BookArguments>({
      query: ({page = 1, limit= 10, filter, sortBy, sort}) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));

        if(filter) params.set("filter", filter)
        if(sortBy) params.set("sortBy", sortBy)
        if(sort) params.set("sort", sort)

        return `/api/books?${params.toString()}`  

      },
      providesTags: ["books"],
    }),
    getSingleBook: builder.query({
      query: (bookId) => `/api/books/${bookId}`,
      providesTags: ["books"]
    }),
    createBook: builder.mutation({
      query: (booksData) => ({
        method: "POST",
        body: booksData,
        url: "/api/books",
      }),
      invalidatesTags: ["books"],
    }),
    updateBook: builder.mutation({
      query: ({ booksData, bookId }) => ({
        method: "PUT",
        body: booksData,
        url: `/api/books/${bookId}`,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: (bookId) => ({
        method: "DELETE",
        url: `/api/books/${bookId}`,
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetBookQuery,
  useGetSingleBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = baseApi;
