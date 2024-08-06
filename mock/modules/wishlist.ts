import mockjs from 'mockjs'
import { type MockMethod } from '../types'
import { resultSuccess, resultListSuccess, resultWrapListSuccess, getOnePic } from '../_utils'

const WISHLIST_TARGET = '/wishlist'

const generateSingleWish = () => {
	return {
		id: mockjs.Random.guid(),
		name: mockjs.Random.cword(4, 40),
		slugTarget: 'kb-product-slug',
		slug: `${mockjs.Random.word(3, 8)}`,
		masterPicture: mockjs.Random.image('300x300', mockjs.Random.color(), mockjs.Random.color(), 'png', mockjs.Random.cword(2, 4)),
		price: mockjs.Random.float(0.01, 9999, 0, 2),
		marketPrice: mockjs.Random.float(0.01, 9999, 0, 2),
		wishId: mockjs.Random.guid()
	}
}

const generateGroupInfo = () => {
	return {
		id: mockjs.Random.guid(),
		name: mockjs.Random.ctitle(2, 6),
	}
}

const generateDownloadInfo = () => {
	return {
		id: mockjs.Random.guid(),
		name: mockjs.Random.title(8, 20),
		createTime: mockjs.Random.datetime(),
		downloadTime: mockjs.Random.natural(0, 100)
	}
}

const generateDownloadList = (num: number) => {
	return Array.from({ length: num }, generateDownloadInfo)
}

const generateWishList = (num: number) => {
	return Array.from({ length: num }, generateSingleWish)
}

export default [
	{
		url: `${WISHLIST_TARGET}/list`,
		method: 'get',
		response: () => resultListSuccess(generateWishList(20), 100, 1)
	},
	{
		url: `${WISHLIST_TARGET}`,
		method: 'post',
		response: () => resultSuccess(mockjs.Random.guid())
	},
	{
		url: `${WISHLIST_TARGET}`,
		method: 'delete',
		response: () => resultSuccess(mockjs.Random.guid())
	},
	{
		url: `${WISHLIST_TARGET}/modify`,
		method: 'post',
		response: () => resultSuccess(generateSingleWish()) 
	},
	{
		url: `${WISHLIST_TARGET}/group/edit`,
		method: 'post',
		response: () => resultSuccess(generateGroupInfo())
	},
	{
		url: `${WISHLIST_TARGET}/temp/publish`,
		method: 'post',
		response: () => resultSuccess(generateGroupInfo())
	},
	{
		url: `${WISHLIST_TARGET}/download`,
		method: 'post',
		response: () => resultSuccess(generateDownloadInfo())
	},
	{
		url: `${WISHLIST_TARGET}/download/record`,
		method: 'get',
		response: () => resultListSuccess(generateDownloadList(20), 100, 1)
	}
] as MockMethod[]