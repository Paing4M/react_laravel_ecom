import React from 'react'
import style from './category.module.css'
import { useCategory } from '../../../hooks/useCategory'
import ProductCategoryList from '../../../components/front/ProductCategoryList'
import Loading from '../../../components/back/Loading'

const Category = () => {
	const { getEnableCategoryQuery } = useCategory()
	const { data, isLoading, isSuccess } = getEnableCategoryQuery()

	return (
		<div>
			<h5 className='mb-4 text-black'>Category</h5>
			<ul className={`p-0 ${style.collectionList}`}>
				{isLoading && <Loading size={30} />}
				{isSuccess && <ProductCategoryList name={'all'} />}
				{isSuccess &&
					data.length > 0 &&
					data.map((res) => (
						<ProductCategoryList
							key={res.id}
							linkTo={`/category/${res.slug}`}
							name={res.name}
						/>
					))}
			</ul>
		</div>
	)
}

export default Category
