import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_DESTINATIONS = import.meta.env.VITE_GET_DESTINATIONS;

const destinationsApi = axios.create({
    baseURL: API_URL
});

export const getDestinations = async () => {
    const response = await destinationsApi.get(API_DESTINATIONS);
    return response.data
};
