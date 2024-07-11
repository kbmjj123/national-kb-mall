import mockjs from 'mockjs'
import { type MockMethod } from '../types'
import { type OrderInfoType } from '~/api/order'
import { resultSuccess } from '../_utils'

const ORDER_TARGET = '/order'

export default [
	{
		url: `${ORDER_TARGET}/list`,
		method: 'get',
		response: () => {}
	}
] as MockMethod[]