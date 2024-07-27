import mockjs from 'mockjs'
import { type MockMethod } from '../types'
import { type CarouselType } from '~/api/decorate'
import { resultSuccess, getOnePic, resultWrapListSuccess } from '../_utils'

const DECORATE_TARGET = '/decorate'
// 生成轮播图数据
const generateCarousel = (num: number) => {
	return Array.from({ length: num }, () => ({
		id: mockjs.Random.guid(),
		title: mockjs.Random.ctitle(4, 6),
		description: mockjs.Random.cword(10, 20),
		detail: mockjs.Random.cword(20, 30),
		link: '',
		bgImage: getOnePic(1920, 660, 10),
		cover: getOnePic(1920, 660)
	}))
}
// 生成品牌数据
const generateBrand = (num: number) => {
	return Array.from({ length: num },  () => ({
		id: mockjs.Random.guid(),
		name: mockjs.Random.cword(2, 6),
		icon: getOnePic(mockjs.Random.integer(100, 200), mockjs.Random.integer(80, 150))
	}))
}

export default [
	{
		url: `${DECORATE_TARGET}/carousel/list`,
		method: 'get',
		response: () => resultWrapListSuccess(generateCarousel(3))
	},
	{
		url: `${DECORATE_TARGET}/brand/list`,
		method: 'get',
		response: () => resultWrapListSuccess(generateBrand(6))
	}
] as MockMethod[]