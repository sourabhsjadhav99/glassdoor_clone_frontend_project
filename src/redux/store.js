


// Import the configureStore function from the Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Import the jobs reducer from the jobsSlice file
import jobReducer from './jobsSlice';

// Import the job details reducer from the jobDetailsSlice file
import jobDetailsReducer from './jobDetailsSlice';

import inputReducer from './inputSlice';
// Configure the Redux store by combining the jobs and jobDetails reducers
const store = configureStore({
    reducer: {
        jobs: jobReducer,         // Assign jobsReducer to handle 'jobs' slice of the state
        jobDetails: jobDetailsReducer, // Assign jobDetailsReducer to handle 'jobDetails' slice of the state
        input:inputReducer
    },
});

// Export the configured store as the default export
export default store;
