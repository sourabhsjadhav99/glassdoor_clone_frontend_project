
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {apiHost, apikey} from "../utils/constants"

export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async (searchParams, { rejectWithValue }) => {
        try {
            const options = {
                method: 'GET',
                url: `https://${apiHost}/search-jobs`,

                params: searchParams,
                headers: {
                   'x-rapidapi-key': apikey,
                    'x-rapidapi-host': apiHost
                }
            };
            const response = await axios.request(options);
            return response.data.data;

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const jobSearchSlice = createSlice({
    name: 'jobSearch',
    initialState: {
        jobs: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload || []
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default jobSearchSlice.reducer;

