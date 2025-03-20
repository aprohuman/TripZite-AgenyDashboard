import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tripBreakdownData: [
        {
            id: 0,
            accommodationType: '',
            accommodation: false,
            accommodationLocation: '',
            transportType: '',
            transport: false,
            meal: false,
            mealOption: '',
            itinerary: [],
            media: [],
        },
    ],
};

const tripSlice = createSlice({
    name: 'trip',
    initialState,
    reducers: {
        setTripBreakdownData: (state, action) => {
            state.tripBreakdownData = action.payload;
        },
        updateTripDay: (state, action) => {
            const { day, newData } = action.payload;
            state.tripBreakdownData[day] = { ...state.tripBreakdownData[day], ...newData };
        },
        addMediaToTripDay: (state, action) => {
            const { day, files } = action.payload;
            state.tripBreakdownData[day].media = [...state.tripBreakdownData[day].media, ...files];
        },
    },
});

export const { setTripBreakdownData, updateTripDay, addMediaToTripDay } = tripSlice.actions;
export default tripSlice.reducer;
