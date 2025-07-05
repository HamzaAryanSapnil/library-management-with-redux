import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { borrowedBookApi } from "./api/borrowBookApi";
import copiesReducer from '@/redux/features/book-copies/copiesSlice'
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [borrowedBookApi.reducerPath]: borrowedBookApi.reducer,
    copies: copiesReducer
  },
  middleware: (getDefaultMiddlewares) => {
    return getDefaultMiddlewares().concat(
      baseApi.middleware,
      borrowedBookApi.middleware
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
