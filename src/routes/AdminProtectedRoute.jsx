import React from 'react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { axiosInstance } from '../util/axiosInstance'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Loading from '../components/back/Loading'

function AdminProtectedRoute({ component: Component }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		axiosInstance.get('/isAuthenticated').then((res) => {
			// console.log(res)
			if (res.status === 200) {
				setIsAuthenticated(true)
			}
			setLoading(false)
		})

		return () => {
			setIsAuthenticated(false)
		}
	}, [])

	axiosInstance.interceptors.response.use(
		undefined,
		function axiosRetryInterceptor(err) {
			// console.log(err)
			if (err?.response?.status === 401) {
				Swal.fire({
					title: err.response.data.message,
					icon: 'warning',
				})

				navigate('/')
			}

			return Promise.reject(err)
		}
	)

	axiosInstance.interceptors.response.use(
		function (res) {
			return res
		},
		function (err) {
			// console.log(err)

			if (err?.response?.status === 403) {
				Swal.fire({
					title: 'Forbidden',
					text: err.response.data.message,
					icon: 'warning',
				})

				navigate('/forbidden')
			}

			return Promise.reject(err)
		}
	)

	if (loading) {
		return <Loading loading={loading} />
	}

	return isAuthenticated ? (
		<Component />
	) : (
		<Navigate
			to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
			replace='true'
		/>
	)
}

export default AdminProtectedRoute
