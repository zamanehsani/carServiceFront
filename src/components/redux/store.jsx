import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import expensesSlice from "./expensesSlice";
import salesSlice from "./salesSlice";
import lngSlice from "./lngSlice";
export const store = configureStore({
    reducer: {  
        auth: authSlice,
        expenses: expensesSlice,
        sales: salesSlice,
        lng:lngSlice
      }
})
