import mockjs from 'mockjs'
import { type MockMethod } from '../types'
import type { ProductInfoType, CategoryType } from '~/api/product'
import { resultSuccess, resultListSuccess, resultWrapListSuccess, getOnePic } from '../_utils'

const PRODUCT_TARGET = '/product'

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
		productInfo['descPic'] = [productInfo.masterPicture, ...Array.from({ length: mockjs.Random.integer(1, 5) }, () => mockjs.Random.image('300x300', mockjs.Random.color(), mockjs.Random.color(), 'jpg', mockjs.Random.cword(2, 4)))]
		productInfo['detailContent'] = Array.from({ length: mockjs.Random.integer(5, 20) }, (index: number) => {
			return index % 3 === 0 ? `<p>${mockjs.Random.cparagraph()}</p>` : `<p><img src="${mockjs.Random.image('500x500', mockjs.Random.color(), mockjs.Random.color(), 'jpg')}" style="width: 100%;"></p>`
		}).join('')
	}
	return productInfo
}

const genreateProductList = (num: number) => {
	return Array.from({ length: num }, () => generateProductInfo())
}

const generateCategoryList = (num: number) => {
	return Array.from({ length: num }, () => ({
		id: mockjs.Random.guid(),
		name: mockjs.Random.cword(2, 6),
		cover: getOnePic(300, 400)
	}))
}

export default [
	{
		url: `${PRODUCT_TARGET}/list`,
		method: 'get',
		response: () => resultListSuccess(genreateProductList(16), 200, 1)
	},
	{
		url: `${PRODUCT_TARGET}/detail/:slug`,
		method: 'get',
		response: () => { }
	},
	{
		url: `${PRODUCT_TARGET}/category/list`,
		method: 'get',
		response: () => resultWrapListSuccess(generateCategoryList(6))
	}
] as MockMethod[]