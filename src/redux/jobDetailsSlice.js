import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedJob: null,
};

const jobDetailsSlice = createSlice({
  name: "jobDetails",
  initialState,
  reducers: {
    selectJob: (state, action) => {
      state.selectedJob = action.payload;
    },
    clearSelectedJob: (state) => {
      state.selectedJob = null;
    },
  },
});

export const { selectJob, clearSelectedJob } = jobDetailsSlice.actions;

export default jobDetailsSlice.reducer;
