import React from 'react'
import './Auth.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { setUser } from '../../../slide/userSlide'
import { useUser } from '../../../hooks/useUser'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

function Register() {
	const [inputField, setInputField] = useState({
		name: '',
		email: '',
		password: '',
		passwordConfirmation: '',
		errors: {},
	})

	const { useUserRegisterMutation } = useUser()
	const { mutateAsync: registerUser } = useUserRegisterMutation()

	const navigate = useNavigate()
	const dispatch = useDispatch()

	function handleInputChange(e) {
		setInputField({ ...inputField, [e.target.name]: e.target.value })
	}

	// submit function
	async function handleSubmit(e) {
		e.preventDefault()

		await registerUser(
			{
				name: inputField.name,
				email: inputField.email,
				password: inputField.password,
				password_confirmation: inputField.passwordConfirmation,
			},
			{
				onSuccess: async (res) => {
					console.log(res)
					setInputField({
						name: '',
						email: '',
						password: '',
						passwordConfirmation: '',
						errors: {},
					})

					dispatch(setUser({ user: res.user, token: res.token }))
					navigate('/')
				},

				onError: async (err) => {
					console.log(err)
					if (err.response.data) {
						setInputField({
							...inputField,
							errors: err.response.data.errors,
						})
					}
				},
			}
		)
	}

	// if token exist redirect back to home page
	useEffect(() => {
		if (localStorage.getItem('token')) {
			navigate('/')
		}
	})

	return (
		<section
			className='vh-100 bg-image'
			style={{
				backgroundPosition: 'center',
			}}
		>
			<div className='mask d-flex align-items-center h-100 gradient-custom-3'>
				<div className='container h-100'>
					<div className='row d-flex justify-content-center align-items-center h-100'>
						<div className='col-12 col-md-9 col-lg-7 col-xl-6'>
							<div className='card' style={{ borderRadius: '15px' }}>
								<div className='card-body p-4'>
									<h3 className='text-uppercase text-center mb-3'>
										Create an account
									</h3>

									<form onSubmit={handleSubmit}>
										<div className='form-outline mb-2'>
											<label
												className='form-label'
												htmlFor='form3Example1cg'
											>
												Your Name
											</label>
											<input
												onChange={handleInputChange}
												name='name'
												type='text'
												id='form3Example1cg'
												className='form-control '
											/>

											{inputField.errors.name && (
												<span className='err_txt text-danger'>
													{inputField.errors.name[0]}
												</span>
											)}
										</div>

										<div className='form-outline mb-2'>
											<label
												className='form-label'
												htmlFor='form3Example3cg'
											>
												Your Email
											</label>
											<input
												onChange={handleInputChange}
												name='email'
												type='text'
												id='form3Example3cg'
												className='form-control '
											/>
											{inputField.errors.email && (
												<span className='err_txt text-danger'>
													{inputField.errors.email[0]}
												</span>
											)}
										</div>

										<div className='form-outline mb-2'>
											<label
												className='form-label'
												htmlFor='form3Example4cg'
											>
												Password
											</label>
											<input
												onChange={handleInputChange}
												name='password'
												type='password'
												id='form3Example4cg'
												className='form-control '
											/>
											{inputField.errors.password && (
												<span className='err_txt text-danger'>
													{inputField.errors.password[0]}
												</span>
											)}
										</div>

										<div className='form-outline mb-2'>
											<label
												className='form-label'
												htmlFor='form3Example4cdg'
											>
												Repeat your password
											</label>
											<input
												onChange={handleInputChange}
												name='passwordConfirmation'
												type='password'
												id='form3Example4cdg'
												className='form-control '
											/>
											{inputField.errors.password_confirmation && (
												<span className='err_txt text-danger'>
													{
														inputField.errors
															.password_confirmation[0]
													}
												</span>
											)}
										</div>

										<div className='d-flex justify-content-center mt-4'>
											<button
												type='submit'
												className='btn btn-success btn-block btn-lg gradient-custom-4 text-body'
											>
												Register
											</button>
										</div>

										<p className='text-center text-muted mt-3 mb-0'>
											Have already an account?{' '}
											<Link
												to='/login'
												className='fw-bold text-body'
											>
												<u>Login here</u>
											</Link>
										</p>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Register
