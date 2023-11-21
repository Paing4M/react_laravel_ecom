import React from 'react'

const CategoryModalClild = ({ inputField, errors, handleInput }) => {
	return (
		<>
			<ul className='nav nav-tabs' id='myTab' role='tablist'>
				<li className='nav-item' role='presentation'>
					<button
						className='nav-link active'
						id='home-tab'
						data-bs-toggle='tab'
						data-bs-target='#home-tab-pane'
						type='button'
						role='tab'
						aria-controls='home-tab-pane'
						aria-selected='true'
					>
						Home
					</button>
				</li>
				<li className='nav-item' role='presentation'>
					<button
						className='nav-link'
						id='seo-tag-tab'
						data-bs-toggle='tab'
						data-bs-target='#seo-tag-tab-pane'
						type='button'
						role='tab'
						aria-controls='seo-tag-tab-pane'
						aria-selected='false'
					>
						SEO Tag
					</button>
				</li>
			</ul>

			<div className='tab-content mt-2' id='myTabContent'>
				{/* home */}
				<div
					className='tab-pane fade show active'
					id='home-tab-pane'
					role='tabpanel'
					aria-labelledby='home-tab'
					tabIndex='0'
				>
					<div>
						{/* name */}
						<div className='form-outline mb-2'>
							<label className='form-label' htmlFor='name'>
								Name
							</label>
							<input
								value={inputField.name}
								onChange={handleInput}
								type='text'
								id='name'
								name='name'
								className='form-control'
							/>
							{errors.name && (
								<span className='text-danger'>{errors.name[0]}</span>
							)}
						</div>
						{/* name end */}
						{/* slug */}
						<div className='form-outline mb-2'>
							<label className='form-label' htmlFor='slug'>
								Slug
							</label>
							<input
								value={inputField.slug}
								onChange={handleInput}
								type='text'
								id='slug'
								name='slug'
								className='form-control'
							/>
							{errors.slug && (
								<span className='text-danger'>{errors.slug[0]}</span>
							)}
						</div>
						{/* slug end */}

						{/* status */}
						<div className='mb-2'>
							<label className='form-label'>Status</label>
							<div className='d-flex'>
								<div className='form-check mr-3'>
									<input
										onChange={handleInput}
										className='form-check-input'
										type='radio'
										name='status'
										id='disable'
										value={1}
										checked={inputField.status == 1}
									/>
									<label
										className='form-check-label'
										htmlFor='disable'
									>
										Disable
									</label>
								</div>
								<div className='form-check ml-3'>
									<input
										onChange={handleInput}
										className='form-check-input'
										type='radio'
										name='status'
										id='enable'
										value={0}
										checked={inputField.status == 0}
									/>
									<label className='form-check-label' htmlFor='enable'>
										Enable
									</label>
								</div>
							</div>
						</div>
						{/* status end*/}

						{/* desc*/}
						<div className='form-outline mb-2'>
							<label className='form-label' htmlFor='desc'>
								Description
							</label>
							<textarea
								onChange={handleInput}
								className='form-control'
								name='description'
								id='desc'
								rows='4'
								value={inputField.description || ''}
							></textarea>
						</div>
						{/* desc end*/}
					</div>
				</div>

				{/* SEO */}
				<div
					className='tab-pane fade'
					id='seo-tag-tab-pane'
					role='tabpanel'
					aria-labelledby='profile-tab'
					tabIndex='0'
				>
					{/* meta title */}
					<div className='form-outline mb-2'>
						<label className='form-label' htmlFor='meta_title'>
							Meta Title
						</label>
						<input
							value={inputField.meta_title}
							onChange={handleInput}
							type='text'
							id='meta_title'
							name='meta_title'
							className='form-control'
						/>
					</div>
					{/* meta title end */}

					{/* meta keyword */}
					<div className='form-outline mb-2'>
						<label className='form-label' htmlFor='meta_keyword'>
							Meta Keyword
						</label>
						<input
							value={inputField.meta_keyword}
							onChange={handleInput}
							type='text'
							id='meta_keyword'
							name='meta_keyword'
							className='form-control'
						/>
					</div>
					{/* meta title end */}

					{/* meta desc*/}
					<div className='form-outline mb-2'>
						<label className='form-label' htmlFor='m_desc'>
							Meta Description
						</label>
						<textarea
							onChange={handleInput}
							className='form-control'
							name='meta_description'
							id='m_desc'
							rows='4'
							value={inputField.meta_description || ''}
						></textarea>
					</div>
					{/* meta desc end*/}
				</div>
			</div>
		</>
	)
}

export default CategoryModalClild
