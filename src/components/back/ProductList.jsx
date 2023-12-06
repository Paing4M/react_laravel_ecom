import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ProductList = ({
	id,
	name,
	categoryName,
	img,
	brand,
	status,
	handleEdit,
	handleDelete,
	selling_price,
	original_price,
	qty,
	featured,
	popular,
}) => {
	return (
		<tr>
			<th scope='row'>{id}</th>
			<td>{name}</td>
			<td>
				<img
					src={
						img
							? `${
									import.meta.env.VITE_API_BASE_URL
							  }/uploads/products/${img}`
							: '/default-img.png'
					}
					alt=''
					style={{ width: '100%', height: '60px', objectFit: 'cover' }}
				/>
			</td>
			<td>{categoryName}</td>
			<td>{brand}</td>
			<td>{qty}</td>
			<td>{original_price}</td>
			<td>{selling_price}</td>
			<td>
				<button
					className={`btn btn-sm ${
						status === 0 ? 'btn-primary' : 'btn-danger'
					}`}
				>
					{status === 0 ? 'Enable' : 'Disable'}
				</button>
			</td>
			<td>{featured}</td>
			<td>{popular}</td>
			<td>
				<div className='d-flex'>
					<button
						onClick={() => handleEdit(id)}
						className='btn btn-sm btn-primary mr-2'
					>
						<FontAwesomeIcon icon={faPenToSquare} />
					</button>
					<button
						onClick={() => handleDelete(id)}
						className='btn btn-sm btn-danger ml-2'
					>
						<FontAwesomeIcon icon={faTrashCan} />
					</button>
				</div>
			</td>
		</tr>
	)
}

export default ProductList
