import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	area: [],
	loadingArea: false
}

export const areaSlice = createSlice({
	name: 'area',
	initialState,
	reducers: {
		fetchingArea: state => {
			state.loadingArea = true
		},
		fetchedArea: (state, action) => {
			state.area = action.payload
			state.loadingArea = false
		},
		fetchingErrorArea: state => {
			state.loadingArea = false
		}
	}
})


export const {fetchedArea, fetchingArea, fetchingErrorArea} = areaSlice.actions


export default areaSlice.reducer