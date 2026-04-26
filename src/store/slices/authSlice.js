import { createSlice } from '@reduxjs/toolkit';
import { mockUsers } from '../../utils/mockData';
import axios from 'axios';

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signupStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signupSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        signupFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user');
        },
        loadUserFromStorage: (state) => {
            const user = localStorage.getItem('user');
            if (user) {
                state.user = JSON.parse(user);
                state.isAuthenticated = true;
            }
        },
        clearAllErrors(state) {
            state.error = null;
            state.loading = false;
            state.user = state.user;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    signupStart,
    signupSuccess,
    signupFailure,
    logout,
    loadUserFromStorage,
    clearAllErrors
} = authSlice.actions;

export const loginUser = (email, password) => async (dispatch) => {
    dispatch(loginStart());

    try {
        const response = await axios.post(
            "http://localhost:8080/auth/login",
            {
                email: email,
                password: password
            }
        );

        if (response) {
            dispatch(loginSuccess(response.data.data));
        }
    } catch (error) {
        dispatch(loginFailure());
        dispatch(clearAllErrors());
    }
};

export const signupUser = (userData) => async (dispatch) => {
    dispatch(signupStart());

    try {
        const response = await axios.post(
            "http://localhost:8080/auth/signup",
            userData,
        );

        if (response) {
            dispatch(signupSuccess(response.data.data));
        }
    } catch (error) {
        dispatch(signupFailure());
        dispatch(clearAllErrors());
    }

};

// export const clearAllUserErrors = () => (dispatch) => {
//     dispatch(clearAllErrors());
// };

export const loadUserFromLocalStorage = () => (dispatch) => {
    dispatch(loadUserFromStorage());
}

export default authSlice.reducer;
