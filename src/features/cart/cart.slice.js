import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addOrRemoveCart(state, action) {
      const isExist = state.data?.find(
        (item) => item._id === action.payload._id
      );
      if (!isExist) {
        state.data = [...state.data, action.payload];
      } else {
        const filtered = state.data?.filter(
          (item) => item._id !== action.payload._id
        );
        state.data = filtered;
      }
    },
  },
});

export const { addOrRemoveCart } = cartSlice.actions;

export default cartSlice.reducer;
