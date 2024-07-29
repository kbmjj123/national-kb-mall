import mockjs from 'mockjs'
import { type MockMethod } from '../types'
import { type UserInfoType } from '~/api/user'
import { resultFailed, resultSuccess } from '../_utils'

const USER_TARGET = '/user'

const generateUserInfo = (): UserInfoType => {
	return {
		id: mockjs.Random.guid(),
		nickName: mockjs.Random.cword(2, 4),
		avatar: mockjs.Random.image('80x80', mockjs.Random.color(), mockjs.Random.color(), "jpeg", mockjs.Random.cword(2, 4)),
		account: mockjs.Random.word(6, 15),
		email: mockjs.Random.email(),
		firstName: mockjs.Random.cword(2, 4),
		lastName: mockjs.Random.cword(2, 4),
		// refreshToken: mockjs.Random.string('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 32),
		// accessToken: mockjs.Random.string('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 32)
	}
}

const generateBillingInfo = () => {
	const phoneNumber = '1' + mockjs.Random.pick(['3', '4', '5', '7', '8', '9']) + mockjs.Random.string('number', 9);
	return {
    firstName: mockjs.Random.cword(2, 4),
    lastName: mockjs.Random.cword(1, 4),
    phone: phoneNumber,
    company: mockjs.Random.cword(6, 20),
    address1: mockjs.Random.cword(10, 20),
    address2: mockjs.Random.cword(10, 20),
    city: mockjs.Random.city(true),
    state: mockjs.Random.region(),
    country: mockjs.Random.county(),
    zip: mockjs.Random.zip(),
    email: mockjs.Random.email(),
  }
}

const generatePwdInfo = () => {
	return {

	}
}

export default [
	{
		url: `${USER_TARGET}/login`,
		method: 'post',
		response: () => resultSuccess(generateUserInfo())
	},
	{
		url: `${USER_TARGET}/register`,
		method: 'post',
		response: () => resultSuccess({id: mockjs.Random.guid()})
	},
	{
		url: `${USER_TARGET}/info`,
		method: 'get',
		response: () => resultSuccess(generateUserInfo())
	},
	{
		url: `${USER_TARGET}/logout`,
		method: 'post',
		response: () => resultSuccess()
	},
	//! billing相关
	{
		url: `${USER_TARGET}/billing`,
		method: 'get',
		response: () => resultSuccess(generateBillingInfo())
	},
	{
		url: `${USER_TARGET}/billing/modify`,
		method: 'post',
		response: () => resultSuccess()
	},
	//! shipping相关
	{
		url: `${USER_TARGET}/shipping`,
		method: 'get',
		response: () => resultSuccess(generateBillingInfo())
	},
	{
		url: `${USER_TARGET}/shipping/modify`,
		method: 'post',
		response: () => resultSuccess()
	},
	//! 密码相关
	{
		url: `${USER_TARGET}/find-pwd`,
		method: 'post',
		response: () => resultSuccess()
	},
	{
		url: `${USER_TARGET}/pwd`,
		method: 'get',
		response: () => resultSuccess()
	},
	{
		url: `${USER_TARGET}/pwd/modify`,
		method: 'post',
		response: () => resultSuccess()
	}
] as MockMethod[]