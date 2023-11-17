import { useMutation, useQuery } from 'react-query'
import { postCategoryRequest } from '../api/postCategory.api'
import { getCategoryRequest } from '../api/getCategory.api'
import { updateCategoryRequest } from '../api/updateCategory.api'

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
