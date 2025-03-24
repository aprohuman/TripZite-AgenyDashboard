import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import packageDescriptionReducer from './slices/packageDescriptionSlice';
import packageTripDurationReducer from './slices/packageDurationSlice';
import PackageTripDetailReducer from './slices/packageDetailSlice';
import PackageTripBreakdownReducer from './slices/packageBreakDownSlice';

const store = configureStore({
    reducer: {
        packageDescription: packageDescriptionReducer,
        packageDuration: packageTripDurationReducer,
        packageDetail: PackageTripDetailReducer,
        packageBreakDown: PackageTripBreakdownReducer,

    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(logger)
    }
});

export default store;
