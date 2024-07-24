import type { WrapArrayResponseModel } from './types'

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

const getCarouselList = (): Promise<WrapArrayResponseModel<CarouselType>> => {
	return useKbFetch.get('/decorate/carousel/list', {})
}
// 获取首页轮播图列表
export const getCarouselListSSR = () => {
	return useSafeAsyncData(getCarouselList)
}

const getBrandList = (): Promise<WrapArrayResponseModel<BrandType>> => {
	return useKbFetch.get('/decorate/brand/list', {})
}
// 获取推荐品牌列表
export const getBrandListSSR = () => {
	return useSafeAsyncData(getBrandList)
}