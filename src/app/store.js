import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from '../redux/core/expenseSlice';

export const store = configureStore({
    reducer: {
        expense: expenseReducer,
    }
})