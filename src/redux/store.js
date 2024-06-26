


// Import the configureStore function from the Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Import the jobs reducer from the jobsSlice file
import jobSearchReducer from './jobsSlice';

import jobDetailReducer from './jobDetailSlice';
import companyDetailsReducer from './companyDetailsSlice';

// Configure the Redux store by combining the jobs and jobDetails reducers

//--

import inputReducer from './inputSlice';
import locationSearchReducer from "./locationSearchSlice";
// import companyDetailsReducer from "./companyDetailsSlice"

const store = configureStore({
    reducer: {
        input:inputReducer,
        jobSearch: jobSearchReducer,
        jobDetails: jobDetailReducer,
        locationSearch: locationSearchReducer,
        company: companyDetailsReducer
  
    },
});

// Export the configured store as the default export
export default store;
