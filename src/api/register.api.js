import { axiosInstance } from '../util/axiosInstance'

export const registerRequest = async ({
	name,
	email,
	password,
	password_confirmation,
}) => {
	let res = await axiosInstance.post('/register', {
		name,
		email,
		password,
		password_confirmation,
	})
	return res.data
}
