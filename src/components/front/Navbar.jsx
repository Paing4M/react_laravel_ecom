import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../slide/userSlide'
import { axiosInstance } from '../../util/axiosInstance'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
	const { user, token } = useSelector((state) => state.user)
	const dispatch = useDispatch()
	let renderRightNav

	async function logout() {
		const res = await axiosInstance.post('/logout')
		if (res.status === 200) {
			dispatch(logoutUser())
		}
		console.log(res)
	}

	if (user && token) {
		renderRightNav = (
			<>
				<li className='nav-item'>
					<NavLink className={'nav-link mx-2'} to={'/'}>
						Home
					</NavLink>
				</li>

				<li className='nav-item'>
					<NavLink className={'nav-link mx-2'} to={'/shop'}>
						Shop
					</NavLink>
				</li>

				<li className='nav-item'>
					<Link
						style={{ textTransform: 'capitalize' }}
						className='nav-link mx-2'
					>
						{user.name}
					</Link>
				</li>

				<li className='nav-item'>
					<NavLink className={'nav-link mx-2'} to={'/cart'}>
						<FontAwesomeIcon icon={faCartShopping} />
					</NavLink>
				</li>

				<li className='nav-item'>
					<a
						onClick={logout}
						style={{ cursor: 'pointer' }}
						className='nav-link mx-2'
					>
						Logout
					</a>
				</li>
			</>
		)
	} else {
		renderRightNav = (
			<>
				<li className='nav-item'>
					<Link
						className='nav-link mx-2 active'
						aria-current='page'
						to='/'
					>
						Home
					</Link>
				</li>
				<li className='nav-item'>
					<Link className='nav-link mx-2' to='/login'>
						Login
					</Link>
				</li>
				<li className='nav-item'>
					<Link className='nav-link mx-2' to='/register'>
						Register
					</Link>
				</li>
			</>
		)
	}

	return (
		<nav className='navbar navbar-expand-lg bg-light navbar-light shadow-sm sticky-top '>
			<div className='container'>
				<Link className='navbar-brand' to='/'>
					Navbar
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav ml-auto'>{renderRightNav}</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
