import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slide/userSlide'

export const store = configureStore({
	reducer: {
		user: userReducer,
	},
})
