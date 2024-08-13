import mockjs from 'mockjs'
import { type MockMethod } from '../types'
import { type OrderInfoType } from '~/api/order'
import { resultSuccess, resultListSuccess } from '../_utils'
import { generateBillingInfo } from './user'

const ORDER_TARGET = '/order'

// 生成确认订单的对象信息
const generateConfirmOrderInfo = (productNum: number) => {
	return {
		billingInfo: generateBillingInfo(),
		productList: Array.from({ length: productNum }, () => ({
			id: mockjs.Random.guid(),
			name: mockjs.Random.cword(4, 40),
			category: Array.from({ length: mockjs.Random.natural(1, 3) }, () => mockjs.Random.cword(2, 4)).join('/'),
			slugTarget: 'kb-product-slug',
			slug: `${mockjs.Random.word(3, 8)}`,
			masterPicture: mockjs.Random.image('300x300', mockjs.Random.color(), mockjs.Random.color(), 'png', mockjs.Random.cword(2, 4)),
			price: mockjs.Random.float(0.01, 9999, 0, 2),
			marketPrice: mockjs.Random.float(0.01, 9999, 0, 2),
			isInWishList: mockjs.Random.boolean(),
			quantity: mockjs.Random.natural(1, 5)
		})),
		amount: mockjs.Random.float(100, 1000, 0, 2)
	}
}

// 生成订单item
const generateOrderInfo = (detailFlag?: boolean) => {

}

export default [
	{
		url: `${ORDER_TARGET}/confirm`,
		method: 'post',
		response: () => resultSuccess(generateConfirmOrderInfo(3))
	},
	{
		url: `${ORDER_TARGET}/list`,
		method: 'get',
		response: () => {}
	},
	{
		url: `${ORDER_TARGET}/detail/xxx`,
		method: 'get',
		response: () => {}
	}
] as MockMethod[]