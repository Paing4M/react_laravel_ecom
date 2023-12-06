import React from 'react'
import { useCategory } from '../../hooks/useCategory'
import ProductCategoryList from './ProductCategoryList'
import Loading from '../back/Loading'
import style from './css/sidebar.module.css'

const Sidebar = () => {
	const { getEnableCategoryQuery } = useCategory()
	const { data, isLoading, isSuccess } = getEnableCategoryQuery()

	return (
		<div className={style.sidebarContainer}>
			<h5 className='mb-3'>Categories</h5>
			<ul className={`p-0 ${style.listContainer}`}>
				<ProductCategoryList title={'All'} />

				{isLoading && <Loading size={30} />}
				{isSuccess &&
					data.length > 0 &&
					data.map((res) => <ProductCategoryList title={res.name} />)}
			</ul>
		</div>
	)
}

export default Sidebar
