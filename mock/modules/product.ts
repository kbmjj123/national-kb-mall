import mockjs from 'mockjs'
import { type MockMethod } from '../types'
import { type ProductInfoType } from '~/api/product'
import { resultSuccess, resultListSuccess } from '../_utils'

const PRODUCT_TARGET = '/product'

const generateProductInfo = (): ProductInfoType => {
	return {}
}

export default [
	{
		url: `${PRODUCT_TARGET}/list`,
		method: 'get',
		response: () => {}
	},
	{
		url: `${PRODUCT_TARGET}/detail/:slug`,
		method: 'get',
		response: () => {}
	}
] as MockMethod[]