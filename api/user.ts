import type { ObjectResponseModel, StringOrBooleanResponseModel, BasicParams } from './types'
export type UserInfoType = {
	id: string,
	nickName: string,
	avatar: string,
	account: string,
	email: string,
	firstName: string,
	lastName: string,
	// refreshToken: string,
	// accessToken: string,
	[index: string]: any
}
export type BillingType = {
	firstName: string,
	lastName: string,
	phone: string,
	company: string,
	address1: string,
	address2: string,
	city: string,
	state: string,
	country: string,
	zip: string,
	email: string,
}
export type PasswordType = {
	newPassword: string,
	confirmPassword: string
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
// 获取用户信息
export const getUserInfo = (): Promise<ObjectResponseModel<UserInfoType>> => {
	return useKbFetch.get('/user/info', {})
}
// 修改用户信息
export const modifyUserInfo = (params: BasicParams): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.post('/user/info/modify', { data: params })
}
// 获取账单接收信息
export const getBillingInfo = (): Promise<ObjectResponseModel<BillingType>> => {
	return useKbFetch.get('/user/billing', {})
}
// 修改账单接收信息
export const modifyBillingInfo = (params: BasicParams): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.get('/user/billing/modify', { data: params })
}
// 获取收货信息
export const getShippingInfo = () => {
	return useKbFetch.get('/user/shipping', {})
}
// 设置收货信息
export const setShippingInfo = (params: BasicParams) => {
	return useKbFetch.post('/user/shipping/modify')
}
// 设置新的密码信息
export const setPwdInfo = (params: BasicParams): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.post('/user/pwd/modify', { data: params })
}