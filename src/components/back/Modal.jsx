import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import style from './css/modal.module.css'

const Modal = ({
	title,
	children,
	submitBtnText,
	handleSubmit,
	closeModal,
}) => {
	return (
		<div className={style.container}>
			<div className={`${style.content}`}>
				<div className='modal-content'>
					<div className='modal-header d-flex items-center bg-white mb-1'>
						<h4 className='modal-title'>{title}</h4>

						<button className='btn' onClick={closeModal}>
							<FontAwesomeIcon
								style={{ cursor: 'pointer', fontSize: '1.5rem' }}
								icon={faXmark}
							/>
						</button>
					</div>
					<form onSubmit={handleSubmit} encType='multipart/form-data'>
						<div className='modal-body'>{children}</div>
						<div className='modal-footer mt-2 gap-2'>
							<button
								onClick={closeModal}
								type='button'
								className='btn btn-secondary'
								data-bs-dismiss='modal'
							>
								Close
							</button>
							<button type='submit' className='btn btn-primary'>
								{submitBtnText}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Modal
