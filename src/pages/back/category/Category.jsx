import React from 'react'
import Modal from '../../../components/back/Modal'
import CategoryModalClild from '../../../components/back/CategoryModalClild'
import { useCategory } from '../../../hooks/useCategory'
import { useState } from 'react'
import slugify from 'react-slugify'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useQueryClient } from 'react-query'
import CategoryList from '../../../components/back/CategoryList'
import Loading from '../../../components/back/Loading'
import { axiosInstance } from '../../../util/axiosInstance'
import { BarLoader } from 'react-spinners'
import Swal from 'sweetalert2'

const Category = () => {
	const [editId, setEditId] = useState(null)
	const [openModal, setOpenModal] = useState(false)
	const [errors, setErrors] = useState({})
	const [editLoading, setEditLoading] = useState(false)
	const queryClient = useQueryClient()

	const [inputFields, setInputFields] = useState({
		meta_title: '',
		meta_keyword: '',
		meta_description: '',
		name: '',
		slug: '',
		description: '',
		status: 0,
	})

	const { postCategoryMutation, getCategoryMutation, updateCategoryMutation } =
		useCategory()

	const { mutateAsync: mutateAsyncPostCategory } = postCategoryMutation()

	const { mutateAsync: mutateAsyncUpdateCategory } = updateCategoryMutation()

	const { data, isSuccess, isLoading } = getCategoryMutation()

	const handleOpenModal = () => {
		setOpenModal(true)
	}

	const handleCloseModal = () => {
		setDefaultInputField()
		setErrors({})
		setOpenModal(false)
		setEditId(null)
	}

	const handleInput = (e) => {
		setInputFields({ ...inputFields, [e.target.name]: e.target.value })
	}

	const handleSuccess = async (toastrMsg) => {
		// close modal
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
			queryKey: ['get', 'getCategory'],
		})
	}

	// to generate slug based on name filed
	useEffect(() => {
		setInputFields({ ...inputFields, slug: slugify(inputFields.name) })
	}, [inputFields.name])

	// adding category
	const handleAddCategory = async (e) => {
		e.preventDefault()
		await mutateAsyncPostCategory(
			{
				meta_title: inputFields.meta_title,
				meta_keyword: inputFields.meta_keyword,
				meta_description: inputFields.meta_description,
				name: inputFields.name,
				slug: inputFields.slug,
				description: inputFields.description,
				status: inputFields.status,
			},
			{
				onSuccess: async (res) => {
					if (res) {
						handleSuccess('Category Added Successfully.')
					}
				},
				onError: async (err) => {
					console.log(err)
					// handle validation error
					if (err.response.status === 422) {
						setErrors(err.response.data.errors)
					}
				},
			}
		)
	}

	// updating category
	const handleUpdateCategory = async (e) => {
		e.preventDefault()
		await mutateAsyncUpdateCategory(
			{
				id: editId,
				meta_title: inputFields.meta_title,
				meta_keyword: inputFields.meta_keyword,
				meta_description: inputFields.meta_description,
				name: inputFields.name,
				slug: inputFields.slug,
				description: inputFields.description,
				status: inputFields.status,
			},
			{
				onSuccess: async (res) => {
					// console.log(res)
					if (res) {
						handleSuccess('Category Updated Successfully.')
					}
				},
				onError: (err) => {
					// console.log(err)
					// handle validation error
					if (err.response.status === 422) {
						setErrors(err.response.data.errors)
					}
				},
			}
		)
	}

	// set input to initial value
	const setDefaultInputField = () => {
		setInputFields({
			meta_title: '',
			meta_keyword: '',
			meta_description: '',
			name: '',
			slug: '',
			description: '',
			status: 0,
		})
	}

	const handleEdit = async (id) => {
		handleOpenModal()
		setEditId(id)
		setEditLoading(true)
		const request = await axiosInstance.get('/categories/' + id)
		const res = await request.data.data
		if (res) {
			setInputFields({
				meta_title: res.meta_title,
				meta_keyword: res.meta_keyword,
				meta_description: res.meta_description,
				name: res.name,
				slug: res.slug,
				description: res.description,
				status: res.status,
			})
			setEditLoading(false)
		}
	}

	// to delete
	const handleDelete = (id) => {
		// confirm delete
		Swal.fire({
			title: 'Are you sure?.',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				axiosInstance.delete('/categories/' + id).then((res) => {
					// console.log(res)
					if (res.status == 200) {
						queryClient.invalidateQueries({
							queryKey: ['get', 'getCategory'],
						})
						Swal.fire({
							title: 'Deleted!',
							text: 'Your file has been deleted.',
							icon: 'success',
						})
					}
				})
			}
		})
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
					<h6 className='m-0 font-weight-bold text-primary'>Category</h6>
					<button
						onClick={handleOpenModal}
						className='btn btn-sm btn-primary'
					>
						Add Category
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
												name='dataTable_length'
												aria-controls='dataTable'
												className='custom-select custom-select-sm form-control form-control-sm'
											>
												<option value='10'>10</option>
												<option value='25'>25</option>
												<option value='50'>50</option>
												<option value='100'>100</option>
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
												<th scope='col'>Slug</th>
												<th scope='col'>Status</th>
												<th scope='col'>Action</th>
											</tr>
										</thead>
										<tbody>
											{isLoading && (
												<tr>
													<td colSpan='5'>
														<Loading
															Loader={BarLoader}
															loading={isLoading}
														/>
													</td>
												</tr>
											)}
											{isSuccess &&
												data.length > 0 &&
												data.map((res) => (
													<CategoryList
														handleDelete={handleDelete}
														id={res.id}
														handleEdit={handleEdit}
														key={res.id}
														name={res.name}
														slug={res.slug}
														status={res.status}
													/>
												))}
										</tbody>
									</table>
								</div>
							</div>
							<div className='row'>
								<div className='col-sm-12 col-md-5'>
									<div
										className='dataTables_info'
										id='dataTable_info'
										role='status'
										aria-live='polite'
									>
										Showing 1 to 10 of 57 entries
									</div>
								</div>
								<div className='col-sm-12 col-md-7'>
									<div
										className='dataTables_paginate paging_simple_numbers'
										id='dataTable_paginate'
									>
										<ul className='pagination'>
											<li
												className='paginate_button page-item previous disabled'
												id='dataTable_previous'
											>
												<a
													href='#'
													aria-controls='dataTable'
													data-dt-idx='0'
													tabIndex='0'
													className='page-link'
												>
													Previous
												</a>
											</li>
											<li className='paginate_button page-item active'>
												<a
													href='#'
													aria-controls='dataTable'
													data-dt-idx='1'
													tabIndex='0'
													className='page-link'
												>
													1
												</a>
											</li>
											<li className='paginate_button page-item '>
												<a
													href='#'
													aria-controls='dataTable'
													data-dt-idx='2'
													tabIndex='0'
													className='page-link'
												>
													2
												</a>
											</li>
											<li className='paginate_button page-item '>
												<a
													href='#'
													aria-controls='dataTable'
													data-dt-idx='3'
													tabIndex='0'
													className='page-link'
												>
													3
												</a>
											</li>
											<li className='paginate_button page-item '>
												<a
													href='#'
													aria-controls='dataTable'
													data-dt-idx='4'
													tabIndex='0'
													className='page-link'
												>
													4
												</a>
											</li>
											<li className='paginate_button page-item '>
												<a
													href='#'
													aria-controls='dataTable'
													data-dt-idx='5'
													tabIndex='0'
													className='page-link'
												>
													5
												</a>
											</li>
											<li className='paginate_button page-item '>
												<a
													href='#'
													aria-controls='dataTable'
													data-dt-idx='6'
													tabIndex='0'
													className='page-link'
												>
													6
												</a>
											</li>
											<li
												className='paginate_button page-item next'
												id='dataTable_next'
											>
												<a
													href='#'
													aria-controls='dataTable'
													data-dt-idx='7'
													tabIndex='0'
													className='page-link'
												>
													Next
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* category modal */}
			{openModal && (
				<>
					<Modal
						closeModal={handleCloseModal}
						handleSubmit={
							editId ? handleUpdateCategory : handleAddCategory
						}
						title={editId ? 'Edit Category' : 'Add Category'}
						submitBtnText={editId ? 'Edit Category' : 'Add Category'}
					>
						{editLoading ? (
							<Loading size={50} />
						) : (
							<CategoryModalClild
								handleInput={handleInput}
								inputField={inputFields}
								errors={errors}
							/>
						)}
					</Modal>
				</>
			)}
		</>
	)
}

export default Category
