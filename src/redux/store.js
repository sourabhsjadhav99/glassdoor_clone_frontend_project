// Importing the configureStore function from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';


import jobReducer from './jobsSlice';

// Configuring the Redux store with combineReducers and initial reducers
const store = configureStore({
  reducer: {

    jobs: jobReducer, // Reducer for managing product data state

  },
});

// Exporting the configured Redux store
export default store;