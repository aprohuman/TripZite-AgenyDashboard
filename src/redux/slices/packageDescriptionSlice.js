import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    packageDescription: {
        packageName: '',
        shortDescription: '',
        longDescription: '',
    }
}

const packageDescriptionSlice = createSlice({
    name: 'packageDescription',
    initialState,
    reducers: {
        setPackageName: (state, action) => {
            console.log('hiiiiii', action.payload)
            state.tripPackage.packageName = action.payload
        },
        setPackageShortDescription: (state, action) => {
            state.tripPackage.shortDescription = action.payload
        },
        setPackageLongDescription: (state, action) => {
            state.tripPackage.longDescription = action.payload
        }
    }
});

export const {setPackageName, setPackageShortDescription, setPackageLongDescription} = packageDescriptionSlice.actions;
export default packageDescriptionSlice.reducer;