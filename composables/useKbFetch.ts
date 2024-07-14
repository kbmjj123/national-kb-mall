import type { AsyncData } from '#app'

type FetchParams = {
	[index: string]: any
}
// 自定义的与用户交互体验相关的参数
type FetchOptions = {
	successResponseType?: 'none' | 'toast' | 'modal',	// 业务响应成功后的交互
	errorResponseType?: 'none' | 'toast' | 'model',	// 业务响应失败后的交互
	headers?: { [index: string]: any },	// 自定义请求头
	isReturnAllRes?: boolean,	// 是否返回接口完整的响应数据
	method?: 'get' | 'post' | 'put' | 'delete',
	params?: FetchParams,
	data?: null | FetchParams | undefined,
	isServer?: boolean
}

// 对外暴露的统一接口请求函数
function fetch<DataT>(url: string, options: FetchOptions = {}): Promise<DataT> {
	const {
		successResponseType = 'none',
		data = null,
		errorResponseType = 'toast',
		headers,
		isReturnAllRes = false,
		method = 'post',
		params = {},
		isServer = false
	} = options
	const requestCacheKey = `${url}-${JSON.stringify(params)}`	// 统一的针对每个请求生成的缓存key
	const nuxtApp = useNuxtApp()
	const fetchOptions = {
		params,
		method,
		body: null || '',
		headers: {
			...headers
		},
		extraConfig: {
			successResponseType,
			errorResponseType,
			isReturnAllRes
		}
	}
	if (data) {
		fetchOptions.body = JSON.stringify(data)
	}
	const { publicConfig } = useSafeRuntimeConfig()
	const useMockFlag = Boolean(publicConfig.useMock)
	const finalUrl = useMockFlag ? `/api/mock${url}` : `/api/${url}`
	return new Promise(async (resolve, reject) => {
		if(import.meta.server){
			let serverRequestAction = await useAsyncData<DataT>(requestCacheKey, () => nuxtApp.$api(finalUrl, fetchOptions))
			const { data, status, error, refresh, clear } = serverRequestAction
			
		}else{
			let clientRequestAction = await nuxtApp.$api(finalUrl, fetchOptions)
			console.info(clientRequestAction)
		}
	})
}

export const useKbFetch = {
	get<DataT>(url: string, options?: FetchOptions) {
		//! 这里如果是get请求的话，则直接将query参数传递给params参数即可
		return fetch<DataT>(url, { ...options, method: 'get' })
	},
	post<DataT>(url: string, options?: FetchOptions) {
		return fetch<DataT>(url, { ...options, method: 'post' })
	},
	put<DataT>(url: string, options?: FetchOptions) {
		return fetch<DataT>(url, { ...options, method: 'put' })
	},
	delete<DataT>(url: string, options?: FetchOptions) {
		return fetch<DataT>(url, { ...options, method: 'delete' })
	}
}