import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'; // Import axios

const initialExpenseState = {
    error:      JSON.parse(localStorage.getItem('error')) || null,
    loading:    JSON.parse(localStorage.getItem('loading')) || false,
    expenses:   JSON.parse(localStorage.getItem('expenses')) || {},
};

const ExpensesSlice = createSlice({
    name: "expenses",
    initialState: initialExpenseState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getExpenses.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getExpenses.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = null;
            state.expenses = action.payload;
            localStorage.setItem('expenses', JSON.stringify(action.payload)); // Save the user data to local storage.
        })
        .addCase(getExpenses.rejected, (state)=>{
            state.loading = false;
            state.error = "Could not get expenses, Something went wrong";
            localStorage.removeItem('expenses'); // Remove the user from local storage if it fails to get the user data.
        })
    }
});

export const getExpenses = createAsyncThunk(
    'expenses/getExpenses',
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
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/invoices/`,{ params:queryParams})

        return response.data; // Return the user data
    }
);


export default ExpensesSlice.reducer;

