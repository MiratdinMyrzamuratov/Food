import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	info: [],
	loadingInfo: false
}


export const infoCategory = createSlice({
	name: 'info',
	initialState,
	reducers: {
		fetchingInfoTime: state => {
			state.loadingInfo = true
		},
		fethcedInfo: (state, action) => {
			state.info = action.payload,
			state.loadingInfo = false
		},
		fetchingErrorInfo: state => {
			state.loadingInfo = false
		}
	}
})



export const {
	fethcedInfo,
	fetchingInfoTime,
	fetchingErrorInfo
} = infoCategory.actions



export default infoCategory.reducer