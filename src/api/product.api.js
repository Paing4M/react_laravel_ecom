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

const getProductByCategoryRequest = async (slug) => {
	const res = await axiosInstance.get('/get-product-by-category/' + slug)
	return {
		data: res.data.data,
		meta: res.data.meta,
	}
}

const getProductDetailsRequest = async (id) => {
	const res = await axiosInstance.get(`/products/${id}`)
	return res.data.data
}

const getRandomProductRequest = async () => {
	const res = await axiosInstance.get('/random_products')
	return res.data
}

export {
	postProductRequest,
	getAllProductsRequest,
	updateProductRequest,
	deleteProductRequest,
	getProductByCategoryRequest,
	getProductDetailsRequest,
	getRandomProductRequest,
}
