import type { BasicResponseModel } from '~/api/types'

type FetchParams = {
	[index: string]: any
}
// 自定义客户端的与用户交互体验相关的参数
export type FetchOptions = {
	successResponseType?: 'none' | 'toast' | 'modal',	// 业务响应成功后的交互
	errorResponseType?: 'none' | 'toast' | 'modal',	// 业务响应失败后的交互
	headers?: { [index: string]: any },	// 自定义请求头
	method?: 'get' | 'post' | 'put' | 'delete',
	params?: FetchParams,
	data?: null | FetchParams | undefined,
	isServer?: boolean
}

// 对外暴露的统一接口请求函数
function fetch<DataT extends BasicResponseModel>(url: string, options: FetchOptions = {}) {
	const toast = useToast()
	const modal = useModal()
	const nuxtApp = useNuxtApp()
  const { t } = nuxtApp.$i18n
	const {
		successResponseType = 'none',
		data = null,
		errorResponseType = 'toast',
		headers,
		method = 'post',
		params = {}
	} = options

	const fetchOptions = {
		params,
		method,
		body: null || '',
		headers: {
			...headers
		}
	}
	if (data) {
		fetchOptions.body = JSON.stringify(data)
	}
	const { publicConfig } = useSafeRuntimeConfig()
	const useMockFlag = Boolean(publicConfig.useMock)
	const finalUrl = useMockFlag ? `/api/mock${url}` : `/api/${url}`
	return new Promise<DataT>(async (resolve, reject) => {
		let result = await nuxtApp.$api<DataT>(finalUrl, fetchOptions)
		if (result) {
			if (1 === result.status) {
				if ('toast' === successResponseType) {
					//! 展示全局的toast
					toast.add({ title: result.message || t('successTip'), id: 'modal-success' })
				} else if ('modal' === successResponseType) {
					//! 展示全局的modal
					modal.open()
				}
				resolve(result)
			} else {
				// 业务处理异常
				if ('toast' === errorResponseType) {
					// ! 展示全局的toast
					toast.add({ title: result.message || t('failedTip'), id: 'modal-failed' })
				} else if ('modal' === errorResponseType) {
					//! 展示全局异常的modal
				}
				resolve(result)
			}
		} else {
			//服务端未响应
			reject('')
		}
	})
}

export const useKbFetch = {
	get<DataT extends BasicResponseModel>(url: string, options?: FetchOptions) {
		//! 这里如果是get请求的话，则直接将query参数传递给params参数即可
		return fetch<DataT>(url, { ...options, method: 'get' })
	},
	post<DataT extends BasicResponseModel>(url: string, options?: FetchOptions) {
		return fetch<DataT>(url, { ...options, method: 'post' })
	},
	put<DataT extends BasicResponseModel>(url: string, options?: FetchOptions) {
		return fetch<DataT>(url, { ...options, method: 'put' })
	},
	delete<DataT extends BasicResponseModel>(url: string, options?: FetchOptions) {
		return fetch<DataT>(url, { ...options, method: 'delete' })
	}
}