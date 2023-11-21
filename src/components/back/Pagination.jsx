import React from 'react'
import ReactPaginate from 'react-paginate'

const Pagination = ({ totalPages, handlePageChange }) => {
	return (
		<ReactPaginate
			containerClassName='pagination'
			pageClassName={'paginate_button page-item'}
			pageLinkClassName={'page-link'}
			previousClassName='previous'
			nextClassName='previous'
			previousLinkClassName='page-link'
			nextLinkClassName='page-link'
			breakLabel='...'
			nextLabel='next'
			onPageChange={handlePageChange}
			pageCount={totalPages}
			previousLabel='previous'
			activeLinkClassName='active'
			breakLinkClassName='page-link'
			activeClassName='active'
			pageRangeDisplayed={3}
		/>
	)
}

export default Pagination
