import { createSlice } from "@reduxjs/toolkit";


// Define the initial state for the job details slice
const initialState = {
  selectedJob: null,
  isCardClicked:false
};



// Create the jobDetailsSlice using createSlice
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


// Destructure the generated action creators from jobDetailsSlice
export const { selectJob, clearSelectedJob, setIsCardClicked } = jobDetailsSlice.actions;

export default jobDetailsSlice.reducer;
