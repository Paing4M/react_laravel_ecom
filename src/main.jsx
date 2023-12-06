import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, // default: true
			staleTime: 1000 * 64 * 64 * 24,
		},
	},
})

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<App />
				<ToastContainer autoClose={1500} />
			</Provider>
			<ReactQueryDevtools initialIsOpen={false} client={queryClient} />
		</QueryClientProvider>
	</React.StrictMode>
)
