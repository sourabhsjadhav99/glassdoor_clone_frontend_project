// // redux/jobsSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchDataFromApi } from '../utils/api';

// export const fetchJobs = createAsyncThunk(
//     'jobs/fetchJobs',
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await fetchDataFromApi({
//                 endpoint: 'companies/search',
//                 params: {
//                    company_name: 'Microsoft'
//                 },
//             });
//             return response;  // Adjusted to directly return the response
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );

// const jobSlice = createSlice({
//     name: 'jobs',
//     initialState: {
//         data: [],
//         loading: false,
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchJobs.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchJobs.fulfilled, (state, action) => {
//                 state.data = action.payload;  // Ensure this correctly sets the data
//                 state.loading = false;
//             })
//             .addCase(fetchJobs.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     },
// });

// export default jobSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey ="c2cb4d7a687c988be981672555597358cabb248b94b04a6af7ccb4861e7e8f4b" //process.env.REACT_APP_SERPAPI_KEY;

export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async ({ q="software engineer"}, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/search', {
                params: {
                    api_key:apiKey,
                    engine: 'google_jobs',
                    google_domain: 'google.co.in',
                    q,
                    // hl: 'hi',
                    // gl: 'in',
              
                }
            });
            return response.data.jobs_results;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

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
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default jobSlice.reducer;
