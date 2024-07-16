import { useStore } from '~/store/useUserStore'
export default defineNuxtPlugin((nuxtApp) => {
	const useUserStore = useStore()
	const { publicConfig } = useSafeRuntimeConfig()
	const useMockFlag = Boolean(publicConfig.useMock)
	const baseURL = publicConfig.baseUrl
	const api = $fetch.create({
		baseURL: useMockFlag ? 'http://localhost:3000' : baseURL,
		responseType: 'json',
		timeout: 30000,
		onRequest({ request, options }) {
			if(!options.headers){
				options.headers = {}
			}
			Object.assign(options.headers, {
				accessToken: useUserStore.getAccessToken,
				platform: 'web'
			})
			if(import.meta.server){
				// 如果是服务端渲染的话，需要自动从请求头中捞对应的token
				Object.assign(options.headers, {
					token: useRequestHeader('token')
				})
			}
		},
		onResponse(context) {
			// console.info(context.response._data)
		}
	})

	return {
		provide: {
			api
		}
	}
})