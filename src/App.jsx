import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import { axiosInstance } from './util/axiosInstance'
import { publicRoutes } from './routes/publicRoutes'
import { adminRoutes } from './routes/adminRoutes'

function App() {
	const router = createBrowserRouter([...publicRoutes, ...adminRoutes])

	axiosInstance.interceptors.request.use(function (config) {
		const token = localStorage.getItem('token')
		config.headers.Authorization = token ? `Bearer ${token}` : ''
		return config
	})

	return <RouterProvider router={router} />
}

export default App
