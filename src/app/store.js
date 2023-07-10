import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cart.slice";
import counterReducer from "../features/counter/counterSlice";
import productReducer from "../features/products/productSlice";
import authReducer from "../features/user/userSlice.js";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    product: productReducer,
    cart: cartSlice,
  },
});
