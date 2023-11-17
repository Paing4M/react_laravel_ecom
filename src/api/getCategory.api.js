import { axiosInstance } from '../util/axiosInstance'

export const getCategoryRequest = async () => {
	try {
		const res = await axiosInstance.get('/categories')
		return res.data.data
	} catch (error) {
		throw Promise.reject(error)
	}
}
