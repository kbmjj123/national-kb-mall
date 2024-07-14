
export type UserInfoType = {
	id: string,
	nickName: string,
	avatar: string,
	account: string,
	email: string,
	refreshToken: string,
	accessToken: string,
	[index: string]: any
}

export const login = (account: string, password: string) => {
	return useKbFetch.post('/user/login', { data: { account, password } })
}

export const register = (email: string, account: string, password: string) => {
	return useKbFetch.post('/user/register', { data: { email, account, password } })
}

export const resetPwd = (account: string, code: string, password: string) => {
	return useKbFetch.post('/user/resetPwd', { data: { account, code, password } })
}

export const logout = () => {
	return useKbFetch.post('/user/logout')
}