import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import { faTableList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
	return (
		<ul
			className='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'
			id='accordionSidebar'
		>
			<Link
				className='sidebar-brand d-flex align-items-center justify-content-center'
				to={'/admin'}
			>
				<div className='sidebar-brand-icon rotate-n-15'>
					<i className='fas fa-laugh-wink'></i>
				</div>
				<div className='sidebar-brand-text mx-3'>
					SB Admin <sup>2</sup>
				</div>
			</Link>

			<hr className='sidebar-divider my-0' />

			<li className='nav-item active'>
				<Link className='nav-link' to={'/'}>
					<i className='fas fa-fw fa-pager'></i>
					<span>User Page</span>
				</Link>

				<Link className='nav-link' to={'/admin/dashboard'}>
					<i className='fas fa-fw fa-desktop'></i>
					<span>Dashboard</span>
				</Link>

				<Link className='nav-link' to={'/admin/category'}>
					<FontAwesomeIcon className='mr-1' icon={faTableList} />
					<span>Category</span>
				</Link>

				<Link className='nav-link' to={'/admin/product'}>
					<FontAwesomeIcon className='mr-1' icon={faBoxOpen} />
					<span>Product</span>
				</Link>

				<Link className='nav-link' to={'/admin/order'}>
					<FontAwesomeIcon className='mr-1' icon={faChartLine} />
					<span>Order</span>
				</Link>
			</li>

			<hr className='sidebar-divider' />

			<div className='sidebar-heading'>Interface</div>

			<li className='nav-item'>
				<Link
					className='nav-link collapsed'
					href='#'
					data-toggle='collapse'
					data-target='#collapseTwo'
					aria-expanded='true'
					aria-controls='collapseTwo'
				>
					<i className='fas fa-fw fa-cog'></i>
					<span>Components</span>
				</Link>
				<div
					id='collapseTwo'
					className='collapse'
					aria-labelledby='headingTwo'
					data-parent='#accordionSidebar'
				>
					<div className='bg-white py-2 collapse-inner rounded'>
						<h6 className='collapse-header'>Custom Components:</h6>
						<Link className='collapse-item' href='buttons.html'>
							Buttons
						</Link>
						<Link className='collapse-item' href='cards.html'>
							Cards
						</Link>
					</div>
				</div>
			</li>

			<li className='nav-item'>
				<Link
					className='nav-link collapsed'
					href='#'
					data-toggle='collapse'
					data-target='#collapseUtilities'
					aria-expanded='true'
					aria-controls='collapseUtilities'
				>
					<i className='fas fa-fw fa-wrench'></i>
					<span>Utilities</span>
				</Link>
				<div
					id='collapseUtilities'
					className='collapse'
					aria-labelledby='headingUtilities'
					data-parent='#accordionSidebar'
				>
					<div className='bg-white py-2 collapse-inner rounded'>
						<h6 className='collapse-header'>Custom Utilities:</h6>
						<Link className='collapse-item' href='utilities-color.html'>
							Colors
						</Link>
						<Link className='collapse-item' href='utilities-border.html'>
							Borders
						</Link>
						<Link
							className='collapse-item'
							href='utilities-animation.html'
						>
							Animations
						</Link>
						<Link className='collapse-item' href='utilities-other.html'>
							Other
						</Link>
					</div>
				</div>
			</li>

			<hr className='sidebar-divider' />

			<div className='sidebar-heading'>Addons</div>

			<li className='nav-item'>
				<Link
					className='nav-link collapsed'
					href='#'
					data-toggle='collapse'
					data-target='#collapsePages'
					aria-expanded='true'
					aria-controls='collapsePages'
				>
					<i className='fas fa-fw fa-folder'></i>
					<span>Pages</span>
				</Link>
				<div
					id='collapsePages'
					className='collapse'
					aria-labelledby='headingPages'
					data-parent='#accordionSidebar'
				>
					<div className='bg-white py-2 collapse-inner rounded'>
						<h6 className='collapse-header'>Login Screens:</h6>
						<Link className='collapse-item' href='login.html'>
							Login
						</Link>
						<Link className='collapse-item' href='register.html'>
							Register
						</Link>
						<Link className='collapse-item' href='forgot-password.html'>
							Forgot Password
						</Link>
						<div className='collapse-divider'></div>
						<h6 className='collapse-header'>Other Pages:</h6>
						<Link className='collapse-item' href='404.html'>
							404 Page
						</Link>
						<Link className='collapse-item' href='blank.html'>
							Blank Page
						</Link>
					</div>
				</div>
			</li>

			<li className='nav-item'>
				<Link className='nav-link' href='charts.html'>
					<i className='fas fa-fw fa-chart-area'></i>
					<span>Charts</span>
				</Link>
			</li>

			<li className='nav-item'>
				<Link className='nav-link' href='tables.html'>
					<i className='fas fa-fw fa-table'></i>
					<span>Tables</span>
				</Link>
			</li>

			<hr className='sidebar-divider d-none d-md-block' />

			<div className='text-center d-none d-md-inline'>
				<button
					className='rounded-circle border-0'
					id='sidebarToggle'
				></button>
			</div>
		</ul>
	)
}

export default Sidebar
