import { axiosInstance } from '../util/axiosInstance'

export const getOrdersRequest = async (page, perPage) => {
	const res = await axiosInstance.get(
		`/orders?page=${page}&per_page=${perPage}`
	)

	return {
		data: res.data.data,
		total: res.data.total,
		perPage: res.data.per_page,
	}
}
