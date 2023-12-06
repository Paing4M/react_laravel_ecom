import { createSlice } from '@reduxjs/toolkit'

let initialState = {
	user: JSON.parse(localStorage.getItem('user')) || null,
	token: localStorage.getItem('token') || null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload.user
			state.token = action.payload.token

			localStorage.setItem('token', state.token)
			localStorage.setItem('user', JSON.stringify(state.user))
		},

		logoutUser(state) {
			state.user = null
			state.token = null

			localStorage.removeItem('token', state.token)
			localStorage.removeItem('user', JSON.stringify(state.user))
		},
	},
})

export default userSlice.reducer
export const { setUser, logoutUser } = userSlice.actions
