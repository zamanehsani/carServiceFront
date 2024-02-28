import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'; // Import axios

const initialAuthState = {
    token: null,
    error: null,
    loading: false,
    isAuthenticated: false,
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
            state.token = action.payload.token;
            state.isAuthenticated=true;
        })
        .addCase(login.rejected, (state)=>{
            state.loading = false;
            state.error = "Something went wrong";
            state.token = null;
            state.isAuthenticated = false;
        })
        .addCase(logout.fulfilled, (state)=>{
            state.loading = false;
            state.error = null;
            state.token = null;
            state.isAuthenticated = false;
        })
        .addCase(logout.pending, (state)=>{
            state.loading = true;
            state.error = null;
            state.token = null;
            state.isAuthenticated = false;
        })
        .addCase(logout.rejected, (state)=>{
            state.loading = false;
            state.error = "Something went wrong";
            state.token = null;
            state.isAuthenticated = false;
        })
    }
});

export const login = createAsyncThunk(
    'auth/login',
    async (credentials) => {
        console.log("trying to login...", axios.post(process.env.REACT_APP_API_URL + '/api/token/', credentials))
        const response = await axios.post(process.env.REACT_APP_API_URL + '/api/token/', credentials);
        console.log("login - response: ", response);
        return response.data; // Replace with your API endpoint and response structure
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
    await axios.get('/api/logout'); // Replace with your API endpoint
    return null;
});

export default authSlice.reducer;

