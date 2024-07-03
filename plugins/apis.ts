export default defineNuxtPlugin(() => {
	const api = $fetch.create({
		baseURL: '',
		responseType: 'json',
		timeout: 30000,
		method: 'post',
		onRequest({ request, options }) {
			// console.info(options)
			if(!options.headers){
				options.headers = {}
			}
			Object.assign(options.headers, {
				token: '客户端获取到的token值',
				platform: 'web'
			})
			if(import.meta.server){
				// 如果是服务端渲染的话，需要自动从请求头中捞对应的token
				Object.assign(options.headers, {
					token: useRequestHeader('token') || '我是服务端拿到的token的值'
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