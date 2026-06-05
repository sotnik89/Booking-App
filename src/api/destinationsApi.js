import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL;
const API_HOTELS = import.meta.env.VITE_GET_HOTELS;

const hotelsApi = axios.create({
    baseURL: API_URL
})

export const getHotels = async () => {
    const response = await hotelsApi.get(API_HOTELS)

    return response.data
}
