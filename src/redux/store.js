// Importing the configureStore function from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Importing the reducers from different slices
import filterReducer from './filterSlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';

// Configuring the Redux store with combineReducers and initial reducers
const store = configureStore({
  reducer: {
    filters: filterReducer, // Reducer for managing filters state
    products: productReducer, // Reducer for managing product data state
    cart: cartReducer // Reducer for managing cart state
  },
});

// Exporting the configured Redux store
export default store;
