import { axiosInstance } from '../util/axiosInstance'

const addToCartRequest = async (data) => {
	const res = await axiosInstance.post('/add-to-cart', data)
	return res.data
}

const getCartProductRequest = async () => {
	const res = await axiosInstance.get('/cart-items')
	return res.data.cart
}

const updateQtyCartProductRequest = async ({ id, data }) => {
	const res = await axiosInstance.patch('/cart-items-updateQty/' + id, data)
	return res.data
}

const deleteCartProductRequest = async (id) => {
	const res = await axiosInstance.delete('/cart-item-delete/' + id)
	return res.data
}

const deleteCartRequest = async () => {
	const res = await axiosInstance.delete('/cart-delete')
	return res.data
}

export {
	addToCartRequest,
	getCartProductRequest,
	updateQtyCartProductRequest,
	deleteCartProductRequest,
	deleteCartRequest,
}
