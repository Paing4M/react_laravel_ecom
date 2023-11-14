import React from 'react'
import Home from '../pages/front/home/Home'
import Register from '../pages/front/auth/Register'
import Login from '../pages/front/auth/Login'
import Page_403 from '../errorPages/Page_403'

export const publicRoutes = [
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
		path: '/forbidden',
		element: <Page_403 />,
	},
]