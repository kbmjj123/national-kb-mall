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

// 获取首页轮播图列表
export const getCarouselList = (): Promise<WrapArrayResponseModel<CarouselType>> => {
	return useKbFetch.get('/decorate/carousel/list', {})
}