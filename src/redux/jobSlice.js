// src/slices/jobSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedJobs: [],
  appliedJobs: [],
  status: 'idle',
  error: null,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setSavedJobs(state, action) {
      state.savedJobs = action.payload;
    },
    setAppliedJobs(state, action) {
      state.appliedJobs = action.payload;
    },
    addSavedJob(state, action) {
      state.savedJobs.push(action.payload);
    },
    addAppliedJob(state, action) {
      state.appliedJobs.push(action.payload);
    },
    removeSavedJob(state, action) {
      state.savedJobs = state.savedJobs.filter(job => job.id !== action.payload);
    },
    removeAppliedJob(state, action) {
      state.appliedJobs = state.appliedJobs.filter(job => job.id !== action.payload);
    },
  },
});

export const {
  setSavedJobs,
  setAppliedJobs,
  addSavedJob,
  addAppliedJob,
  removeSavedJob,
  removeAppliedJob,
} = jobSlice.actions;

export default jobSlice.reducer;
