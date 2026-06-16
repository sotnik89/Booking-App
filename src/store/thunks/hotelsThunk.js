import { createAsyncThunk } from "@reduxjs/toolkit";

import { getHotels, getHotelsById } from '../../api/hotelsApi.js';

export const fetchHotels = createAsyncThunk(
    'hotels/fetchHotels',
    async (params, {rejectWithValue}) => {
        try {
            return await getHotels(params);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch hotels'
            );
        }
    }
);

export const fetchHotelsById = createAsyncThunk(
    'hotels/fetchHotelsById',
    async (id, {rejectWithValue}) => {
        try {
            return await getHotelsById(id);
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch hotel'
            );
        }
    }
);