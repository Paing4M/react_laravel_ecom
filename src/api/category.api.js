import { axiosInstance } from '../util/axiosInstance'

const getCategoryRequest = async () => {
	try {
		const res = await axiosInstance.get('/categories')
		return res.data.data
	} catch (error) {
		throw Promise.reject(error)
	}
}

const postCategoryRequest = async ({
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

const updateCategoryRequest = async ({
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

const deleteCategoryRequest = async (id) => {
	const res = await axiosInstance.delete('/categories/' + id)
	return res
}

export {
	getCategoryRequest,
	postCategoryRequest,
	updateCategoryRequest,
	deleteCategoryRequest,
}
