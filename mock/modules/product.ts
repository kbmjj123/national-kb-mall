import mockjs from 'mockjs'
import { type MockMethod } from '../types'
import type { ProductInfoType, CategoryType } from '~/api/product'
import { resultSuccess, resultListSuccess, resultWrapListSuccess, getOnePic } from '../_utils'

const PRODUCT_TARGET = '/product'

//? 生成商品信息，传递detailFlag则代表生成的是详情信息
const generateProductInfo = (detailFlag?: boolean) => {
	let productInfo = {
		id: mockjs.Random.guid(),
		name: mockjs.Random.cword(4, 40),
		category: Array.from({ length: mockjs.Random.natural(1, 3) }, () => mockjs.Random.cword(2, 4)).join('/'),
		slugTarget: 'kb-product-slug',
		slug: `${mockjs.Random.word(3, 8)}`,
		masterPicture: mockjs.Random.image('300x300', mockjs.Random.color(), mockjs.Random.color(), 'png', mockjs.Random.cword(2, 4)),
		price: mockjs.Random.float(0.01, 9999, 0, 2),
		marketPrice: mockjs.Random.float(0.01, 9999, 0, 2),
		descPic: [],
		detailContent: ''
	}
	if (detailFlag) {
		//@ts-ignore
		productInfo['descPic'] = [productInfo.masterPicture, ...Array.from({ length: mockjs.Random.integer(1, 5) }, () => mockjs.Random.image('300x300', mockjs.Random.color(), mockjs.Random.color(), 'jpg', mockjs.Random.cword(2, 4)))]
		productInfo['detailContent'] = Array.from({ length: mockjs.Random.integer(5, 20) }, (index: number) => {
			return index % 3 === 0 ? `<p>${mockjs.Random.cparagraph()}</p>` : `<p><img src="${mockjs.Random.image('500x500', mockjs.Random.color(), mockjs.Random.color(), 'jpg')}" style="width: 100%;"></p>`
		}).join('')
	}
	return productInfo
}
//? 生成商品列表信息
const genreateProductList = (num: number) => {
	return Array.from({ length: num }, () => generateProductInfo())
}
//? 生成分类列表信息
const generateCategoryList = (num: number) => {
	return Array.from({ length: num }, () => ({
		id: mockjs.Random.guid(),
		name: mockjs.Random.cword(2, 6),
		cover: getOnePic(300, 400)
	}))
}
//? 生成评价相关信息
export const generateEvaluateList = (num: number) => {
	return Array.from({ length: num }, () => ({
		id: mockjs.Random.guid(),
		title: mockjs.Random.ctitle(5, 20),
		content: mockjs.Random.cparagraph(5, 100),
		score: mockjs.Random.natural(1, 5),
		avatar: mockjs.Random.image('100x100', mockjs.Random.color(), mockjs.Random.color(), 'png', mockjs.Random.cword(2, 4)),
		userName: mockjs.Random.cword(2, 10),
		publishDate: mockjs.Random.datetime(),
		imageList: Array.from({ length: mockjs.Random.natural(0, 5) }, () => getOnePic(80, 80))
	}))
}

export default [
	//! 产品信息相关
	{
		url: `${PRODUCT_TARGET}/list`,
		method: 'get',
		response: () => resultListSuccess(genreateProductList(16), 200, 1)
	},
	{
		url: `${PRODUCT_TARGET}/xxx`,
		method: 'get',
		response: () => resultSuccess(generateProductInfo(true))
	},
	//! 评价相关
	{
		url: `${PRODUCT_TARGET}/xxx/evaluate/info`,
		method: 'get',
		response: () => resultListSuccess(generateEvaluateList(16), 50, 1)
	},
	{
		url: `${PRODUCT_TARGET}/xxx/evaluate`,
		method: 'post',
		response: () => resultSuccess('发布成功')
	},
	// 分类相关
	{
		url: `${PRODUCT_TARGET}/category/list`,
		method: 'get',
		response: () => resultWrapListSuccess(generateCategoryList(6))
	}
] as MockMethod[]