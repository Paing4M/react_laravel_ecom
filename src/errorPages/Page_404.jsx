import React from 'react'
import style from './PageErr.module.css'
import { Link } from 'react-router-dom'

function Page_404() {
	return (
		<div className={style.body}>
			<div className={style.container}>
				<div className={style.status_code}>404</div>
				<div className={style.message}>Page Not Found</div>
				<p>Sorry, this page is not found.</p>
				<p>
					<Link to='/' className={style.back_link}>
						Go back to the homepage
					</Link>
				</p>
			</div>
		</div>
	)
}

export default Page_404
