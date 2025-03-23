import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    packageTripDuration: {
        overallTripDuration: '',
        startDate: '',
        endDate: '',
        bookingDeadline: '',
    }
}

const packageDurationSlice = createSlice({
    name: 'packageTripDuration',
    initialState,
    reducers: {
        setOverallTripDuration: (state, action) => {
            state.packageTripDuration.overallTripDuration = action.payload
        },
        setStartDate: (state, action) => {
            state.packageTripDuration.startDate = action.payload
        },
        setEndDate: (state, action) => {
            state.packageTripDuration.endDate = action.payload
        },
        setBookingDeadline: (state, action) => {
            state.packageTripDuration.bookingDeadline = action.payload
        }
    }
})

export const { setOverallTripDuration, setStartDate, setEndDate, setBookingDeadline } = packageDurationSlice.actions;
export default packageDurationSlice.reducer;