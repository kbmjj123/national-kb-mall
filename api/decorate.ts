import type { WrapArrayResponseModel } from './types'
import { wrapServiceRequest } from './_utils'

export type CarouselType = {
	id: string,
	title: string,
	description: string,
	detail: string,
	link: string,
	bgImage: string,
	cover: string
}

export type BrandType = {
	id: string,
	name: string,
	icon: string
}

// 获取首页轮播图列表
export const getCarouselListSSR = () => {
	return useSafeAsyncData<WrapArrayResponseModel<CarouselType>>(wrapServiceRequest('get', '/decorate/carousel/list', {}))
}

// 获取推荐品牌列表
export const getBrandListSSR = () => {
	return useSafeAsyncData<WrapArrayResponseModel<BrandType>>(wrapServiceRequest('get', '/decorate/brand/list', {}))
}