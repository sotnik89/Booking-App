import {createSlice} from '@reduxjs/toolkit';

import {fetchDestinations} from "../thunks/destinationsThunk.js";

const initialState = {
    destinations: [],
    loading: false,
    error: null,
    filters: {
        search: '',
        destinations: '',
        city: '',
        rating: '',
        sortBy: '',
        order: ''
    }
};

const destinationSlice = createSlice({
    name: 'destinations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDestinations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDestinations.fulfilled, (state, action) => {
                state.loading = false;
                state.destinations = action.payload;
            })
            .addCase(fetchDestinations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});
export default destinationSlice.reducer;

