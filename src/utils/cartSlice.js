import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
};

// Save cart to localStorage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item already exists
      } else {
        state.push({ ...action.payload, quantity: 1 }); // Add new item
      }
      saveCartToLocalStorage(state); // Save to localStorage
    },
    removeFromCart: (state, action) => {
      const newCart = state.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(newCart);
      return newCart;
    },
    increaseQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      saveCartToLocalStorage(state);
    },
    decreaseQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      saveCartToLocalStorage(state);
    },
    clearCart: (state) => {
      saveCartToLocalStorage([]);
      return [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
