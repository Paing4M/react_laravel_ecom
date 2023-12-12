import { axiosInstance } from '../util/axiosInstance'

const checkoutRequest = async (data) => {
	const res = await axiosInstance.post('/checkout', data)
	return res.data
}

const checkSuccessPaymentRequest = async (data) => {
	const res = await axiosInstance.post('/check-payment-success', data)
	return res.data
}

export { checkoutRequest, checkSuccessPaymentRequest }
