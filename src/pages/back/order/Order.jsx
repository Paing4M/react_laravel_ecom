import React from 'react'
import { useState } from 'react'
import { useOrder } from '../../../hooks/useOrder'
import Loading from '../../../components/back/Loading'
import { BarLoader } from 'react-spinners'
import Pagination from '../../../components/back/Pagination'

function Order() {
	const [searchTerm, setSearchTerm] = useState('')
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState('')
	const { getOrdersQuery } = useOrder()
	const { data, isLoading, isSuccess } = getOrdersQuery(page, perPage)

	const totalPages = Math.ceil(data?.total / data?.perPage)

	const handlePageChange = (data) => {
		const currentPage = data.selected + 1
		setPage(currentPage)
	}

	const handlePerpage = (e) => {
		setPerPage(e.target.value)
	}

	return (
		<div className='card shadow mb-4'>
			<div className='card-header py-3'>
				<h6 className='m-0 font-weight-bold text-primary'>Orders</h6>
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
											onChange={(e) => setSearchTerm(e.target.value)}
											type='search'
											className='form-control form-control-sm'
											placeholder='search user .....'
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
											<th scope='col'>Session ID</th>
											<th scope='col'>Status</th>
											<th scope='col'>Total Price</th>
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
											data?.data.length > 0 &&
											data?.data
												.filter((search) =>
													search.user.name
														.toLowerCase()
														.includes(searchTerm.toLowerCase())
												)
												.map((item) => (
													<tr>
														<td>{item.id}</td>
														<td>{item.user?.name}</td>
														<td>{item.session_id}</td>
														<td>{item.status}</td>
														<td>${item.total_price}</td>
													</tr>
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
	)
}

export default Order
