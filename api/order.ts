import type { BasicParams, BasicPageParams, ObjectResponseModel, StringOrBooleanResponseModel } from './types'
import type { CarProductType } from './shoppingCar'
import type { BillingType } from './user'

export type ConfirmOrderType = {
	billing: BillingType,
	productList: Array<CarProductType>
}
export type OrderInfoType = {
	productList: Array<CarProductType>
}

// 确认订单前的预览订单动作
export const previewOrder = (params: BasicParams): Promise<ObjectResponseModel<ConfirmOrderType>> => {
	return useKbFetch.post('/order/confirm', { data: params })
}

// 下单动作
export const makeOrder = (params: BasicParams): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.post('/order/make', { data: params })
}

// 获取订单列表
export const getOrderList = (params: BasicPageParams) => {
	return useKbFetch.get('/order/list', { params })
}


// 获取订单详情
export const getOrderDetail = (id: string) => {
	return useKbFetch.get(`/order/detail${id}`)
}