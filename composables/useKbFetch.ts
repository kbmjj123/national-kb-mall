
type FetchParams = {
	[index: string]: any
}
type FetchOptions = {
	successResponseType?: 'none' | 'toast' | 'modal',	// 业务响应成功后的交互
	errorResponseType?: 'none' | 'toast' | 'model',	// 业务响应失败后的交互
	customHeaders?: { [index: string]: any },	// 自定义请求头
	isReturnAllRes?: boolean,	// 是否返回接口完整的响应数据
	method?: 'get' | 'post' | 'put' | 'delete'
}

// 对外暴露的统一接口请求函数
function fetch<DataT>(url: string, params: any, options: FetchOptions = {}) {
	const { successResponseType = 'none', errorResponseType = 'toast', customHeaders, isReturnAllRes = false, method = 'post' } = options
	const requestCacheKey = `${url}-${JSON.stringify(params)}`	// 统一的针对每个请求生成的缓存key
	const nuxtApp = useNuxtApp()
	const fetchOptions = {
		params: params,
		method,
		headers: {
			...customHeaders
		},
		extraConfig: {
			successResponseType,
			errorResponseType,
			isReturnAllRes
		}
	}
	const { data: result, execute, error, status } = useAsyncData<DataT>(requestCacheKey, () => nuxtApp.$api(url, fetchOptions))
	return {
		result, execute, error, status
	}
}

export const useKbFetch = {
	get<DataT>(url: string, params?: any, options?: FetchOptions) {
		return fetch<DataT>(url, params, { method: 'get' })
	},
	post<DataT>(url: string, params?: any, options?: FetchOptions) {
		return fetch<DataT>(url, params, { method: 'post' })
	},
	put<DataT>(url: string, params?: any, options?: FetchOptions) {
		return fetch<DataT>(url, params, { method: 'put' })
	},
	delete<DataT>(url: string, params?: any, options?: FetchOptions) {
		return fetch<DataT>(url, params, { method: 'delete' })
	}
}