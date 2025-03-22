import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import packageDescriptionReducer from './slices/packageDescriptionSlice';


const store = configureStore({
    reducer: {
        packageDescription: packageDescriptionReducer
    },
    middleware: (getDefaultMiddleware)=>{
        return getDefaultMiddleware().concat(logger)
    }
});

export default store;
