import type { WrapArrayResponseModel, ArrayResponseModel, StringOrBooleanResponseModel, BasicParams, BasicPageParams } from './types'
import type { CarProductType } from "./shoppingCar"

export type WishProductType = Omit<CarProductType, 'carId' | 'quantity'> & {
	wishId: string
}

export type DownloadRecordType = {
	id: string,
	name: string,
	createTime: string,
	downloadTime: number
}

// 获取愿望清单列表信息
export const getWishList = (): Promise<WrapArrayResponseModel<CarProductType>> => {
	return useKbFetch.get('/wishlist/list')
}

// 添加商品至愿望清单
export const addToWishList = (slug: string): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.post('/wishlist', { data: { slug } })
}

// 从愿望清单中移除商品
export const removeFromWishList = (slug: string): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.delete('/wishlish', { data: { slug } })
}

// 调整愿望清单中的商品信息
export const modifyProductInWishList = (params: BasicParams): Promise<WrapArrayResponseModel<CarProductType>> => {
	return useKbFetch.post('/wishlist/modify', { data: params })
}

// 新增愿望清单分组信息
export const addWishListGroup = (params: BasicParams): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.post('/wishlist/group/edit', { data: params })
}

// 创建待分享的愿望清单临时集合
export const publishTempWishList = (params: BasicParams): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.post('/wishlist/temp/publish', { data: params })
}

// 生成愿望清单下载
export const generateDownloadWishLish = (params: BasicParams): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.post('/wishlist/download', { data: params })
}

// 查询愿望清单下载记录
export const getDownloadRecord = (params: BasicPageParams): Promise<ArrayResponseModel<DownloadRecordType>> => {
	return useKbFetch.get('/wishlish/download/record', )
}