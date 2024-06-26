import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiHost, apikey } from "../utils/constants";

// Async thunk for fetching company details
export const fetchCompanyDetails = createAsyncThunk(
  'company/fetchCompanyDetails',
  async (username) => {
    const options = {
      method: 'GET',
      url: `https://${apiHost}/get-company-details`,
      params: { username },
      headers: {
        'x-rapidapi-key': apikey,
        'x-rapidapi-host': apiHost
      }
    };
    const response = await axios.request(options);
    console.log(response)
    return response.data.data
  }
);

const companyDetailsSlice = createSlice({
  name: 'company',
  initialState: {
    details: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload || {}
      })
      .addCase(fetchCompanyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default companyDetailsSlice.reducer;
