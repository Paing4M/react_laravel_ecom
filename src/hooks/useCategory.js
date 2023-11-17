import { useMutation, useQuery } from 'react-query'
import {
	getCategoryRequest,
	postCategoryRequest,
	updateCategoryRequest,
} from '../api/category.api'

const postCategoryMutation = () => {
	return useMutation({
		mutationKey: ['post', 'postCategory'],
		mutationFn: postCategoryRequest,
	})
}

const getCategoryMutation = () => {
	return useQuery({
		queryKey: ['get', 'getCategory'],
		queryFn: getCategoryRequest,
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
		getCategoryMutation,
		updateCategoryMutation,
	}
}
