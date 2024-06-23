import { createSlice } from "@reduxjs/toolkit";


// Define the initial state for the job details slice
const initialState = {
  input: null,

};



// Create the inputSlice using createSlice
const inputSlice = createSlice({
  name: "inputQuery",
  initialState,
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload;
    }

  },
});


// Destructure the generated action creators from inputSlice
export const { setInput } = inputSlice.actions;

export default inputSlice.reducer;
