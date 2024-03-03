import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'; // Import axios

const initialAuthState = {
    token:      JSON.parse(localStorage.getItem('token')) || null,
    error:      JSON.parse(localStorage.getItem('error')) || null,
    user:       JSON.parse(localStorage.getItem('user')) || null,
    company:    JSON.parse(localStorage.getItem('company')) || null,
    loading:        JSON.parse(localStorage.getItem('loading')) || false,
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
            localStorage.setItem('token', JSON.stringify(action.payload));
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
            localStorage.removeItem('user');
            localStorage.removeItem('company');
            localStorage.removeItem('expenses');
            localStorage.removeItem('sales');
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
        .addCase(getUser.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = null;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        })
        .addCase(getUser.pending, (state)=>{
            state.loading = true;
            state.error = null;
            state.user = null;
        })
        .addCase(getUser.rejected, (state)=>{
            state.loading = false;
            state.error = "Could not get user, Something went wrong";
            state.user = null;
            localStorage.removeItem('user'); // Remove the user from local storage if it fails to get the user data.
            localStorage.removeItem('token'); // Remove the token from local storage if it fails to get the user data.
            localStorage.removeItem('isAuthenticated'); // Remove the isAuthenticated flag from local storage if it fails to get the user data.
            state.token = null;
            state.isAuthenticated = false;
        })
        .addCase(getUserCompany.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = null;
            state.company = action.payload;
            localStorage.setItem('company', JSON.stringify(action.payload));
        })
        .addCase(getUserCompany.pending, (state)=>{
            state.loading = true;
            state.error = null;
            state.company = null;
        })
        .addCase(getUserCompany.rejected, (state)=>{
            state.loading = false;
            state.error = "Could not get user company, Something went wrong";
            state.user = null;
            state.company = null;
            localStorage.removeItem('company'); // Remove the user from local storage if it fails to get the user data.
            localStorage.removeItem('user'); // Remove the user from local storage if it fails to get the user data.
            localStorage.removeItem('token'); // Remove the token from local storage if it fails to get the user data.
            localStorage.removeItem('isAuthenticated'); // Remove the isAuthenticated flag from local storage if it fails to get the user data.
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

export const getUser = createAsyncThunk(
    'auth/getUser',
    async (username) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL }/api/get-user/`,{username})
        return response.data; // Return the user data
    }
)

export const getUserCompany = createAsyncThunk(
    'auth/getUserCompany',
    async (username) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL }/api/get-company/`,{username});
        return response.data; // Return the user data
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async () => { 
        return null;
    }
);

export default authSlice.reducer;

