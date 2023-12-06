import React from 'react'
import { Link } from 'react-router-dom'

const ProductCategoryList = ({ linkTo, name }) => {
	const isActive = () => {
		return isActive ? 'border-b-2 border-[#A6A6DF]' : ''
	}

	return (
		<li className='mb-2 '>
			<Link className='text-black' to={linkTo}>
				{name}
			</Link>
		</li>
	)
}

export default ProductCategoryList
