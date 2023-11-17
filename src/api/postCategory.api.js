import { axiosInstance } from '../util/axiosInstance'

export const postCategoryRequest = async ({
	meta_title,
	meta_keyword,
	meta_desc,
	name,
	slug,
	desc,
	status,
}) => {
	const res = await axiosInstance.post('/categories', {
		meta_title,
		meta_keyword,
		meta_desc,
		name,
		slug,
		desc,
		status,
	})
	return res.data
}
