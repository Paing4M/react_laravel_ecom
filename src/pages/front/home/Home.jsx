import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useProduct } from '../../../hooks/useProduct'
import Loading from '../../../components/back/Loading'
import style from './home.module.css'
import ProductList from '../../../components/front/ProductList'

function Home() {
	const { getRandomProductQuery, getProductQuery } = useProduct()
	const {
		data: randomProduct,
		isLoading: randomLoading,
		isSuccess: randomSuccess,
	} = getRandomProductQuery()

	const { data, isLoading, isSuccess } = getProductQuery(1, 8)

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
	}

	return (
		<>
			<div>
				<Slider {...settings}>
					{randomLoading && <Loading />}
					{randomSuccess &&
						randomProduct.length > 0 &&
						randomProduct.map((item) => (
							<div key={item.name + item.id} className={style.container}>
								<div className={style.overlay}></div>
								<img
									className={style.img}
									src={
										item.image
											? `${
													import.meta.env.VITE_API_BASE_URL
											  }/uploads/products/${item.image}`
											: '/default-img.png'
									}
									alt=''
								/>
								<div className={style.content}>
									<Link
										className={style.name}
										to={`/product-detail/${item.id}`}
									>
										{item.name}
									</Link>
									<h2>${item.selling_price || item.original_price}</h2>
									<Link
										className={style.link}
										to={`/product-detail/${item.id}`}
									>
										Go Detail
									</Link>
								</div>
							</div>
						))}
				</Slider>
			</div>

			<div className='mt-5'>
				<div className='d-flex align-items-center justify-content-between'>
					<h4 className='text-center h4'>Products</h4>
					<Link to='/shop'>All</Link>
				</div>

				<div className='mt-3 row'>
					{isLoading && <Loading />}
					{isSuccess &&
						data.data.length > 0 &&
						data.data.map((item) => (
							<div
								className='col-12 col-sm-6 col-md-4 col-lg-3 
								gap-2'
								key={item.name + item.id}
							>
								<ProductList
									id={item.id}
									image={item.image}
									name={item.name}
									price={item.original_price}
									sellingPrice={item.selling_price}
								/>
							</div>
						))}
				</div>
			</div>
		</>
	)
}

export default Home
