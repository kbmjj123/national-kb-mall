import { type UserInfoType, login, logout } from '~/api/user.js'
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router'
const USER_STORE_ID = 'user'

export type UserType = {
	userInfo: UserInfoType | null
}

/**
 * 根据从哪里跳转过来的参数进行对应的跳转
*/
const jumpOriginalPathAfterLogin = (router: Router, token: string) => {
	const route = router.currentRoute
	const target = route.value.query && route.value.query.target as string
	if(target){
		//? 拥有源链接地址
		const finalTarget = decodeURIComponent(target)
		if(finalTarget.startsWith('http')){
			// 站外
			location.href = finalTarget.replace('@token', token)
		}else{
			// 站内-> 直接飞回去，无需携带token
			router.replace({
				path: finalTarget
			})
		}
	}else{
		// 没有下一步动作，直接回到首页
		router.replace({
			path: '/'
		})
	}
}

const useUserStore = defineStore(USER_STORE_ID, {
	state: (): UserType => {
		return {
			userInfo: null
		}
	},
	getters: {
		isLogin(): boolean{
			return !!this.userInfo?.accessToken
		},
		getAccessToken(): string {
			return this.userInfo?.accessToken as string
		},
		getUserinfo(): UserInfoType | null {
			return this.userInfo
		}
	},
	actions: {
		resetUserInfo() {
			this.userInfo = null
		},
		async loginAction(account: string, password: string, router: Router) {
			const res = await login(account, password)
			this.userInfo = res.data
			jumpOriginalPathAfterLogin(router, res.data.accessToken)
			return res
		},
		async logoutAction(router: Router) {
			await logout()
			this.resetUserInfo()
			router.replace({
				path: '/'
			})
		}
	},
	persist: {
		storage: persistedState.cookies
	}
})

export const useStore = () => {
	return useUserStore()
}