import { configureStore } from '@reduxjs/toolkit';
import tripReducer from './slices/tripSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        trip: tripReducer,
        auth: authReducer,
    },
});

export default store;
