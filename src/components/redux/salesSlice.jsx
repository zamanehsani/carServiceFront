import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'; // Import axios

const initialSalesState = {
    error:      JSON.parse(localStorage.getItem('error')) || null,
    loading:    JSON.parse(localStorage.getItem('loading')) || false,
    sales:      JSON.parse(localStorage.getItem('sales')) || {},
};

const SalesSlice = createSlice({
    name: "sales",
    initialState: initialSalesState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getSales.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getSales.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = null;
            state.sales = action.payload;
            localStorage.setItem('sales', JSON.stringify(action.payload)); // Save the user data to local storage.
        })
        .addCase(getSales.rejected, (state)=>{
            state.loading = false;
            state.error = "Could not get sales, Something went wrong";
            localStorage.removeItem('sales'); // Remove the user from local storage if it fails to get the user data.
        })
    }
});

export const getSales = createAsyncThunk(
    'sales/getSales',
    async (params) => {
        const queryParams = {};
            if (params.pageSize) {
                queryParams.page_size = params.pageSize;
            }
            if (params.currentPage) {
                queryParams.page = params.currentPage;
            }
            if (params.company) {
                queryParams.company = params.company;
            }
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/customers/`,{ params:queryParams})

        return response.data; // Return the user data
    }
);

export default SalesSlice.reducer;

