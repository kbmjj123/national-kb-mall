import type { WrapArrayResponseModel, ArrayResponseModel, StringOrBooleanResponseModel, BasicParams, BasicPageParams, ObjectResponseModel } from './types'
import type { CarProductType } from "./shoppingCar"

export type WishProductType = Omit<CarProductType, 'carId' | 'quantity'> & {
	wishId: string
}

export type WishListGroupType = {
	id: string,
	name: string,
	isDefault: boolean,
	remark: string,
	children: Array<WishProductType>
}

export type OnlyWishListGroupType = Omit<WishListGroupType, 'children' | 'isDefault'>

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

// 仅获取愿望清单分组列表
export const getWishListGroupList = (): Promise<WrapArrayResponseModel<OnlyWishListGroupType>> => {
	return useKbFetch.get('/wishlist/group/list')
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

// 查询商品是否被当前用户加入到愿望清单中
export const checkIfInWishList = (slug: string): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.get(`/product/${slug}/isInWishList`)
}

// 查询分组信息
export const getGroupInfo = (id: string): Promise<ObjectResponseModel<WishListGroupType>> => {
	return useKbFetch.post(`/wishlist/${id}`)
}

// 新增愿望清单分组信息
export const editWishListGroup = (params: BasicParams): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.post('/wishlist/group/edit', { data: params })
}

// 获取推荐分组名称
export const getRecommendGroupNameList = (): Promise<WrapArrayResponseModel<string>> => {
	return useKbFetch.get('/wishlist/group/recommend')
}

// 创建待分享的愿望清单临时集合
export const publishTempWishList = (params: BasicParams): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.post('/wishlist/temp/publish', { data: params })
}

// 根据生成的临时id获取愿望清单列表数据
const getWishListByShareId = (shareId: string): Promise<WrapArrayResponseModel<WishProductType>> => {
	return useKbFetch.get(`/wishlist/temp/${shareId}`)
}
export const getWishListByShareIdSSR = (shareId: string) => {
	return useSafeAsyncData(() => getWishListByShareId(shareId), {
		url: `/wishlist/wishlist/${shareId}`,
		method: 'get'
	})
}

// 生成愿望清单下载
export const generateDownloadWishLish = (params: BasicParams): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.post('/wishlist/download', { data: params })
}

// 查询愿望清单下载记录
export const getDownloadRecord = (params: BasicPageParams): Promise<ArrayResponseModel<DownloadRecordType>> => {
	return useKbFetch.get('/wishlish/download/record',)
}