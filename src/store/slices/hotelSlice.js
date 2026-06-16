import { createSlice } from '@reduxjs/toolkit';

import { fetchHotels, fetchHotelsById } from '../thunks/hotelsThunk.js';

const initialState = {
    hotels: [],
    currentHotel: null,
    loading: false,
    currentHotelLoading: false,
    error: null,
    currentHotelError: null,
    filters: {
        search: '',
        city: '',
        rating: '',
        sortBy: '',
        order: ''
    }
};

const hotelSlice = createSlice({
    name: 'hotels',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.filters.search = action.payload;
        },
        setCity: (state, action) => {
            state.filters.city = action.payload;
        },
        setRating: (state, action) => {
            state.filters.rating = action.payload;
        },
        setSortBy: (state, action) => {
            state.filters.sortBy = action.payload;
        },
        setOrder: (state, action) => {
            state.filters.order = action.payload;
        },
        resetFilters: (state) => {
            state.filters = initialState.filters
        },
        clearCurrentHotel: (state) => {
            state.currentHotel = null;
            state.currentHotelError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHotels.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHotels.fulfilled, (state, action) => {
                state.loading = false;
                state.hotels = action.payload;
            })
            .addCase(fetchHotels.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchHotelsById.pending, (state) => {
                state.currentHotelLoading = true;
                state.currentHotelError = null;
            })
            .addCase(fetchHotelsById.fulfilled, (state, action) => {
                state.currentHotelLoading = false;
                state.currentHotel = action.payload;
            })
            .addCase(fetchHotelsById.rejected, (state, action) => {
                state.currentHotelLoading = false;
                state.currentHotelError = action.payload;
            })
    }
});
export const {
    setSearch,
    setCity,
    setRating,
    setSortBy,
    setOrder,
    resetFilters,
    clearCurrentHotel
} = hotelSlice.actions;

export default hotelSlice.reducer;

