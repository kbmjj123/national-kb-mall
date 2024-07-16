import { type UserInfoType, login, logout } from '~/api/user.js'

const USER_STORE_ID = 'user'

export type UserType = {
	accessToken: string,
	userInfo: UserInfoType | null
}

const useUserStore = defineStore(USER_STORE_ID, {
	state: (): UserType => {
		return {
			accessToken: '',
			userInfo: null
		}
	},
	getters: {
		getAccessToken(): string {
			return this.accessToken
		},
		getUserinfo(): UserInfoType | null {
			return this.userInfo
		}
	},
	actions: {
		resetUserInfo() {
			this.accessToken = ''
			this.userInfo = null
		},
		async loginAction(account: string, password: string) {
			const res = await login(account, password)
			this.accessToken = res.data.accessToken
			this.userInfo = res.data
			return res
		},
		async logoutAction() {
			await logout()
			this.resetUserInfo()
		}
	},
	persist: {
		storage: persistedState.cookies
	}
})

export const useStore = () => {
	return useUserStore()
}