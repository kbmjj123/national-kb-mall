import mockjs from 'mockjs'
import { type MockMethod } from '../types'
import { resultSuccess, resultListSuccess, resultWrapListSuccess, getOnePic } from '../_utils'

const WISHLIST_TARGET = '/wishlist'

// 生成分组中的商品
const generateSingleWish = () => {
	let wishListItem = {
		id: mockjs.Random.guid(),
		name: mockjs.Random.cword(4, 40),
		slugTarget: 'kb-product-slug',
		slug: `${mockjs.Random.word(3, 8)}`,
		masterPicture: mockjs.Random.image('300x300', mockjs.Random.color(), mockjs.Random.color(), 'png', mockjs.Random.cword(2, 4)),
		price: mockjs.Random.float(0.01, 9999, 0, 2),
		marketPrice: mockjs.Random.float(0.01, 9999, 0, 2),
		wishId: mockjs.Random.guid(),
	}
	return wishListItem
}
// 生成分组信息
const generateGroupInfo = (defaultGroup?: boolean) => {
	return {
		id: mockjs.Random.guid(),
		name: mockjs.Random.ctitle(2, 5),
		isDefault: defaultGroup,
		remark: mockjs.Random.cparagraph(5, 10),
	}
}

// 生成下载信息
const generateDownloadInfo = () => {
	return {
		id: mockjs.Random.guid(),
		name: mockjs.Random.title(8, 20),
		createTime: mockjs.Random.datetime(),
		downloadTime: mockjs.Random.natural(0, 100)
	}
}

// 生成下载记录
const generateDownloadList = (num: number) => {
	return Array.from({ length: num }, generateDownloadInfo)
}
// 生成嵌套的愿望清单列表
const generateWishList = (num: number) => {
	return Array.from({ length: num }, (item, index) => ({
		...generateGroupInfo(index === 0),
		children: Array.from({ length: mockjs.Random.natural(1, 5) }, generateSingleWish)
	}))
}

// 生成仅愿望清单分组列表
const generateWishListGroup = (num: number) => {
	return Array.from({ length: num }, generateGroupInfo)
}

export default [
	//? 获取愿望清单列表
	{
		url: `${WISHLIST_TARGET}/list`,
		method: 'get',
		response: () => resultWrapListSuccess(generateWishList(6))
	},
	//? 仅获取愿望清单分组列表
	{
		url: `${WISHLIST_TARGET}/group/list`,
		method: 'get',
		response: () => resultWrapListSuccess(generateWishListGroup(1))
	},
	//? 添加商品到愿望清单中
	{
		url: `${WISHLIST_TARGET}`,
		method: 'post',
		response: () => resultSuccess(mockjs.Random.guid())
	},
	//? 从愿望清单中移除某个商品
	{
		url: `${WISHLIST_TARGET}`,
		method: 'delete',
		response: () => resultSuccess(mockjs.Random.guid())
	},
	//? 获取平台推荐的分组名称
	{
		url: `${WISHLIST_TARGET}/group/recommend`,
		method: 'get',
		response: () => resultWrapListSuccess(Array.from({ length: mockjs.Random.natural(3, 5) }, () => mockjs.Random.ctitle(3, 5)))
	},
	//? 修改调整自己的愿望清单以及分组所属情况
	{
		url: `${WISHLIST_TARGET}/modify`,
		method: 'post',
		response: () => resultSuccess(generateSingleWish())
	},
	//? 编辑分组
	{
		url: `${WISHLIST_TARGET}/group/edit`,
		method: 'post',
		response: () => resultSuccess(generateGroupInfo())
	},
	//? 发布一个临时的愿望清单，用于分享给好友，让好友直接访问浏览
	{
		url: `${WISHLIST_TARGET}/temp/publish`,
		method: 'post',
		response: () => resultSuccess(generateGroupInfo())
	},
	//? 根据一个分享的shareId获取愿望清单商品列表
	{
		url: `${WISHLIST_TARGET}/temp/xxx`,
		method: 'get',
		response: () => resultWrapListSuccess(Array.from({ length: mockjs.Random.natural(1, 5) }, generateSingleWish))
	},
	//? 查看自己的可下载愿望清单列表
	{
		url: `${WISHLIST_TARGET}/download`,
		method: 'post',
		response: () => resultSuccess(generateDownloadInfo())
	},
	//? 查看每个愿望清单的下载记录
	{
		url: `${WISHLIST_TARGET}/download/record`,
		method: 'get',
		response: () => resultListSuccess(generateDownloadList(20), 100, 1)
	}
] as MockMethod[]