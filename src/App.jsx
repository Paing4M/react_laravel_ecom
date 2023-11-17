import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import { publicRoutes } from './routes/PublicRoutes'
import { adminRoutes } from './routes/AdminRoutes'
import { axiosInstance } from './util/axiosInstance'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap'

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
