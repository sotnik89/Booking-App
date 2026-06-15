import {createAsyncThunk} from "@reduxjs/toolkit";

import {getDestinations} from '../../api/destinationsApi.js';

export const fetchDestinations = createAsyncThunk(
    'destinations/fetchDestinations',
    async (_, {rejectWithValue}) => {
        try {
            return await getDestinations();
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch destinations'
            );
        }
    }
);
