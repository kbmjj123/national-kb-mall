import mockjs from 'mockjs'
import { type MockMethod } from '../types'
import { type UserInfoType } from '~/api/user'
import { resultSuccess } from '../_utils'

const USER_TARGET = '/user'

const generateUserInfo = (): UserInfoType => {
	return {
		id: mockjs.Random.guid(),
		nickName: mockjs.Random.cword(2, 4),
		avatar: mockjs.Random.image('80x80', mockjs.Random.color(), mockjs.Random.color(), "jpeg", mockjs.Random.cword(2, 4)),
		account: mockjs.Random.word(6, 15),
		email: mockjs.Random.email(),
		refreshToken: mockjs.Random.string('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 32),
		accessToken: mockjs.Random.string('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 32)
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
		response: () => resultSuccess(generateUserInfo())
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
	{
		url: `${USER_TARGET}/find-pwd`,
		method: 'post',
		response: () => resultSuccess()
	},
	{
		url: `${USER_TARGET}/modify-pwd`,
		method: 'post',
		response: () => resultSuccess()
	}
] as MockMethod[]