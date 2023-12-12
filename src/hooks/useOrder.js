import { useQuery } from 'react-query'
import { getOrdersRequest } from '../api/order.api'

const getOrdersQuery = (page, perPage) => {
	return useQuery({
		queryKey: ['get', 'getOrders', page, perPage],
		queryFn: () => getOrdersRequest(page, perPage),
	})
}

export const useOrder = () => {
	return {
		getOrdersQuery,
	}
}
