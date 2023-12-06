import React from 'react'
import Navbar from '../../components/front/Navbar'

const FrontLayout = ({ children }) => {
	return (
		<>
			<Navbar />
			<div className='py-4 container'>{children}</div>
		</>
	)
}

export default FrontLayout
