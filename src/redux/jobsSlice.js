// Import necessary functions and libraries from Redux Toolkit and Axios
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get the API key from environment variables using Vite
const apiKey = import.meta.env.VITE_APP_SERPAPI_KEY || "fa6f8d0ca5338ac8d1a49218a1a2569631bbe2ef7dc85561a8383619c07e8b84"


// Create an asynchronous thunk to fetch jobs data from an API
export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async ({ q = "software engineer" }, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/search', {
                params: {
                    api_key: apiKey,
                    engine: 'google_jobs',
                    google_domain: 'google.co.in',
                    q
                }
            });
            return response.data.jobs_results;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Create a slice for managing jobs state
const jobSlice = createSlice({
    name: 'jobs',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.data = action.payload || []
                state.loading = false;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default jobSlice.reducer;
