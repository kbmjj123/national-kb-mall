import { getShoppingCarList } from '~/api/shoppingCar'

const SHOPPING_CAR_STORE_ID = 'shoppingCar'

export type ShoppingCarType = {
	cartList: [],
	cartCount: number
}

export const useShoppingCarStore = defineStore(SHOPPING_CAR_STORE_ID, {
	state: (): ShoppingCarType => {
		return {
			cartCount: 0,
			cartList: []
		}
	},
	getters: {
		getCartCount():number {
			return this.cartCount
		}
	},
	actions: {
		async getShoppingCarListAction() {
		}
	},
	persist: {
		storage: persistedState.localStorage
	}
})