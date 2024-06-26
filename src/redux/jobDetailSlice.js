import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiHost, apikey } from "../utils/constants"
export const fetchJobDetails = createAsyncThunk('jobs/fetchJobDetails', async (jobId) => {
  const options = {
    method: 'GET',
    url: `https://${apiHost}/get-job-details`,
    params: { id: jobId },
    headers: {
      'x-rapidapi-key': apikey,
      'x-rapidapi-host': apiHost
    }
  };

  const response = await axios.request(options);
  return response.data.data;
});

const jobDetailSlice = createSlice({
  name: 'jobDetails',
  initialState: {
    selectedJob: null,
    isCardClicked: false,
    loading: false,
    error: null
  },
  reducers: {
    setIsCardClicked: (state, action) => {
      state.isCardClicked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobDetails.pending, (state) => {
        state.loading= true
      })
      .addCase(fetchJobDetails.fulfilled, (state, action) => {
        state.loading= false,
        state.selectedJob = action.payload;
      })
      .addCase(fetchJobDetails.rejected, (state, action) => {
        state.loading= false,
        state.error = action.error.message;
      });
  }
});

export const { setIsCardClicked } = jobDetailSlice.actions;
export default jobDetailSlice.reducer;
