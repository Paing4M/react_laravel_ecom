import React from 'react'
import ProductCategoryList from '../../../components/front/ProductCategoryList'
import { useCategory } from '../../../hooks/useCategory'
import Loading from '../../../components/back/Loading'
import style from './shop.module.css'
import { useProduct } from '../../../hooks/useProduct'
import ProductList from '../../../components/front/ProductList'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Pagination from '../../../components/back/Pagination'
import { Link } from 'react-router-dom'

const Shop = () => {
	let totalPages
	const { getEnableCategoryQuery } = useCategory()
	const { getProductQuery, getProductByCategoryQuery } = useProduct()
	const [page, setPage] = useState(1)

	const {
		data: allProducts,
		isSuccess: allProductsSuccess,
		isLoading: allProductsLoading,
	} = getProductQuery(page, 6)

	const { slug } = useParams()
	const {
		data: categoryProducts,
		isSuccess: categoryProductsSuccess,
		isLoading: categoryProductsLoading,
	} = getProductByCategoryQuery(slug)
	const { data, isLoading, isSuccess } = getEnableCategoryQuery()

	const handlePageChange = (data) => {
		const currentPage = data.selected + 1
		setPage(currentPage)
	}

	if (slug) {
		totalPages = Math.ceil(
			categoryProducts?.meta?.total / categoryProducts?.meta?.per_page
		)
	} else {
		totalPages = Math.ceil(
			allProducts?.meta?.total / allProducts?.meta?.per_page
		)
	}

	let renderProducts
	if (slug) {
		if (categoryProductsSuccess && categoryProducts.data.length > 0) {
			renderProducts = categoryProducts.data.map((res) => (
				<div
					key={res.id + '_' + res.slug}
					className='col-12 col-md-6 col-lg-4  gap-2'
				>
					<ProductList
						id={res.id}
						image={res.image}
						name={res.name}
						price={res.original_price}
						sellingPrice={res.selling_price}
					/>
				</div>
			))
		} else {
			renderProducts = categoryProductsLoading ? (
				<Loading size={40} />
			) : (
				<p className='text-center text-danger'>No product found!</p>
			)
		}
	} else {
		if (allProductsSuccess && allProducts.data.length > 0) {
			renderProducts = allProducts.data.map((res) => (
				<div className='col-12 col-md-6 col-lg-4 gap-2'>
					<ProductList
						key={res.id + res.name}
						id={res.id}
						image={res.image}
						name={res.name}
						price={res.original_price}
						sellingPrice={res.selling_price}
					/>
				</div>
			))
		} else {
			renderProducts = allProductsLoading ? (
				<Loading size={40} />
			) : (
				<p className='text-center text-danger'>No product found!</p>
			)
		}
	}

	if (isLoading) {
		return <Loading />
	}

	return (
		<>
			<div className='row'>
				<div className='col-12 mb-4'>
					<h4 className='text-black'>
						<Link className='text-black' to={'/'}>
							Home
						</Link>{' '}
						/ <Link className='text-[#A6A6DF]'>Shop</Link>
					</h4>
				</div>
				<div className='col-lg-3 col-md-4 col-sm-4 col-xs-12'>
					<h5 className='border-b mb-3'>Categories</h5>
					<ul className={`${style.lists} p-0 text-black`}>
						{isSuccess && (
							<ProductCategoryList linkTo={'/shop'} name={'all'} />
						)}
						{isSuccess &&
							data.length > 0 &&
							data.map((res) => (
								<ProductCategoryList
									key={res.id + res.slug}
									linkTo={`/shop/${res.slug}`}
									name={res.name}
								/>
							))}
					</ul>
				</div>

				<div className='col-lg-9 col-md-8 col-sm-8 col-xs-12'>
					<h5
						style={{
							borderBottom: '4px solid #a6a6df',
							width: 'fit-content',
						}}
						className='border-b mb-3 pb-1'
					>
						{slug ? slug : 'All Product'}
					</h5>
					<div className='row'>{renderProducts}</div>

					{totalPages > 1 && (
						<div className='d-flex justify-content-end'>
							<Pagination
								handlePageChange={handlePageChange}
								totalPages={totalPages}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default Shop
