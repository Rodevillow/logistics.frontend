// @ts-ignore
import { createReducer } from '@reduxjs/toolkit';
import { setAuthUser } from './authActions';

interface AuthState {
    token: any | null;
}

const initialState: AuthState = {
    token: null,
};

const authReducer = createReducer(initialState, (builder:any) => {
    builder.addCase(setAuthUser, (state:any, action:any) => {
        state.token = action.payload.token;
    });
});

export default authReducer;