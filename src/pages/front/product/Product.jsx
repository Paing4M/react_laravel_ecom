import React from 'react'
import { useParams } from 'react-router-dom'
import { useProduct } from '../../../hooks/useProduct'
import Loading from '../../../components/back/Loading'
import ProductList from '../../../components/front/ProductList'
import { Link } from 'react-router-dom'

const Product = () => {
	const { slug } = useParams()
	const { getProductByCategoryQuery } = useProduct()
	const { data, isLoading, isSuccess, isError, error } =
		getProductByCategoryQuery(slug)

	return (
		<div className='row'>
			<div className='col-12'>
				<h5 className='mb-4 text-black'>
					<Link className='text-black' to={'/category'}>
						Category
					</Link>{' '}
					/{' '}
					<span
						style={{
							borderBottom: '4px solid #a6a6df',
						}}
					>
						{slug}
					</span>
				</h5>
				<div className='row'>
					<Loading loading={isLoading} />

					{isError && error.response.status == 404 && (
						<p className='text-center  text-danger'>
							Product not found.{' '}
							<Link to={'/category'} className='text-primary'>
								Go Back!
							</Link>{' '}
						</p>
					)}

					{isSuccess &&
						data.length > 0 &&
						data.map((res) => (
							<ProductList
								key={res.id}
								id={res.id}
								name={res.name}
								price={res.original_price}
								image={res.image}
							/>
						))}
				</div>
			</div>
		</div>
	)
}

export default Product
