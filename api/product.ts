import type { WrapArrayResponseModel, ArrayResponseModel, ObjectResponseModel, BasicPageParams, StringOrBooleanResponseModel } from './types'
export type ProductInfoType = {
	id: string,
	name: string,
	slug: string,
	slugTarget?: string,
	category: string,
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
	return useSafeAsyncData(() => getProductList(params))
}
// 获取商品详情信息
const getProductDetail = (slug: string): Promise<ObjectResponseModel<ProductInfoType>> => {
	return useKbFetch.get(`/product/${slug}`)
}
export const getProductDetailSSR = (slug: string) => {
	return useSafeAsyncData(() => getProductDetail(slug))
}

// 获取评论列表信息
export const getEvaluateList = (slug: string, params: BasicPageParams): Promise<ArrayResponseModel<EvaluateTtype>> => {
	return useKbFetch.get(`/product/${slug}/evaluate/info`, { params })
}
// 发布评论动作
export const publishEvaluate = (slug: string, params: EvaluateTtype): Promise<StringOrBooleanResponseModel> => {
	return useKbFetch.post(`/product/${slug}/evaluate`, { data: {params} })
}

// 获取分类数据
const getCategoryList = (): Promise<WrapArrayResponseModel<CategoryType>> => {
	return useKbFetch.get('/product/category/list')
}
export const getCategoryListSSR = () => {
	return useSafeAsyncData(getCategoryList)
}