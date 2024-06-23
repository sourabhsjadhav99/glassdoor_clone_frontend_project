// Import necessary functions and libraries from Redux Toolkit and Axios
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get the API key from environment variables using Vite
const apiKey =import.meta.env.VITE_APP_SERPAPI_KEY || "7ed00b199a97873e762a1e5a52be14d5cddaa8c6300eb5acaa2ee6744a4e0a9a"


// Create an asynchronous thunk to fetch jobs data from an API
export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async ({ q = "software engineer" }, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/search', {
                params: {
                    api_key: apiKey,
                    engine: 'google_jobs',
                    // google_domain: 'google.co.in',
                    q,

                    google_domain: "google.com",
                    gl: "us",
                    hl: "en",
                    nfpr: "1",
                    no_cache: "true",
                    device: "desktop"
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
