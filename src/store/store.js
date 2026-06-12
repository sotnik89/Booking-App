import { configureStore } from '@reduxjs/toolkit';

import hotelsReducer from './slices/hotelSlice.js';
import destinationsReducer from './slices/destinationSlice.js';

export const store = configureStore({
    reducer:{
        hotels: hotelsReducer,
        destinations: destinationsReducer
    }
})