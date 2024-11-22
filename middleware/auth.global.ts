/**
 * 全局的路由中间件，通过剔除白名单的机制，实现全局未登录将自动重定向到登录页面的机制
 * */
import { NEED_LOGIN_LIST } from '~/config/white-list.js'
import { useStore } from '~/store/useUserStore'
export default defineNuxtRouteMiddleware((to, from) => {
	const userStore = useStore()
  if(!NEED_LOGIN_LIST.some(regex => regex.test(to.path))){
		// 不在未登录的白名单中，则重定向到登录页面
		console.info(userStore.getAccessToken)
		if(!userStore.getAccessToken){
			// return navigateTo({
			// 	path: '/login',
			// 	query: {
			// 		extraInfo: JSON.stringify({
			// 			path: from.path,
			// 			params: from.params,
			// 			query: from.query
			// 		})
			// 	}
			// })
		}
	}
})