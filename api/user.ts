import type { ObjectResponseModel, StringOrBooleanResponseModel } from './types'
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

export const login = (account: string, password: string): Promise<ObjectResponseModel<UserInfoType>> => {
	return useKbFetch.post('/user/login', { data: { account, password }, errorResponseType: 'modal' })
}

export const register = (params: { email: string; account: string; password: string }): Promise<ObjectResponseModel<UserInfoType>> => {
	return useKbFetch.post('/user/register', { data: params })
}

export const resetPwd = (account: string): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.post('/user/resetPwd', { data: { account } })
}

export const logout = (): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.post('/user/logout')
}