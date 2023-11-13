import { useMutation } from 'react-query'
import { registerRequest } from '../api/register.api'
import { loginRequest } from '../api/login.api'

const useUserRegisterMutation = () => {
	return useMutation({
		mutationKey: ['post', 'register'],
		mutationFn: registerRequest,
	})
}

const useUserLoginMutation = () => {
	return useMutation({
		mutationKey: ['post', 'loginData'],
		mutationFn: loginRequest,
	})
}

export const useUser = () => {
	return {
		useUserRegisterMutation,
		useUserLoginMutation,
	}
}
