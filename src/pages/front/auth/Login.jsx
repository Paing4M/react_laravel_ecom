import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser } from '../../../slide/userSlide'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../../hooks/useUser'
import { useEffect } from 'react'

function Login() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [inputField, setInputField] = useState({
		email: '',
		password: '',
		errors: {},
	})
	const { useUserLoginMutation } = useUser()
	const { mutateAsync: loginUser } = useUserLoginMutation()

	const handleInputChange = (e) => {
		setInputField({ ...inputField, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		await loginUser(
			{
				email: inputField.email,
				password: inputField.password,
			},
			{
				onSuccess: async (res) => {
					console.log(res)
					setInputField({
						...inputField,
						errors: {},
					})

					dispatch(setUser({ user: res.user, token: res.token }))
					navigate('/')
				},
				onError: async (err) => {
					console.log(err)
					if (err?.response?.data?.errors) {
						setInputField({
							...inputField,
							errors: err.response.data.errors,
						})
					}

					if (err?.response?.data?.incorrect) {
						setInputField({
							...inputField,
							errors: { incorrect: err.response.data.incorrect },
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
				// background:
				// 	"url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
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
										Login
									</h3>

									{inputField.errors.incorrect && (
										<span className='err_txt text-danger'>
											{inputField.errors.incorrect}
										</span>
									)}

									<form onSubmit={handleSubmit}>
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

										<div className='d-flex justify-content-center mt-4'>
											<button
												type='submit'
												className='btn btn-success btn-block btn-lg gradient-custom-4 text-body'
											>
												Login
											</button>
										</div>

										<p className='text-center text-muted mt-3 mb-0'>
											Don't have an account?{' '}
											<Link
												to='/register'
												className='fw-bold text-body'
											>
												<u>Register here</u>
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

export default Login
