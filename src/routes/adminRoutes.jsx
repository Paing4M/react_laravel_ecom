import React from 'react'
import MainLayout from '../layouts/admin/MainLayout'
import Dashboard from '../pages/back/dashboard/Dashboard'
import Order from '../pages/back/order/Order'
import Category from '../pages/back/category/Category'
import Product from '../pages/back/product/Product'
import AdminProtectedRoute from './AdminProtectedRoute'

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
				path: 'product',
				element: <AdminProtectedRoute component={Product} />,
			},

			{
				path: 'order',
				element: <AdminProtectedRoute component={Order} />,
			},
		],
	},
]
