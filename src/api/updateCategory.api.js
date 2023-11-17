import { axiosInstance } from '../util/axiosInstance'

export const updateCategoryRequest = async ({
	id,
	meta_title,
	meta_keyword,
	meta_description,
	name,
	slug,
	description,
	status,
}) => {
	const res = await axiosInstance.patch(`/categories/${id}`, {
		meta_title,
		meta_keyword,
		meta_description,
		name,
		slug,
		description,
		status,
	})
	return res.data.data
}
