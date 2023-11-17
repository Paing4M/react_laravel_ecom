import React from 'react'
import MainLayout from '../layouts/admin/MainLayout'
import Dashboard from '../pages/back/dashboard/Dashboard'
import Profile from '../pages/back/profile/Profile'
import AdminProtectedRoute from '../AdminProtectedRoute'
import Category from '../pages/back/category/Category'

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
				path: 'category',
				element: <AdminProtectedRoute component={Category} />,
			},

			{
				path: 'profile',
				element: <AdminProtectedRoute component={Profile} />,
			},
		],
	},
]
