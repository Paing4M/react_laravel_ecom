import { useMutation, useQuery } from 'react-query'

import {
	getCategoryRequest,
	getEnableCategoryRequest,
	postCategoryRequest,
	updateCategoryRequest,
} from '../api/category.api'

const postCategoryMutation = () => {
	return useMutation({
		mutationKey: ['post', 'postCategory'],
		mutationFn: postCategoryRequest,
	})
}

const getCategoryQuery = (page, perPage) => {
	// console.log('inQuery->' + page)
	return useQuery({
		queryKey: ['get', 'getCategory', page, perPage],
		queryFn: () => getCategoryRequest(page, perPage),
	})
}

const getEnableCategoryQuery = () => {
	return useQuery({
		queryKey: ['get', 'getEnableCategory'],
		queryFn: getEnableCategoryRequest,
	})
}

const updateCategoryMutation = () => {
	return useMutation({
		mutationKey: ['patch', 'updateCategory'],
		mutationFn: updateCategoryRequest,
	})
}

export const useCategory = () => {
	return {
		postCategoryMutation,
		getCategoryQuery,
		updateCategoryMutation,
		getEnableCategoryQuery,
	}
}
