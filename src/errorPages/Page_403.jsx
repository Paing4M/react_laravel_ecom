import React from 'react'
import style from './Page_403.module.css'
import { Link } from 'react-router-dom'

function Page_403() {
	return (
		<div className={style.body}>
			<div className={style.container}>
				<div className={style.status_code}>403</div>
				<div className={style.message}>Forbidden</div>
				<p>Sorry, you don't have permission to access this page.</p>
				<p>
					<Link to='/' className={style.back_link}>
						Go back to the homepage
					</Link>
				</p>
			</div>
		</div>
	)
}

export default Page_403
