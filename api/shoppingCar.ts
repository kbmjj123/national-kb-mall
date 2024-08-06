import type { StringOrBooleanResponseModel, ArrayResponseModel } from '~/api/types'
import type { ProductInfoType } from './product'

export type CarProductType = Omit<ProductInfoType, 'category' | 'descPic' | 'detailContent'> & {
	carId: string,
	quantity: number
}

// 获取购物车列表数据
export const getShoppingCarList = (): Promise<ArrayResponseModel<CarProductType>> => {
	return useKbFetch.get('/product/shoppingCar/list', {})
}

// 清除失效商品动作
export const clearExpiredProductInCarList = (): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.post('/product/shoppingCar/clearExpiredList', {})
}

// 将商品加入到购物车
export const addToShoppingCar = (slug: string): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.post('/product/shoppingCar/addToCar', { data: { slug } })
}

// 从购物车中移除商品
export const removeFromShoppingCar = (slug: string): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.delete('/product/shoppingCar/removeFromCar', { data: { slug } })
}

// 将商品从购物车移至愿望清单
export const moveToWishList = (slug: string): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.post('/product/shoppingCar/moveToWishList', { data: { slug } })
}