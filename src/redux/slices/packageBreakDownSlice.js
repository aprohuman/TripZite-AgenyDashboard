import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tripDayBreakdown: [
        {
            id: 0,
            accommodation: false,
            accommodationType: "",
            accommodationLocation: "",
            transport: false,
            transportType: "",
            meal: false,
            mealOption: "",
            itinerary: [],
            media: [],
        },
    ],
};

const tripBreakdownSlice = createSlice({
    name: "packageTripDayBreakdown",
    initialState,
    reducers: {
        addTripBreakdown: (state, action) => {

            state.tripDayBreakdown.push(action.payload);
        },
        updateField: (state, action) => {
            const { id, name, value } = action.payload;
            const item = state.tripDayBreakdown.find((trip) => trip.id === id);
            if (item) {

                if (name === 'accommodation') {
                    item.accommodationType = '';
                    item.accommodationLocation = '';
                    item[name] = value;
                }
            }
        },
        addItinerary: (state, action) => {
            const { id } = action.payload;
            const item = state.tripDayBreakdown.find((trip) => trip.id === id);
            if (item) {
                item.itinerary.push({ id: item.itinerary.length, value: "" });
            }
        },
        removeItinerary: (state, action) => {
            const { id, itineraryId } = action.payload;
            const item = state.tripDayBreakdown.find((trip) => trip.id === id);
            if (item) {
                item.itinerary = item.itinerary.filter((it) => it.id !== itineraryId);
            }
        },
        updateItinerary: (state, action) => {
            const { id, itineraryId, value } = action.payload;
            const item = state.tripDayBreakdown.find((trip) => trip.id === id);
            if (item) {
                const itineraryItem = item.itinerary.find((it) => it.id === itineraryId);
                if (itineraryItem) {
                    itineraryItem.value = value;
                }
            }
        },
        addMedia: (state, action) => {
            const { id, files } = action.payload;
            const item = state.tripDayBreakdown.find((trip) => trip.id === id);
            if (item) {
                item.media.push(...files);
            }
        },
        resetTripBreakdown: () => initialState,
    },
});

export const {
    updateField,
    addItinerary,
    removeItinerary,
    updateItinerary,
    addMedia,
    resetTripBreakdown, addTripBreakdown
} = tripBreakdownSlice.actions;

export default tripBreakdownSlice.reducer;
