import React from 'react'
import { useProduct } from '../../../hooks/useProduct'
import { useParams } from 'react-router-dom'
import Loading from '../../../components/back/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { addToCartRequest, getCartProductRequest } from '../../../api/cart.api'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { useCart } from '../../../hooks/useCart'
import { QueryClient, useQueryClient } from 'react-query'

const ProductDetail = () => {
	const { id } = useParams()
	const { getProductDetailsQuery } = useProduct()
	const { data, isLoading, isSuccess, isError, error } =
		getProductDetailsQuery(id)
	const navigate = useNavigate()
	const [qtyValue, setQtyValue] = useState(1)
	const { user } = useSelector((state) => state.user)
	const { addToCartMutation } = useCart()
	const { mutateAsync: addToCartMutateAsync, isLoading: addLoading } =
		addToCartMutation()

	const handleIncrement = () => {
		if (qtyValue < data?.qty) {
			setQtyValue((prev) => prev + 1)
		}
	}

	const handleDecrement = () => {
		if (qtyValue > 1) {
			setQtyValue((prev) => prev - 1)
		}
	}

	if (isLoading) {
		return <Loading />
	}

	if (isError && error.response.status == 404) {
		return (
			<p className='text-center text-danger'>
				No Product Found.{' '}
				<span
					style={{ cursor: 'pointer' }}
					className='text-primary'
					onClick={() => navigate(-1)}
				>
					Go Back!
				</span>
			</p>
		)
	}

	const addToCart = async () => {
		const data = {
			product_id: id,
			product_qty: qtyValue,
		}

		await addToCartMutateAsync(data, {
			onSuccess: (res) => {
				if (res.status === 401) {
					Swal.fire({
						text: res.message,
						icon: 'warning',
					})
				}

				if (res.status === 404) {
					toast.error(res.message)
				}

				if (res.status === 409) {
					toast.warning(res.message)
				}

				if (res.status === 201) {
					toast.success(res.message)
				}
			},

			onError: (err) => {
				console.log(err)
			},
		})
	}

	return (
		<>
			<FontAwesomeIcon
				style={{
					cursor: 'pointer',
				}}
				className='mb-3 fw-semibold fs-4'
				onClick={() => navigate(-1)}
				icon={faArrowLeftLong}
			/>

			{isSuccess && data && (
				<div className='row d-flex flex-column flex-md-row align-items-start'>
					<div className='col-12 col-md-6'>
						<img
							style={{
								width: '100%',
								height: '300px',
								objectFit: 'cover',
								margin: '0 auto',
							}}
							src={
								data.image
									? `${
											import.meta.env.VITE_API_BASE_URL
									  }/uploads/products/${data.image}`
									: '/default-img.png'
							}
							alt=''
						/>
					</div>
					<div className='col-12  col-md-6 mt-3 mt-md-0'>
						<h1
							style={{ fontSize: '1.8rem' }}
							className='text-black fw-bold mb-2'
						>
							{data.name}
						</h1>

						<div className='d-flex align-items-center'>
							<p
								style={{
									fontSize: `${
										data.selling_price ? '1rem' : '1.1rem'
									}`,
									textDecoration: `${
										data.selling_price ? 'line-through' : ''
									}`,
									color: `${data.selling_price ? '' : 'black'}`,
								}}
								className='m-0 fw-semibold mr-2 p-0'
							>
								${data.original_price}
							</p>

							{data.selling_price && (
								<p
									style={{ fontSize: '1.1rem' }}
									className='m-0 fw-semibold text-black ml-2 p-0'
								>
									${data.selling_price}
								</p>
							)}
						</div>

						<div className='mt-2'>
							<button
								className={`btn btn-sm ${
									data.qty > 0 ? 'btn-success' : 'btn-danger'
								}`}
							>
								{data.qty > 0 ? 'Instock' : 'Out of Stock'}
							</button>
						</div>

						<div className='mt-3 d-flex flex-column'>
							<div className='w-50 d-flex align-items-center border rounded border-dark'>
								<button
									onClick={handleDecrement}
									className='btn border-start-0 border-top-0  border-bottom-0 border-dark '
								>
									<FontAwesomeIcon icon={faMinus} />
								</button>
								<div
									style={{ width: '80px', flex: '1' }}
									className='p-1 text-center text-black'
								>
									{qtyValue}
								</div>
								<button
									onClick={handleIncrement}
									className='btn border-end-0 border-top-0  border-bottom-0 border-dark'
								>
									<FontAwesomeIcon icon={faPlus} />
								</button>
							</div>

							<button className='btn btn-dark px-3 px-md-3 mt-3 w-50'>
								Add to wishlist
							</button>

							<button
								disabled={data.qty < 1 || addLoading}
								onClick={addToCart}
								className={`btn btn-primary px-3 px-md-3 mt-2 w-50 `}
							>
								Add to cart
							</button>
						</div>

						<div className='mt-3'>
							<p>{data.description}</p>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default ProductDetail
