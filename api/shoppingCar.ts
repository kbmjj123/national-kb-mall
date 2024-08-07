import type { StringOrBooleanResponseModel, WrapArrayResponseModel, BasicParams } from '~/api/types'
import type { ProductInfoType } from './product'

export type CarProductType = Omit<ProductInfoType, 'category' | 'descPic' | 'detailContent'> & {
	carId: string,
	quantity: number,
	[index: string]: any
}

// 获取购物车列表数据
export const getShoppingCarList = (): Promise<WrapArrayResponseModel<CarProductType>> => {
	return useKbFetch.get('/product/shoppingCar/list', {})
}

// 清除失效商品动作
export const clearExpiredProductInCarList = (): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.post('/product/shoppingCar/clearExpiredList', {})
}

// 将商品加入到购物车
export const addToShoppingCar = (params: BasicParams): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.post('/product/shoppingCar/addToCar', { data: params })
}

// 从购物车中移除商品
export const removeFromShoppingCar = (slug: string): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.delete('/product/shoppingCar/removeFromCar', { data: { slug } })
}

// 将商品从购物车移至愿望清单
export const moveToWishList = (slug: string): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.post('/product/shoppingCar/moveToWishList', { data: { slug } })
}

// 清空购物车商品动作
export const cleanProductInCar = (): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.post('/product/shoppingCar/clean')
}