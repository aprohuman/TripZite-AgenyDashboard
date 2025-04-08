import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { combineReducers } from 'redux'

import logger from 'redux-logger';

import authReducer from './slices/authSlice';
import packageDescriptionReducer from './slices/packageDescriptionSlice';
import packageTripDurationReducer from './slices/packageDurationSlice';
import PackageTripDetailReducer from './slices/packageDetailSlice';
import PackageTripBreakdownReducer from './slices/packageBreakDownSlice';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // only auth will be persisted
}

const rootReducer = combineReducers({
    auth: authReducer,
    packageDescription: packageDescriptionReducer,
    packageDuration: packageTripDurationReducer,
    packageDetail: PackageTripDetailReducer,
    packageBreakDown: PackageTripBreakdownReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(logger)
    }
});
export const persistor = persistStore(store)
export default store;
