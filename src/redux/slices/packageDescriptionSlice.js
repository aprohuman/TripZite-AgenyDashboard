import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tripPackageDescription: {
        packageName: '',
        shortDescription: '',
        longDescription: '',
    }
}

const packageDescriptionSlice = createSlice({
    name: 'tripPackageDescription',
    initialState,
    reducers: {
        setPackageName: (state, action) => {
            state.tripPackageDescription.packageName = action.payload
        },
        setPackageShortDescription: (state, action) => {
            state.tripPackageDescription.shortDescription = action.payload
        },
        setPackageLongDescription: (state, action) => {
            state.tripPackageDescription.longDescription = action.payload
        }
    }
});

export const { setPackageName, setPackageShortDescription, setPackageLongDescription } = packageDescriptionSlice.actions;
export default packageDescriptionSlice.reducer;