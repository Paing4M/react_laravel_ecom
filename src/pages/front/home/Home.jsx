import React from 'react'
import Navbar from '../../../layouts/front/Navbar'
import { useSelector } from 'react-redux'

function Home() {
	if (localStorage.getItem('token') !== null) {
		console.log('hello')
	}

	return (
		<>
			<Navbar />
			<div className='container'>home</div>
		</>
	)
}

export default Home
