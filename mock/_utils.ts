import Mock from 'mockjs'
import { HttpResult } from '~/enum/http-code'

export function resultSuccess<T>(
	data?: T,
	{ message = '操作成功!' } = {},
) {
	return Mock.mock({
		status: HttpResult.SUCCESS,
		data,
		message,
	})
}

export function resultListSuccess<T>(data: Array<T>, total: number, pageIndex: number, { message = '操作成功' } = {}) {
	return Mock.mock({
		status: HttpResult.SUCCESS,
		data: {
			list: data,
			total,
			pageIndex
		},
		message
	})
}

export function resultWrapListSuccess<T>(data: Array<T>, { message = '操作成功' } = {}) {
	return Mock.mock({
		status: HttpResult.SUCCESS,
		message: message,
		data: data
	})
}

export function resultFailed<T>(
	data: boolean | string | null | object | Array<T>,
	{ message = '操作失败!' } = {},
) {
	return Mock.mock({
		status: -1,
		data,
		message
	})
}
// 根据长宽生成
export function getOnePic(width: number, height: number, blur?: number, webp?: boolean) {
	// 图片的最长id是1084
	const id = Mock.Random.natural(1, 1084)
	let targetUrl = `https://picsum.photos/id/${id}/${width}/${height}`
	if(blur && blur > 0){
		targetUrl = `${targetUrl}?blur=${blur}`
	}
	if(webp){
		targetUrl = `${targetUrl}.webp`
	}
	return targetUrl
}