/**
 * 全局的路由中间件，通过剔除白名单的机制，实现全局未登录将自动重定向到登录页面的机制
 * */
import { NO_NEED_LOGIN_LIST } from '~/config/white-list.js'
export default defineNuxtRouteMiddleware((to, from) => {
	console.info(to)
  if(!NO_NEED_LOGIN_LIST.includes(to.path)){
		// 不在未登录的白名单中，则重定向到登录页面
		return navigateTo({
			name: 'login',
			query: {
				extraInfo: JSON.stringify({
					path: from.path,
					params: from.params,
					query: from.query
				})
			}
		})
	}
})