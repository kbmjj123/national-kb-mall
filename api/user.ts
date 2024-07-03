
export const login = (account: string, password: string) => {
	return useKbFetch.post('/user/login', { account, password })
}

export const logout = () => {
	return useKbFetch.post('/user/logout')
}