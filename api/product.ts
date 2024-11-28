import type { WrapArrayResponseModel, ArrayResponseModel, ObjectResponseModel, BasicPageParams, BasicParams, StringOrBooleanResponseModel } from './types'
export type ProductInfoType = {
	id: string,
	productName: string,
	slug: string,
	slugTarget?: string,
	cates: {id: string, title: string}[],
	masterPicture: string,
	price: string,
	descPic: Array<string>,
	detailContent: string,
	marketPrice: string
}
// 评价相关的类型
export type EvaluateTtype = {
	id?: string,
	title: string,
	content?: string,
	score: number,
	avatar: string,
	userName: string,
	publishDate: string,
	imageList?: Array<string>
}

export type CategoryType = {
	id: string,
	name: string,
	cover: string
}
// 获取商品列表
export const getProductList = (params?: BasicPageParams): Promise<ArrayResponseModel<ProductInfoType>> => {
	return useKbFetch.get('/product/list', { params })
}
export const getProductListSSR = (params?: BasicPageParams) => {
	return useSafeAsyncData(() => getProductList(params), {
		url: '/product/list',
		method: 'get',
		params
	})
}
// 获取商品详情信息
const getProductDetail = (id: string): Promise<ObjectResponseModel<ProductInfoType>> => {
	return useKbFetch.get(`/product/${id}`)
}
export const getProductDetailSSR = (id: string) => {
	return useSafeAsyncData(() => getProductDetail(id), {
		url: `/product/${id}`,
		method: 'get'
	})
}
// 获取当前登录用户是否已收藏该商品
export const checkIfInCollection = (params: BasicParams): Promise<ObjectResponseModel<Boolean>> => {
	return useKbFetch.get(`/collection/inCollection`, { params })
}

// 获取评论列表信息
export const getEvaluateList = (id: string, params: BasicPageParams): Promise<ArrayResponseModel<EvaluateTtype>> => {
	return useKbFetch.get(`/product/${id}/evaluate/info`, { params })
}
// 发布评论动作
export const publishEvaluate = (id: string, params: BasicParams): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.post(`/product/${id}/evaluate`, { data: {params} })
}

// 获取分类数据
const getCategoryList = (): Promise<WrapArrayResponseModel<CategoryType>> => {
	return useKbFetch.get('/product/allCate')
}
export const getCategoryListSSR = () => {
	return useSafeAsyncData(getCategoryList, {
		url: '/product/allCate',
		method: 'get'
	})
}