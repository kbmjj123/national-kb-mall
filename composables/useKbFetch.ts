import type { AsyncDataExecuteOptions, KeysOf } from "nuxt/dist/app/composables/asyncData"
import { BasicResponseModel } from '~/api/types'

type FetchParams = {
	[index: string]: any
}
const SUCCESS = 1
type FetchOptions = {
	successResponseType?: 'none' | 'toast' | 'modal',	// 业务响应成功后的交互
	errorResponseType?: 'none' | 'toast' | 'model',	// 业务响应失败后的交互
	customHeaders?: { [index: string]: any },	// 自定义请求头
	isReturnAllRes?: boolean,	// 是否返回接口完整的响应数据
	method?: 'get' | 'post' | 'put' | 'delete'
}

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'

type FetchResult<DataT, ErrorT> = {
	execute: (opts?: AsyncDataExecuteOptions) => Promise<void>,
	pending: Ref<boolean>,
	data: Ref<DataT | null>,
	error: Ref<ErrorT | null>,
	status: Ref<AsyncDataRequestStatus>
}

// 对外暴露的统一接口请求函数
export function useKbFetch<DataT, ErrorT>(url: string, params: FetchParams = {}, options: FetchOptions = {}): FetchResult<DataT, ErrorT> {
	const { successResponseType = 'none', errorResponseType = 'toast', customHeaders, isReturnAllRes = false, method } = options
	const requestCacheKey = `${url}-${JSON.stringify(params)}`
	const { data, execute, pending, error, status } = useAsyncData<DataT, ErrorT>(requestCacheKey, () => {
		return $fetch(url, {
			baseURL: '',
			responseType: 'json',
			params: {},
			timeout: 30000,
			retry: 2,
			onRequest(context) {
				//! 追加自定义请求头动作
				if (true) {
					//TODO 模拟已登录状态
					context.options.headers = {
						token: '模拟获取到的token值',
						platform: 'web'
					}
				}
			},
			onResponse: async context => {
				const httpResult: BasicResponseModel = await context.response.json()
				// if(isReturnAllRes){
				// 	return httpResult
				// }else{

				// }
			},
			onResponseError(context) {

			},
		})
	})
	return {
		data, execute, pending, error, status
	}
}