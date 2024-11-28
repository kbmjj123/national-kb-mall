/**
 * 全局的路由中间件，通过剔除白名单的机制，实现全局未登录将自动重定向到登录页面的机制
 * */
import { NEED_LOGIN_LIST } from '~/config/white-list.js'
import { useStore } from '~/store/useUserStore'
export default defineNuxtRouteMiddleware((to, from) => {
	const userStore = useStore()
	const requiresLogin = NEED_LOGIN_LIST.find(item => to.path.includes(item))
  if(requiresLogin){
		// 在需要的登录白名单中
		if(!userStore.getAccessToken){
			// 未登录状态下，则重定向到登录页面
			if(to.path === '/login') return
			return navigateTo({
				path: '/login',
				query: {
					extraInfo: JSON.stringify({
						path: from.path,
						params: from.params,
						query: from.query
					})
				}
			})
		}
	}
})