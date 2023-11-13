import React from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import Footer from './Footer'
import '../../assets/admin/css/sb-admin-2.min.css'
import '../../assets/admin/vendor/fontawesome-free/css/all.min.css'
import { Outlet } from 'react-router-dom'

function MainLayout() {
	return (
		<div id='page-top'>
			<div id='wrapper'>
				{/* side bar */}
				<Sidebar />

				<div id='content-wrapper' className='d-flex flex-column'>
					<div id='content'>
						{/* top bar */}
						<TopBar />

						{/* page content */}
						<div class='container-fluid'>
							<Outlet />
						</div>
					</div>

					{/* footer */}
					<Footer />
				</div>
			</div>

			<a className='scroll-to-top rounded' href='#page-top'>
				<i className='fas fa-angle-up'></i>
			</a>

			<div
				className='modal fade'
				id='logoutModal'
				tabindex='-1'
				role='dialog'
				aria-labelledby='exampleModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog' role='document'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='exampleModalLabel'>
								Ready to Leave?
							</h5>
							<button
								className='close'
								type='button'
								data-dismiss='modal'
								aria-label='Close'
							>
								<span aria-hidden='true'>×</span>
							</button>
						</div>
						<div className='modal-body'>
							Select "Logout" below if you are ready to end your current
							session.
						</div>
						<div className='modal-footer'>
							<button
								className='btn btn-secondary'
								type='button'
								data-dismiss='modal'
							>
								Cancel
							</button>
							<a className='btn btn-primary' href='login.html'>
								Logout
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MainLayout
