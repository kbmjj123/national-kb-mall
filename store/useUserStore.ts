import { login, logout } from '~/api/user.js'

const USER_STORE_ID = 'user'

export type UserInfoType = {
	id: string,
	nickName: string,
	avatar: string,
	account: string
}

export type UserType = {
	token: string,
	userInfo: UserInfoType | null
}

export const useUserStore = defineStore(USER_STORE_ID, {
	state: (): UserType => {
		return {
			token: '',
			userInfo: null
		}
	},
	getters: {
		getToken(): string {
			return this.token
		},
		getUserinfo(): UserInfoType | null {
			return this.userInfo
		}
	},
	actions: {
		async loginAction(account: string, password: string) {
			const { result } = login(account, password)
		},
		async logoutAction() {
			const { result } = logout()
		}
	},
	persist: {
		storage: persistedState.cookies
	}
})