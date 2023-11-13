import React from 'react'
import MainLayout from '../layouts/admin/MainLayout'
import Dashboard from '../pages/back/dashboard/Dashboard'
import Profile from '../pages/back/profile/Profile'

export const adminRoutes = [
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
