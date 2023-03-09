import { createSlice } from '@reduxjs/toolkit';

const registrationSlice = createSlice({
    name: 'registration',
    initialState: {
        'registration': {
            'username': null,
            'password': null,
            'firstName': null,
            'lastName': null,
            'phone': null,
            'email': null,
        }
    },
    reducers: {
        setRegistration(state, action) {
            state.registration = { ...state.registration, ...action.payload }
        },
        removeRegistration(state) {
            state.registration = null;
        }
    }
});

export const { setRegistration, removeRegistration } = registrationSlice.actions;
export const registrationReducer = registrationSlice.reducer;