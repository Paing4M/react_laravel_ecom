import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useCart } from '../../../hooks/useCart'
import Loading from '../../../components/back/Loading'
import { useState } from 'react'
import { deleteCartProductRequest } from '../../../api/cart.api'
import { toast } from 'react-toastify'
import { useQueryClient } from 'react-query'

const Cart = () => {
	const { user } = useSelector((state) => state.user)
	const [cartId, setCartId] = useState(null)
	const [qtyLoading, setQtyLoading] = useState(false)
	const navigate = useNavigate()
	const { getCartProductQuery, updateCartProductQtyMutation } = useCart()
	let {
		data: cartItems,
		isLoading,
		isSuccess,
		refetch,
	} = getCartProductQuery()
	const { mutateAsync: updateQtyMutateAsync } =
		updateCartProductQtyMutation(cartId)
	let totalPrice = 0
	let items = 0

	useEffect(() => {
		if (!user) {
			Swal.fire({
				title: 'Please login first.',
				icon: 'warning',
			})

			navigate('/login')
		}
	}, [user])

	useEffect(() => {
		refetch()
	}, [])

	const handleQty = async (id, status) => {
		setCartId(id)
		setQtyLoading(true)
		const item = cartItems.filter((item) => item.id === id)

		let qty = item[0].product_qty
		if (item) {
			// qty increase
			if (status == 'inc') {
				if (qty < item[0].product.qty) {
					qty = qty + 1
				}
			}

			// qty decrease
			if (status == 'dec') {
				if (qty > 1) {
					qty = qty - 1
				}
			}

			let data = {
				product_qty: qty,
			}
			await updateQtyMutateAsync(
				{ id, data },
				{
					onSuccess: (res) => {
						if (res.status == 200) {
							refetch()
							setQtyLoading(false)
						}
					},
					onError: (err) => {
						console.log(err)
					},
				}
			)
		}
	}

	const queryClient = useQueryClient()

	const deleteProduct = async (id) => {
		const res = await deleteCartProductRequest(id)
		if (res.status === 200) {
			toast.success(res.message)
			await queryClient.invalidateQueries({
				queryKey: ['get', 'getCartProduct'],
			})
		}
	}

	if (isLoading) return <Loading />

	let renderCart
	if (isSuccess && cartItems?.length > 0) {
		renderCart = cartItems.map((item) => {
			totalPrice +=
				(item.product.selling_price ?? item.product.original_price) *
				item.product_qty
			items = cartItems.length

			return (
				<tr key={item.id + '_' + item.slug}>
					<th scope='row'>
						<img
							style={{
								width: '80px',
								height: '80px',
								objectFit: 'cover',
								borderRadius: '.5rem',
							}}
							src={
								item.product.image
									? `${
											import.meta.env.VITE_API_BASE_URL
									  }/uploads/products/${item.product.image}`
									: 'default-img.png'
							}
							alt=''
						/>
					</th>
					<td className='align-middle'>{item.product.name}</td>
					<td className='align-middle'>
						${item.product.selling_price || item.product.original_price}
					</td>
					<td className='align-middle'>
						<div className='d-flex align-items-center border rounded border-dark'>
							<button
								disabled={qtyLoading}
								onClick={() => handleQty(item.id, 'dec')}
								className={`btn text-black border-start-0 border-top-0 border-bottom-0 border-dark ${
									qtyLoading ? 'text-secondary' : 'text-black'
								}`}
							>
								<FontAwesomeIcon icon={faMinus} />
							</button>
							<div
								style={{ flex: '1' }}
								className='p-1 text-center text-black'
							>
								{item.product_qty}
							</div>
							<button
								disabled={qtyLoading}
								onClick={() => handleQty(item.id, 'inc')}
								className={`btn text-black border-end-0 border-top-0 border-bottom-0 border-dark ${
									qtyLoading ? 'text-secondary' : 'text-black'
								}`}
							>
								<FontAwesomeIcon icon={faPlus} />
							</button>
						</div>
					</td>
					<td className='align-middle'>
						$
						{(item.product.selling_price ?? item.product.original_price) *
							item.product_qty}
					</td>
					<td className='align-middle'>
						<button
							onClick={() => deleteProduct(item.id)}
							className='btn fs-4 text-danger'
						>
							<FontAwesomeIcon icon={faCircleXmark} />
						</button>
					</td>
				</tr>
			)
		})
	} else {
		renderCart = (
			<tr>
				<td colSpan={6}>
					<p className='text-danger text-center'>Your cart is empty.</p>
				</td>
			</tr>
		)
	}

	return (
		<>
			<div className='mb-4'>
				<h4 className='text-black'>
					<Link className='text-black' to={'/'}>
						Home
					</Link>{' '}
					/ <Link>Cart</Link>
				</h4>
			</div>

			<div className='text-black row'>
				<div className='table-responsive col-md-12'>
					<table className='table'>
						<thead>
							<tr>
								<th scope='col'>Image</th>
								<th scope='col'>Name</th>
								<th scope='col'>Price</th>
								<th scope='col'>Qty</th>
								<th scope='col'>SubTotal</th>
								<th scope='col'>Remove</th>
							</tr>
						</thead>
						<tbody>{renderCart}</tbody>
					</table>
				</div>

				<div className='col-md-4'></div>
				<div className='col-md-8'>
					<div className='card card-body mt-3'>
						<h4>
							Subtotal ({items} items) :{' '}
							<span className='float-end'>${totalPrice}</span>
						</h4>
						<hr className='bg-black' />
						<button className='btn btn-primary'>Checkout</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Cart
