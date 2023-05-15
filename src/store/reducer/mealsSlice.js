import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    meals: [],
    loadingMeals: false,
}

export const mealsSlice = createSlice({
    name: 'meals',
    initialState,
    reducers: {
        fetchingMeals: (state) => {
            state.loadingMeals = true
        },
        fetchedMeals: (state, action) => {
            state.meals = action.payload
            state.loadingMeals = false
        },
        fetchingErrorMeals: (state) => {
            state.loadingMeals = false
        },
    }

})


export const {
    fetchingMeals,
    fetchedMeals,
    fetchingErrorMeals,
} = mealsSlice.actions


export default mealsSlice.reducer



