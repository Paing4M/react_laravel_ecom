import { axiosInstance } from '../util/axiosInstance'

const getAllProductsRequest = async (page, perPage) => {
	const res = await axiosInstance.get(
		`/products?page=${page}&per_page=${perPage}`
	)
	return {
		data: res.data.data,
		meta: res.data.meta,
	}
}

const postProductRequest = async (data) => {
	const res = await axiosInstance.post('/products', data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
	return res.data.data
}

const updateProductRequest = async ({ data, id }) => {
	const res = await axiosInstance.post(`products/${id}`, data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
	return res.data.data
}

const deleteProductRequest = async (id) => {
	const res = await axiosInstance.delete(`/products/${id}`)
	return res
}

export {
	postProductRequest,
	getAllProductsRequest,
	updateProductRequest,
	deleteProductRequest,
}
