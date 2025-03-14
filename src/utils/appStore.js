import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // Import the cart slice

const appStore = configureStore({
  reducer: {
    cart: cartReducer, // Assign cartReducer to manage cart state
  },
});

export default appStore;
