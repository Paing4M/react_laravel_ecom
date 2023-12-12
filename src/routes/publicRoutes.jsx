import React from 'react'
import Home from '../pages/front/home/Home'
import Register from '../pages/front/auth/Register'
import Login from '../pages/front/auth/Login'
import Page_403 from '../errorPages/Page_403'
import Page_404 from '../errorPages/Page_404'
import FrontLayout from '../layouts/front/FrontLayout'
import Product from '../pages/front/product/Product'
import ProductDetail from '../pages/front/product/ProductDetail'
import Shop from '../pages/front/shop/Shop'
import Cart from '../pages/front/cart/Cart'
export const publicRoutes = [
	{
		path: '/',
		element: (
			<FrontLayout>
				<Home />
			</FrontLayout>
		),
	},

	// {
	// 	path: '/category',
	// 	element: (
	// 		<FrontLayout>
	// 			<Category />
	// 		</FrontLayout>
	// 	),
	// },

	{
		path: '/shop',
		element: (
			<FrontLayout>
				<Shop />
			</FrontLayout>
		),
	},

	{
		path: '/shop/:slug',
		element: (
			<FrontLayout>
				<Shop />
			</FrontLayout>
		),
	},

	{
		path: '/cart',
		element: (
			<FrontLayout>
				<Cart />
			</FrontLayout>
		),
	},

	// {
	// 	path: '/category/:slug',
	// 	element: (
	// 		<FrontLayout>
	// 			<Product />
	// 		</FrontLayout>
	// 	),
	// },

	{
		path: '/product-detail/:id',
		element: (
			<FrontLayout>
				<ProductDetail />
			</FrontLayout>
		),
	},

	{
		path: '/product',
		element: (
			<FrontLayout>
				<Product />
			</FrontLayout>
		),
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
		path: '/forbidden',
		element: <Page_403 />,
	},

	{
		path: '*',
		element: <Page_404 />,
	},
]
