import { useMutation, useQuery } from 'react-query'
import {
	getAllProductsRequest,
	getProductByCategoryRequest,
	getProductDetailsRequest,
	getRandomProductRequest,
	postProductRequest,
	updateProductRequest,
} from '../api/product.api'

const getProductQuery = (page, perPage = 10) => {
	return useQuery({
		queryKey: ['get', 'getProduct', page, perPage],
		queryFn: () => getAllProductsRequest(page, perPage),
	})
}

const postProductMutation = () => {
	return useMutation({
		mutationKey: ['post', 'postProduct'],
		mutationFn: postProductRequest,
	})
}

const updateProductMutation = () => {
	return useMutation({
		mutationKey: ['patch', 'updateProduct'],
		mutationFn: updateProductRequest,
	})
}

const getProductByCategoryQuery = (slug) => {
	return useQuery({
		queryKey: ['get', 'getProductByCategory', slug],
		queryFn: () => getProductByCategoryRequest(slug),
		enabled: slug ? true : false,
	})
}

const getProductDetailsQuery = (id) => {
	return useQuery({
		queryKey: ['get', 'getProductDetails', id],
		queryFn: () => getProductDetailsRequest(id),
	})
}

const getRandomProductQuery = () => {
	return useQuery({
		queryKey: ['get', 'getRandomProduct'],
		queryFn: () => getRandomProductRequest(),
	})
}

export const useProduct = () => {
	return {
		postProductMutation,
		getProductQuery,
		updateProductMutation,
		getProductByCategoryQuery,
		getProductDetailsQuery,
		getRandomProductQuery,
	}
}
