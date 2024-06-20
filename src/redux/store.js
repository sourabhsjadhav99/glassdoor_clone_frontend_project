
import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './jobsSlice';
import jobDetailsReducer from './jobDetailsSlice';

const store = configureStore({
    reducer: {
        jobs: jobReducer,
        jobDetails: jobDetailsReducer
    },
});

export default store;
