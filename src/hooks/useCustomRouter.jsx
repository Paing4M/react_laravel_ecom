import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'

const useCustomRouter = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Home />,
		},
		{
			path: '/register',
			element: <Register />,
		},
		{
			path: '/login',
			element: <Login />,
		},
		{
			path: '/admin',
			element: <MainLayout />,
			children: [
				{
					element: <Dashboard />,
					index: true,
				},
				{
					path: 'dashboard',
					element: <Dashboard />,
				},
				{
					path: 'profile',
					element: <Profile />,
				},
			],
		},
	])

	return <RouterProvider router={router} />
}

export default useCustomRouter
