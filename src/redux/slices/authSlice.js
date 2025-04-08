import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: '',
    agencyId: '',
    isFirstLogin: false,
    isAuthenticated: false,
    accessToken: '',
    refreshToken: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { email, agencyId, isFirstLogin, isAuthenticated, accessToken, refreshToken } = action.payload;
            state.email = email;
            state.agencyId = agencyId;
            state.isFirstLogin = isFirstLogin;
            state.isAuthenticated = isAuthenticated;

            if (accessToken) {
                state.accessToken = accessToken;
            }

            if (refreshToken) {
                state.refreshToken = refreshToken;
            }
        },
        logout: (state) => {
            // This clears persisted state on logout
            Object.assign(state, {
                email: '',
                agencyId: '',
                isFirstLogin: false,
                isAuthenticated: false,
                accessToken: '',
                refreshToken: '',
            })
        }

    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
