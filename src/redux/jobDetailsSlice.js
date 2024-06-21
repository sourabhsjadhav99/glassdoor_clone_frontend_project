import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedJob: null,
  isCardClicked:false
};

const jobDetailsSlice = createSlice({
  name: "jobDetails",
  initialState,
  reducers: {
    selectJob: (state, action) => {
      state.selectedJob = action.payload;
    },
    setIsCardClicked: (state, action) => {
      state.isCardClicked= action.payload;
    },
    clearSelectedJob: (state) => {
      state.selectedJob = null;
    },
  },
});

export const { selectJob, clearSelectedJob, setIsCardClicked } = jobDetailsSlice.actions;

export default jobDetailsSlice.reducer;
