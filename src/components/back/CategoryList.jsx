import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const CategoryList = ({ id, name, slug, status, handleEdit, handleDelete }) => {
	return (
		<tr>
			<th scope='row'>{id}</th>
			<td>{name}</td>
			<td>{slug}</td>
			<td>
				<button
					className={`btn btn-sm ${
						status === 0 ? 'btn-primary' : 'btn-danger'
					}`}
				>
					{status === 0 ? 'Enable' : 'Disable'}
				</button>
			</td>
			<td>
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
			</td>
		</tr>
	)
}

export default CategoryList
