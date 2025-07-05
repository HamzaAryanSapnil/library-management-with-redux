import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  copies: 0,
  available: true
};

const copiesSlice = createSlice({
  name: "copies",
  initialState,
  reducers: {
    setCopies: (state, action: PayloadAction<number>) => {
      state.copies = action.payload;
    },
    setAvailable: (state, action: PayloadAction<boolean>) => {
      state.available = action.payload;
    },
  },
});


export const { setCopies, setAvailable } = copiesSlice.actions;

export default copiesSlice.reducer;