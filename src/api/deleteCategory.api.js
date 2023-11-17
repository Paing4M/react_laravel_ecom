import { axiosInstance } from '../util/axiosInstance'

export const deleteCategoryRequest = async (id) => {
	const res = await axiosInstance.delete('/categories/' + id)
	return res.data
}
