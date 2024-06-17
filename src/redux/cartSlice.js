// Importing createSlice function from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the cart slice
const initialState = {
  items: [], // Array to store items in the cart
  buyNowItem: [], // Array to store items for immediate purchase
  isCart: true // Flag to differentiate between cart and buy-now state
};

// Creating the cart slice using createSlice
const cartSlice = createSlice({
  name: 'cart', // Slice name
  initialState, // Initial state defined above
  reducers: {
    // Reducer for adding items to the cart
    addToCart: (state, action) => {
      const itemExists = state.items.find(item => item.id === action.payload.id);
      if (!itemExists) {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    // Reducer for removing items from the cart
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    // Reducer for increasing quantity of an item in the cart
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    // Reducer for decreasing quantity of an item in the cart
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    // Reducer for adding an item directly to buy-now
    buyNow: (state, action) => {
      state.buyNowItem = [{ ...action.payload, quantity: 1 }];
    },
    // Reducer for increasing quantity of an item in buy-now
    increaseBuyQuantity: (state, action) => {
      const item = state.buyNowItem.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    // Reducer for decreasing quantity of an item in buy-now
    decreaseBuyQuantity: (state, action) => {
      const item = state.buyNowItem.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    // Reducer for setting the cart/buy-now mode
    setIsCart: (state, action) => {
      state.isCart = action.payload;
    },
  },
});

// Exporting action creators and reducer from the cart slice
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  buyNow,
  increaseBuyQuantity,
  decreaseBuyQuantity,
  setIsCart
} = cartSlice.actions;

export default cartSlice.reducer;
