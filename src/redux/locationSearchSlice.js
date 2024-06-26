// slices/locationSearchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiHost, apikey } from "../utils/constants"

export const fetchLocations = createAsyncThunk(
  'locations/fetchLocations',
  async (keyword, { rejectWithValue }) => {
    try {
      const options = {
        method: 'GET',
        url: `https://${apiHost}/search-locations`,
        params: { keyword },
        headers: {
          'x-rapidapi-key': apikey,
          'x-rapidapi-host': apiHost,
        },
      };

      const response = await axios.request(options);

      if (response.data.success) {
        return response.data.data.items;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const locationSearchSlice = createSlice({
  name: 'locationSearch',
  initialState: {
    locations: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default locationSearchSlice.reducer;
