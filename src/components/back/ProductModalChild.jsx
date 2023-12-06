import React from 'react'
import Loading from './Loading'
import { BarLoader } from 'react-spinners'

const ProductModalChild = ({
	inputField,
	errors,
	handleInput,
	handleImage,
	categoryData,
	demoImg,
	checkBoxes,
	handleCheckBoxes,
}) => {
	const { data, isLoading, isSuccess } = categoryData
	let renderImage

	// make if has product image to show product image otherwise to show demo image
	if (demoImg) {
		renderImage = (
			<img
				src={`${demoImg}`}
				style={{
					width: '100%',
					height: '150px',
					objectFit: 'cover',
				}}
			/>
		)
	} else if (inputField.image) {
		renderImage = (
			<img
				src={`${import.meta.env.VITE_API_BASE_URL}/uploads/products/${
					inputField.image
				}`}
				style={{
					width: '100%',
					height: '150px',
					objectFit: 'cover',
				}}
			/>
		)
	}

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
						id='image-tag-tab'
						data-bs-toggle='tab'
						data-bs-target='#image-tag-tab-pane'
						type='button'
						role='tab'
						aria-controls='image-tag-tab-pane'
						aria-selected='false'
					>
						Image & Desc
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
					<div className='row mb-2'>
						{/* name */}
						<div className='form-outline col-6'>
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
							{errors?.name && (
								<span className='text-danger'>{errors?.name[0]}</span>
							)}
						</div>
						{/* name end */}

						{/* slug */}
						<div className='form-outline col-6'>
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
							{errors?.slug && (
								<span className='text-danger'>{errors?.slug[0]}</span>
							)}
						</div>
						{/* slug end */}
					</div>

					<div className='mb-2 row'>
						{/* brand */}
						<div className='col-6'>
							<label className='form-label' htmlFor='brand'>
								Brand
							</label>
							<input
								value={inputField.brand}
								onChange={handleInput}
								type='text'
								id='brand'
								name='brand'
								className='form-control'
							/>
						</div>
						{/* brand end */}

						{/* qty */}
						<div className='col-6'>
							<label className='form-label' htmlFor='qty'>
								Quantity
							</label>
							<input
								value={inputField.qty}
								onChange={handleInput}
								type='number'
								id='qty'
								name='qty'
								className='form-control'
							/>
							{errors?.qty && (
								<span className='text-danger'>{errors?.qty[0]}</span>
							)}
						</div>
						{/* qty end */}
					</div>

					<div className='mb-2 row'>
						{/* original price */}
						<div className='col-6'>
							<label className='form-label' htmlFor='org_price'>
								Original Price
							</label>
							<input
								value={inputField.original_price}
								onChange={handleInput}
								type='text'
								id='org_price'
								name='original_price'
								className='form-control'
							/>
							{errors?.original_price && (
								<span className='text-danger'>
									{errors?.original_price[0]}
								</span>
							)}
						</div>
						{/* original price end */}

						{/* selling price */}
						<div className='col-6'>
							<label className='form-label' htmlFor='sell_price'>
								Selling Price
							</label>
							<input
								value={inputField.selling_price || ''}
								onChange={handleInput}
								type='text'
								id='sell_price'
								name='selling_price'
								className='form-control'
							/>
						</div>
						{/* selling price end */}
					</div>

					{/* category */}
					<div className='mb-3'>
						<Loading loading={isLoading} Loader={BarLoader} />
						{isSuccess && data.length > 0 && (
							<select
								name='category_id'
								onChange={handleInput}
								className='form-select'
								value={inputField.category_id}
							>
								<option value={''}>Select Category</option>
								{data.map((category) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
							</select>
						)}

						{errors?.category_id && (
							<span className='text-danger'>
								{errors?.category_id[0]}
							</span>
						)}
					</div>

					<div
						style={{ justifyContent: 'space-around' }}
						className='d-flex mx-auto items-center mb-2'
					>
						<div className='form-check form-check-inline'>
							<input
								defaultChecked={inputField.featured}
								value={checkBoxes?.featured}
								onChange={handleCheckBoxes}
								className='form-check-input'
								type='checkbox'
								id='featured'
								name='featured'
							/>
							<label className='form-check-label' htmlFor='featured'>
								Featured
							</label>
						</div>

						<div className='form-check form-check-inline'>
							<input
								defaultChecked={inputField.popular}
								value={checkBoxes?.popular}
								onChange={handleCheckBoxes}
								className='form-check-input'
								type='checkbox'
								id='popular'
								name='popular'
							/>
							<label className='form-check-label' htmlFor='popular'>
								Popular
							</label>
						</div>

						<div className='form-check form-check-inline'>
							<input
								defaultChecked={inputField.status}
								value={checkBoxes?.status}
								onChange={handleCheckBoxes}
								className='form-check-input'
								type='checkbox'
								id='status'
								name='status'
							/>
							<label className='form-check-label' htmlFor='status'>
								Status (check to disable)
							</label>
						</div>
					</div>
				</div>

				{/* image & desc */}
				<div
					className='tab-pane fade'
					id='image-tag-tab-pane'
					role='tabpanel'
					aria-labelledby='profile-tab'
					tabIndex='0'
				>
					<div className='row mb-2'>
						<div className='col-6'>
							<input
								onChange={handleImage}
								className='form-control'
								type='file'
								name='image'
								id='img'
							/>
						</div>

						<div className='col-6'>{renderImage}</div>
					</div>

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
							value={inputField.meta_title || ''}
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
							value={inputField.meta_keyword || ''}
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
			{console.log(inputField.meta_description)}
		</>
	)
}

export default ProductModalChild
