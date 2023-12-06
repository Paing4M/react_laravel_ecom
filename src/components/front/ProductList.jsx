import React from 'react'
import { Link } from 'react-router-dom'
import { addToCartRequest } from '../../api/cart.api'

const ProductList = ({ id, image, name, price, sellingPrice = null }) => {
	return (
		<div className='card mb-4'>
			<Link to={`/product-detail/${id}`}>
				<img
					style={{
						height: '220px',
						objectFit: 'cover',
					}}
					src={
						image
							? `${
									import.meta.env.VITE_API_BASE_URL
							  }/uploads/products/${image}`
							: '/default-img.png'
					}
					className='card-img-top'
					alt={image}
				/>
			</Link>
			<div className='card-body'>
				<div className='d-flex justify-content-between align-items-center'>
					<Link className='card-title h-5 fw-bold m-0'>{name}</Link>

					<div className=''>
						<p
							style={{
								textDecoration: `${sellingPrice ? 'line-through' : ''}`,
								fontSize: `${sellingPrice && '13px'}`,
							}}
							className={`fw-bold m-0 ${
								sellingPrice ? 'text-secondary' : ''
							}`}
						>
							${price}
						</p>
						{sellingPrice && (
							<p className='fw-bold m-0 '>${sellingPrice}</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductList
