import React from 'react'
import { useState } from 'react'
import Modal from '../../../components/back/Modal'
import ProductModalChild from '../../../components/back/ProductModalChild'
import { useProduct } from '../../../hooks/useProduct'
import { useEffect } from 'react'
import slugify from 'react-slugify'
import { useCategory } from '../../../hooks/useCategory'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import Loading from '../../../components/back/Loading'
import { BarLoader } from 'react-spinners'
import ProductList from '../../../components/back/ProductList'
import { axiosInstance } from '../../../util/axiosInstance'
import { deleteProductRequest } from '../../../api/product.api'
import Swal from 'sweetalert2'
import Pagination from '../../../components/back/Pagination'

const Product = () => {
	const [openModal, setOpenModal] = useState(false)
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState('')
	const [editId, setEditId] = useState(null)
	const [editLoading, setEditLoading] = useState(false)
	const [errors, setErrors] = useState({})
	const [image, setImage] = useState([])
	const [demoImg, setDemoImg] = useState(null)
	const [searchTerm, setSearchTerm] = useState('')
	const [checkBoxes, setCheckBoxes] = useState({})
	const [inputFields, setInputFields] = useState({
		meta_title: '',
		meta_keyword: '',
		meta_description: '',
		name: '',
		slug: '',
		brand: '',
		category_id: '',
		description: '',
		selling_price: '',
		original_price: '',
		qty: '',
	})
	const { postProductMutation, getProductQuery, updateProductMutation } =
		useProduct()
	const { mutateAsync: mutateAsyncPostProduct } = postProductMutation()
	const { mutateAsync: mutateAsyncUpdateProduct } = updateProductMutation()
	const {
		data: products,
		isLoading,
		isSuccess,
	} = getProductQuery(page, perPage)
	const { getEnableCategoryQuery } = useCategory()
	const categoryData = getEnableCategoryQuery()

	const queryClient = useQueryClient()

	const totalPages = Math.ceil(
		products?.meta?.total / products?.meta?.per_page
	)

	const handlePageChange = (data) => {
		const currentPage = data.selected + 1
		setPage(currentPage)
	}

	const handlePerpage = (e) => {
		setPerPage(e.target.value)
	}

	const handleOpenModal = async () => {
		setOpenModal(true)

		// when update on category to fetch new category instantly
		await queryClient.invalidateQueries({
			queryKey: ['get', 'getEnableCategory'],
		})
	}

	const handleCloseModal = () => {
		setDefaultInputField()
		setErrors({})
		setOpenModal(false)
		setEditId(null)
		setDemoImg(null)
	}

	const setDefaultInputField = () => {
		setInputFields({
			meta_title: '',
			meta_keyword: '',
			meta_description: '',
			name: '',
			slug: '',
			brand: '',
			category_id: '',
			description: '',
			selling_price: '',
			original_price: '',
			qty: '',
			featured: 0, // 0  = not featured
			popular: 0, // 0 = not popular
			status: 0, // 0 = enable
		})
	}

	const handleInput = (e) => {
		setInputFields({ ...inputFields, [e.target.name]: e.target.value })
	}

	const handleCheckBoxes = (e) => {
		// console.log(e.target.checked)
		setCheckBoxes({ ...checkBoxes, [e.target.name]: e.target.checked })
	}

	const handleImage = (e) => {
		setImage({
			image: e.target.files[0],
		})

		if (e.target.files && e.target.files[0]) {
			setDemoImg(URL.createObjectURL(e.target.files[0]))
		}
	}

	// generate slug base on name field
	useEffect(() => {
		setInputFields({ ...inputFields, slug: slugify(inputFields.name) })
	}, [inputFields.name])

	const handleSuccess = async (toastrMsg) => {
		// close the modal
		handleCloseModal()

		// create success message
		toast.success(toastrMsg, {
			position: 'top-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		})

		await queryClient.invalidateQueries({
			queryKey: ['get', 'getProduct'],
		})
	}

	// to delete product
	const handleDelete = (id) => {
		// confirm delete
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				deleteProductRequest(id).then((res) => {
					console.log(res)
					if (res.status == 200) {
						queryClient.invalidateQueries({
							queryKey: ['get', 'getProduct'],
						})
						Swal.fire({
							title: 'Deleted!',
							text: 'Your product has been deleted.',
							icon: 'success',
						})
					}
				})
			}
		})
	}

	// to edit product
	const handleEdit = (id) => {
		setEditId(id)
		handleOpenModal()
		setEditLoading(true)

		axiosInstance
			.get('/products/' + id)
			.then((res) => {
				console.log(res)
				if (res.status == 200) {
					setInputFields(res.data.data)
					setCheckBoxes({
						featured: res.data.data.featured,
						popular: res.data.data.popular,
						status: res.data.data.status,
					})
					setEditLoading(false)
				}
			})
			.catch((err) => console.log(err))
	}

	const handleAddProduct = async (e) => {
		e.preventDefault()
		const formData = new FormData()
		formData.append('image', image.image)
		formData.append('meta_title', inputFields.meta_title)
		formData.append('meta_keyword', inputFields.meta_keyword)
		formData.append('meta_description', inputFields.meta_description)
		formData.append('name', inputFields.name)
		formData.append('slug', inputFields.slug)
		formData.append('brand', inputFields.brand)
		formData.append('category_id', inputFields.category_id)
		formData.append('description', inputFields.description)
		formData.append('selling_price', inputFields.selling_price)
		formData.append('original_price', inputFields.original_price)
		formData.append('qty', inputFields.qty)
		formData.append('featured', checkBoxes.featured ? 1 : 0)
		formData.append('popular', checkBoxes.popular ? 1 : 0)
		formData.append('status', checkBoxes.status ? 1 : 0)

		await mutateAsyncPostProduct(formData, {
			onSuccess: (res) => {
				// console.log(res)
				if (res) {
					handleSuccess('Product added successfully.')
				}
			},

			onError: (err) => {
				console.log(err)
				// handle validation errors
				if (err.response.status === 422) {
					setErrors(err.response.data.errors)
				}
			},
		})
	}

	const handleUpdateProduct = async (e) => {
		e.preventDefault()
		const formData = new FormData()
		formData.append('image', image.image)
		formData.append('meta_title', inputFields.meta_title ?? '')
		formData.append('meta_keyword', inputFields.meta_keyword ?? '')
		formData.append('meta_description', inputFields.meta_description ?? '')
		formData.append('name', inputFields.name ?? '')
		formData.append('slug', inputFields.slug ?? '')
		formData.append('brand', inputFields.brand ?? '')
		formData.append('category_id', inputFields.category_id ?? '')
		formData.append('description', inputFields.description ?? '')
		formData.append('selling_price', inputFields.selling_price ?? '')
		formData.append('original_price', inputFields.original_price ?? '')
		formData.append('qty', inputFields.qty)
		formData.append('featured', checkBoxes.featured ? 1 : 0)
		formData.append('popular', checkBoxes.popular ? 1 : 0)
		formData.append('status', checkBoxes.status ? 1 : 0)
		formData.append('_method', 'PUT')

		await mutateAsyncUpdateProduct(
			{ id: editId, data: formData },
			{
				onSuccess: (res) => {
					// console.log(res)
					if (res) {
						handleSuccess('Product updated successfully.')
						queryClient.invalidateQueries({
							queryKey: ['get', 'getProduct'],
						})
					}
				},
				onError: (err) => {
					// console.log(err)
					if (err.response.status === 422) {
						setErrors(err.response.data.errors)
					}
				},
			}
		)
	}

	return (
		<>
			<div className='card shadow mb-4'>
				<div
					className='card-header py-3'
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<h6 className='m-0 font-weight-bold text-primary'>Product</h6>
					<button
						onClick={handleOpenModal}
						className='btn btn-sm btn-primary'
					>
						Add Product
					</button>
				</div>
				<div className='card-body'>
					<div className='table-responsive'>
						<div
							id='dataTable_wrapper'
							className='dataTables_wrapper dt-bootstrap4'
						>
							<div className='row'>
								<div className='col-sm-12 col-md-6'>
									<div
										className='dataTables_length d-flex'
										id='dataTable_length'
									>
										<label>
											Show{' '}
											<select
												onChange={handlePerpage}
												name='dataTable_length'
												aria-controls='dataTable'
												className='custom-select custom-select-sm form-control form-control-sm'
											>
												<option
													defaultValue={perPage == 10}
													value='10'
												>
													10
												</option>
												<option
													defaultValue={perPage == 25}
													value='25'
												>
													25
												</option>
												<option
													defaultValue={perPage == 50}
													value='50'
												>
													50
												</option>
												<option
													defaultValue={perPage == 100}
													value='100'
												>
													100
												</option>
											</select>{' '}
											entries
										</label>
									</div>
								</div>
								<div className='col-sm-12 col-md-6'>
									<div
										id='dataTable_filter'
										className='dataTables_filter'
									>
										<label>
											Search:
											<input
												onChange={(e) =>
													setSearchTerm(e.target.value)
												}
												type='search'
												className='form-control form-control-sm'
												placeholder=''
												aria-controls='dataTable'
											/>
										</label>
									</div>
								</div>
							</div>
							<div className='row'>
								<div className='col-sm-12'>
									<table className='table table-striped'>
										<thead>
											<tr>
												<th scope='col'>ID</th>
												<th scope='col'>Name</th>
												<th scope='col'>Image</th>
												<th scope='col'>Category</th>
												<th scope='col'>Brand</th>
												<th scope='col'>Qty</th>
												<th scope='col'>Original Price</th>
												<th scope='col'>Selling Price</th>
												<th scope='col'>Status</th>
												<th scope='col'>Featured</th>
												<th scope='col'>Popular</th>
												<th scope='col'>Action</th>
											</tr>
										</thead>
										<tbody>
											{isLoading && (
												<tr>
													<td colSpan='12'>
														<Loading
															Loader={BarLoader}
															loading={isLoading}
														/>
													</td>
												</tr>
											)}
											{isSuccess &&
												products?.data.length > 0 &&
												products?.data
													.filter((search) =>
														search.name
															.toLowerCase()
															.includes(searchTerm.toLowerCase())
													)
													.map((product) => (
														<ProductList
															handleDelete={handleDelete}
															handleEdit={handleEdit}
															key={product.id}
															id={product.id}
															name={product.name}
															categoryName={
																product.category.name
															}
															img={product.image}
															brand={product.brand}
															selling_price={
																product.selling_price
															}
															original_price={
																product.original_price
															}
															qty={product.qty}
															status={product.status}
															featured={product.featured}
															popular={product.popular}
														/>
													))}
										</tbody>
									</table>
								</div>
							</div>
							<div className='row'>
								<div>
									<div
										className='dataTables_paginate paging_simple_numbers'
										id='dataTable_paginate'
									>
										{totalPages > 1 && (
											<Pagination
												totalPages={totalPages}
												handlePageChange={handlePageChange}
											/>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* product modal */}
			{openModal && (
				<>
					<Modal
						closeModal={handleCloseModal}
						handleSubmit={editId ? handleUpdateProduct : handleAddProduct}
						title={editId ? 'Edit Product' : 'Add Product'}
						submitBtnText={editId ? 'Edit Product' : 'Add Product'}
					>
						{editLoading ? (
							<Loading size={50} />
						) : (
							<ProductModalChild
								checkBoxes={checkBoxes}
								handleCheckBoxes={handleCheckBoxes}
								demoImg={demoImg}
								categoryData={categoryData}
								errors={errors}
								handleImage={handleImage}
								handleInput={handleInput}
								inputField={inputFields}
							/>
						)}
					</Modal>
				</>
			)}
		</>
	)
}

export default Product
