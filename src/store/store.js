import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./reducer/categoryslice";
import mealsReducer from './reducer/mealsSlice'
import infoOfCategory from "./reducer/infoOfCategory";
import areaReducer from "./reducer/areaSlice";
import cartReducer from './reducer/cartSlice'
export const store = configureStore ({
	reducer: {
	category: categoryReducer,
	meals: mealsReducer,
	info: infoOfCategory,
	area: areaReducer,
	cart: cartReducer,
	},
})
