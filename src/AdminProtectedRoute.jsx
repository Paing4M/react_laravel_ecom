import React from 'react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { axiosInstance } from './util/axiosInstance'
import { useEffect } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function AdminProtectedRoute({ component: Component }) {
	// const isAuthenticated = localStorage.getItem('token')
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	const override = {
		display: 'block',
		margin: '0 auto',
	}

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
			console.log(err)
			if (err?.response?.status === 401) {
				// toast.warning(err.response.data.message, {
				// 	position: 'top-center',
				// 	autoClose: 3000,
				// 	hideProgressBar: false,
				// 	closeOnClick: true,
				// 	pauseOnHover: true,
				// 	draggable: true,
				// 	progress: undefined,
				// 	theme: 'light',
				// })

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
			console.log(err)

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
		return (
			<ClipLoader
				color='#1233a9'
				loading={loading}
				cssOverride={override}
				size={60}
				aria-label='Loading Spinner'
				data-testid='loader'
			/>
		)
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
