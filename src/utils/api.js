// Importing Axios for making HTTP requests
import axios from "axios";

// Base URL for the API
const BASE_URL = "https://dummyjson.com";

// Function to fetch data from the API
export const fetchDataFromApi = async (url) => {
    try {
        // Making a GET request to the specified URL
        const { data } = await axios.get(BASE_URL + url);
        // Returning the response data
        return data;
    } catch (err) {
        // Handling any errors that occur during the request
        console.log(err);
        throw err; // Throwing the error for further handling
    }
}
