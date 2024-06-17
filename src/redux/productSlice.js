// Importing necessary functions and utilities from Redux Toolkit and custom API utility
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDataFromApi } from '../utils/api';

// Async Thunk function to fetch products from the API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts', // Action type identifier
  async ({ categories = [], sort = '', searchQuery = '', price = [], ratings = [] }, { rejectWithValue }) => {
    try {
      let response;

      // Fetching products based on categories or all products if no categories are specified
      if (categories.length === 0) {
        response = await fetchDataFromApi('/products');
      } else {
        const responses = await Promise.all(
          categories.map((category) => fetchDataFromApi(`/products/category/${category}`))
        );
        response = { products: responses.flatMap((res) => res.products) };
      }

      let products = response.products;

      // Filtering products based on search query if provided
      if (searchQuery) {
        products = products.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
      }

      // Filtering products based on price if a maximum price is specified
      let getPriceNumber = price?.map((num) => num.split(" ")[1]).map(Number);
      let maxPrice = Math.max(...getPriceNumber, 0);
      if (maxPrice > 0) {
        products = products.filter((elm) => parseInt(elm.price * 50) < maxPrice);
      }

      // Filtering products based on minimum ratings if specified ratings are less than or equal to 5
      let getRatingsNumber = ratings?.map((num) => num.split(" ")[0]).map(Number);
      let minRatings = Math.min(...getRatingsNumber);
      if (minRatings <= 5) {
        products = products.filter((elm) => elm.rating >= minRatings);
      }

      // Sorting products based on the specified sort option
      if (sort === "New Arrival") {
        products = products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (sort === "Price (High to low)") {
        products = products.sort((a, b) => parseInt(b.price * 50) - parseInt(a.price * 50));
      } else if (sort === "Price (Low to high)") {
        products = products.sort((a, b) => parseInt(a.price * 50) - parseInt(b.price * 50));
      } else if (sort === 'Ratings') {
        products = products.sort((a, b) => b.rating - a.rating);
      } else if (sort === 'Discount') {
        products = products.sort((a, b) => b.discountPercentage - a.discountPercentage);
      }

      // Returning the filtered and sorted products
      return products;
    } catch (error) {
      // Rejecting the async thunk with the error message if an error occurs
      return rejectWithValue(error.message);
    }
  }
);

// Creating a slice of state for products
const productSlice = createSlice({
  name: 'products', // Slice name
  initialState: {
    data: [], // Array to store fetched products
    loading: false, // Loading state indicator
    error: null, // Error message if fetch fails
  },
  reducers: {}, // No additional reducers defined in this slice
  extraReducers: (builder) => {
    // Handling pending state when products are being fetched
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true; // Setting loading state to true
        state.error = null; // Resetting error state
      })
      // Handling fulfilled state when products fetch is successful
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload; // Updating products data with fetched products
        state.loading = false; // Setting loading state to false
      })
      // Handling rejected state when products fetch fails
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false; // Setting loading state to false
        state.error = action.payload; // Updating error state with error message
      });
  },
});

// Exporting the product reducer function
export default productSlice.reducer;
