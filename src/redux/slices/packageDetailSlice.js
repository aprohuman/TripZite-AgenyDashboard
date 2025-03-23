import { createSlice } from "@reduxjs/toolkit";


// const initialState = {
//     packageTripDetail: {
//         id: 0,
//         country: '',
//         state: '',
//         city: '',
//         days: 0,
//     }
// }

// const packageDetailSlice = createSlice({
//     name: 'packageTripDetail',
//     initialState,
//     reducers: {

//         setCountry: (state, action) => {
//             state.packageTripDetail.country = action.payload
//         },
//         setState: (state, action) => {
//             state.packageTripDetail.state = action.payload
//         },
//         setCity: (state, action) => {
//             state.packageTripDetail.city = action.payload
//         },
//         setDays: (state, action) => {
//             state.packageTripDetail.days = action.payload
//         },
//     }
// })

// export const { setCountry, setState, setCity, setDays } = packageDetailSlice.actions;
// export default packageDetailSlice.reducer



const initialState = {
    trips: [{
        id: 0,
        country: '',
        state: '',
        city: '',
        days: 0,
    }]
}

const packageDetailSlice = createSlice({
    name: 'packageTripDetail',
    initialState,
    reducers: {
        addTrip: (state, action) => {
            state.trips.push({
                id: state.trips.length,
                country: action.payload?.country || '',
                state: action.payload?.state || '',
                city: '',
                days: 0
            })
        },
        updateTrip: (state, action) => {
            const { id, name, value } = action.payload;
            const trip = state.trips.find(trip => trip.id === id);
            if (trip) {
                if (name === 'country') {
                    trip[name] = value;
                    trip['state'] = '';
                    trip['city'] = '';
                    trip['days'] =
                        0;

                } else if (name === 'state') {
                    trip[name] = value;
                    trip['city'] = '';


                } else if (name === 'days') {
                    trip[name] = value === '' ? 0 : parseInt(value, 10);
                } else {
                    trip[name] = value;
                }
            }
        },
        removeTrip: (state, action) => {
            state.trips = state.trips.filter(trip => trip.id !== action.payload);
        }
    }
})

export const { addTrip, updateTrip, removeTrip } = packageDetailSlice.actions;
export default packageDetailSlice.reducer;