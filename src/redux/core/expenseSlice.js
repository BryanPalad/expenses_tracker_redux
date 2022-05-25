import { createSlice } from "@reduxjs/toolkit";

const initialList = () => {
    const list = localStorage.getItem('expense-list');
    let expenses = [];
    if(list) {
        expenses = JSON.parse(list);
    }
    return expenses;
}
const initialState = {
    expenseList: initialList(),
    query: "",
}
export const expenseSlice = createSlice({
    name: 'expense',
    initialState, 
    reducers : {
        addExpense: (state, action) => {
            localStorage.setItem('expense-list', JSON.stringify([...state.expenseList, action.payload]));
            state.expenseList.push(action.payload);
        }, 
        deleteExpense: (state, action) => {
            state.expenseList = state.expenseList.filter((expense) => expense.createdAt !== action.payload.createdAt);
            localStorage.setItem('expense-list', JSON.stringify([...state.expenseList]));
        },
        updateExpense: (state, action) => {
            state.expenseList.map((expense) => {
                if(expense.createdAt === action.payload.createdAt) {
                    expense.title = action.payload.title;
                    expense.amount = JSON.parse(action.payload.itemAmount);
                    expense.category = action.payload.category;
                    localStorage.setItem('expense-list', JSON.stringify([...state.expenseList]))
                }
            })
        },
        searchExpense: (state, action) => {
            const {query} = action.payload
            return {
                ...state,
                query,
            }
        }
    }
})

export const {addExpense, deleteExpense, updateExpense, searchExpense} = expenseSlice.actions;
export default expenseSlice.reducer;
