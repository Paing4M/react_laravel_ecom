import { useMutation, useQuery } from 'react-query'
import {
	getAllProductsRequest,
	postProductRequest,
	updateProductRequest,
} from '../api/product.api'

const getProductQuery = (page, perPage) => {
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

export const useProduct = () => {
	return {
		postProductMutation,
		getProductQuery,
		updateProductMutation,
	}
}
