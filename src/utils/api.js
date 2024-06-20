// utils/api.js
import axios from 'axios';

export const fetchDataFromApi = async ({ endpoint, id = '', params = {} }) => {
    try {
        const options = {
            method: 'GET',
            url: `https://glassdoor.p.rapidapi.com/${endpoint}${id ? `/${id}` : ''}`,
            params: params,
            headers: {
                'x-rapidapi-key': '21ecdc6a3emshdb76d29a048e46fp173a27jsnf91c30894e92',
                'x-rapidapi-host': 'glassdoor.p.rapidapi.com'
              }
        };

        const response = await axios.request(options);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

