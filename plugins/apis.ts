import type { AnyResponseModel } from '~/api/types'
import { HttpResult, LOGOUT_OUT_CODE } from '~/enum/http-code'
import { useStore } from '~/store/useUserStore'
import { useRouter } from 'vue-router'

export default defineNuxtPlugin((nuxtApp) => {
	const useUserStore = useStore()
	const { publicConfig } = useSafeRuntimeConfig()
	const useMockFlag = Boolean(publicConfig.useMock)
	const baseURL = publicConfig.baseUrl
	const router = useRouter()
	const api = $fetch.create({
		baseURL: useMockFlag ? 'http://localhost:3000' : baseURL,
		responseType: 'json',
		timeout: 30000,
		onRequest({ request, options }) {
			if(!options.headers){
				options.headers = {}
			}
			Object.assign(options.headers, {
				authorization: `Bearer ${useUserStore.getAccessToken}`,
			})
			if(import.meta.server){
				// 如果是服务端渲染的话，需要自动从请求头中捞对应的authorization
				Object.assign(options.headers, {
					authorization: `Bearer ${useRequestHeader('authorization')}`
				})
			}
		},
		async onResponse({ request, response, options }) {
			const res = response._data as AnyResponseModel
			if(LOGOUT_OUT_CODE === res.status){
				// 登录超时--> 自动重定向到登录页面
				router.replace({
					path: '/login',
					query: {
						target: encodeURIComponent(router.currentRoute.value.fullPath)
					}
				})
			}
		},
		onResponseError({ request, response, options }) {
			console.error(
				"[fetch response error]",
      request,
      response.status,
      response.body
			)
		}
	})

	return {
		provide: {
			api
		}
	}
})