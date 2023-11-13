import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider, useSelector } from 'react-redux'
import { store } from './store/store'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import { publicRoutes } from './routes/PublicRoutes'
import { adminRoutes } from './routes/AdminRoutes'
import axios from 'axios'
import { axiosInstance } from './util/axiosInstance'

function App() {
	const router = createBrowserRouter([...publicRoutes, ...adminRoutes])
	// axiosInstance.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
	// axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'
	// axiosInstance.defaults.headers.post['Accept'] = 'application/json'

	// axios.defaults.withCredentials = true
	axiosInstance.interceptors.request.use(function (config) {
		const token = localStorage.getItem('token')
		config.headers.Authorization = token ? `Bearer ${token}` : ''
		return config
	})

	return <RouterProvider router={router} />
}

export default App
