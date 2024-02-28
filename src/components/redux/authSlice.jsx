import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'; // Import axios

const initialAuthState = {
    token: localStorage.getItem('token')||null,
    error: localStorage.getItem('error')||null,
    loading: localStorage.getItem('loading')|| false,
    isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(login.pending, (state)=>{
            state.loading = true;
            state.error = null;
            state.token = null;
            state.isAuthenticated = false;
        })
        .addCase(login.fulfilled, (state, action)=>{
            state.loading = false;
            state.token = action.payload;
            state.isAuthenticated = true;
            // Save to local storage
            localStorage.setItem('token', action.payload);
            localStorage.setItem('isAuthenticated', true);
        })
        .addCase(login.rejected, (state)=>{
            state.loading = false;
            state.error = "Ouh! Are you Sure you have entered the right username and password?";
            state.token = null;
            state.isAuthenticated = false;
        })
        .addCase(logout.fulfilled, (state)=>{
            state.loading = false;
            state.error = null;
            state.token = null;
            state.isAuthenticated = false;
            // Clear local storage
            localStorage.removeItem('token');
            localStorage.removeItem('isAuthenticated', false);
        })
        .addCase(logout.pending, (state)=>{
            state.loading = true;
            state.error = null;
            state.token = null;
            state.isAuthenticated = false;
        })
        .addCase(logout.rejected, (state)=>{
            state.loading = false;
            state.error = "Could not log out, Something went wrong";
            state.token = null;
            state.isAuthenticated = false;
        })
    }
});

export const login = createAsyncThunk(
    'auth/login',
    async (credentials) => {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/api/token/', credentials);
        return response.data;
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => { 
        return null;
    }
);

export default authSlice.reducer;

