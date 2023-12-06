import { useMutation, useQuery } from 'react-query'
import {
	addToCartRequest,
	getCartProductRequest,
	updateQtyCartProductRequest,
} from '../api/cart.api'

const addToCartMutation = () => {
	return useMutation({
		mutationKey: ['post', 'addToCart'],
		mutationFn: addToCartRequest,
	})
}

const getCartProductQuery = () => {
	return useQuery({
		queryKey: ['get', 'getCartProduct'],
		queryFn: getCartProductRequest,
	})
}

const updateCartProductQtyMutation = (id) => {
	return useMutation({
		mutationKey: ['patch', 'updateCartProductQty', id],
		mutationFn: updateQtyCartProductRequest,
	})
}

export const useCart = () => {
	return {
		addToCartMutation,
		getCartProductQuery,
		updateCartProductQtyMutation,
	}
}
