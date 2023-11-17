import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loading = ({ loading, Loader = ClipLoader, size = 60 }) => {
	return (
		<Loader
			color='#1233a9'
			loading={loading}
			cssOverride={{
				display: 'block',
				margin: '0 auto',
			}}
			size={size}
			aria-label='Loading Spinner'
			data-testid='loader'
		/>
	)
}

export default Loading
