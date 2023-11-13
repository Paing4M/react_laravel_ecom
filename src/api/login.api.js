import { axiosInstance } from '../util/axiosInstance'

export const loginRequest = async ({ email, password }) => {
	const data = {
		email,
		password,
	}
	let res = await axiosInstance.post('/login', data)
	return res.data
}
