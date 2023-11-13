import React from 'react'
import Home from '../pages/front/home/Home'
import Register from '../pages/front/auth/Register'
import Login from '../pages/front/auth/Login'

export const publicRoutes = [
	{
		path: '/',
		element: React.createElement(Home),
	},
	{
		path: '/register',
		element: React.createElement(Register),
	},
	{
		path: '/login',
		element: React.createElement(Login),
	},
]
