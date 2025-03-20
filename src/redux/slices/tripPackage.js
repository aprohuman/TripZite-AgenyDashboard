import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    tripPackage: {
        packageName: '',
        shortDescription: '',
        longDescription: '',
    }
}

const tripPackageSlice = createSlice({
    name: 'tripPackageDescription',
    initialState,
    reducers: {
        setTripPackageName: (state, action) => {
            state.tripPackage.packageName = action.payload
        },
        setTripPackageShortDescription: (state, action) => {
            state.tripPackage.shortDescription = action.payload
        },
        setTripPackageLongDescription: (state, action) => {
            state.tripPackage.longDescription = action.payload
        }
    }
})