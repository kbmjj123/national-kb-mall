import type { WrapArrayResponseModel, ArrayResponseModel, BasicPageParams } from './types'
export type ProductInfoType = {
	id: string,
	name: string,
	slug: string,
	slugTarget?: string,
	category: string,
	masterPicture: string,
	price: string,
	marketPrice: string
}


export type CategoryType = {
	id: string,
	name: string,
	cover: string
}

export const getProductList = (params: BasicPageParams): Promise<ArrayResponseModel<ProductInfoType>> => {
	return useKbFetch.get('/product/list', {})
}
export const getProductListSSR = (params: BasicPageParams) => {
	return useSafeAsyncData(() => getProductList(params))
}

export const getProductDetail = () => { }



// 获取分类数据
const getCategoryList = (): Promise<WrapArrayResponseModel<CategoryType>> => {
	return useKbFetch.get('/product/category/list')
}
export const getCategoryListSSR = () => {
	return useSafeAsyncData(getCategoryList)
}