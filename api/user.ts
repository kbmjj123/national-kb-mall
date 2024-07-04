
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
	return useKbFetch.post('/user/login', { account, password })
}

export const logout = () => {
	return useKbFetch.post('/user/logout')
}