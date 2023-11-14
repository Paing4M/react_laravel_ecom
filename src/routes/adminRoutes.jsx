import React from 'react'
import MainLayout from '../layouts/admin/MainLayout'
import Dashboard from '../pages/back/dashboard/Dashboard'
import Profile from '../pages/back/profile/Profile'
import AdminProtectedRoute from '../AdminProtectedRoute'

export const adminRoutes = [
	{
		path: '/admin',
		element: <MainLayout />,
		children: [
			{
				element: <AdminProtectedRoute component={Dashboard} />,
				index: true,
			},
			{
				path: 'dashboard',
				element: <AdminProtectedRoute component={Dashboard} />,

			},
			{
				path: 'profile',
				element: <Profile />,
			},
		],
	},

	{
		path: '/admin',
		element: React.createElement(MainLayout),
		children: [
			{
				element: React.createElement(Dashboard),
				index: true,
			},
			{
				path: 'dashboard',
				element: React.createElement(Dashboard),
			},
			{
				path: 'profile',
				element: React.createElement(Profile),
			},
		],
	},
]
