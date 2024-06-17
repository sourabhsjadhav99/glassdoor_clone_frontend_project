// Importing createSlice function from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the filters slice
const initialState = {
  selectedCategories: [], // Array to store selected categories
  selectedRatings: [], // Array to store selected ratings
  selectedPrices: [], // Array to store selected prices
  sortOption: 'Relevance', // Default sort option
  searchQuery: '', // Initial search query (assuming you add this state)
};

// Creating the filters slice using createSlice
const filterSlice = createSlice({
  name: 'filters', // Slice name
  initialState, // Initial state defined above
  reducers: {
    // Reducer for toggling a category
    toggleCategory: (state, action) => {
      const category = action.payload;
      if (state.selectedCategories.includes(category)) {
        state.selectedCategories = state.selectedCategories.filter(c => c !== category);
      } else {
        state.selectedCategories.push(category);
      }
    },
    // Reducer for clearing all categories, ratings, and prices
    clearAllCategories: (state) => {
      state.selectedCategories = [];
      state.selectedRatings = [];
      state.selectedPrices = [];
    },
    // Reducer for setting the sort option
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    // Reducer for toggling a rating
    toggleRatings: (state, action) => {
      const ratings = action.payload;
      if (state.selectedRatings.includes(ratings)) {
        state.selectedRatings = state.selectedRatings.filter(g => g !== ratings);
      } else {
        state.selectedRatings.push(ratings);
      }
    },
    // Reducer for toggling a price
    togglePrices: (state, action) => {
      const prices = action.payload;
      if (state.selectedPrices.includes(prices)) {
        state.selectedPrices = state.selectedPrices.filter(g => g !== prices);
      } else {
        state.selectedPrices.push(prices);
      }
    },
    // Reducer for setting the search query
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    // Reducer for adding multiple categories at once
    addMultipleCategories: (state, action) => {
      state.selectedCategories = action.payload;
    },
  },
});

// Exporting action creators and reducer from the filters slice
export const {
  toggleCategory,
  clearAllCategories,
  setSortOption,
  toggleRatings,
  togglePrices,
  setSearchQuery,
  addMultipleCategories,
} = filterSlice.actions;

export default filterSlice.reducer;
