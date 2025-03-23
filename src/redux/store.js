import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import packageDescriptionReducer from './slices/packageDescriptionSlice';
import packageTripDurationReducer from './slices/packageDurationSlice';
import PackageTripDetailReducer from './slices/packageDetailSlice';

const store = configureStore({
    reducer: {
        packageDescription: packageDescriptionReducer,
        packageDuration: packageTripDurationReducer,
        packageDetail: PackageTripDetailReducer

    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(logger)
    }
});

export default store;
