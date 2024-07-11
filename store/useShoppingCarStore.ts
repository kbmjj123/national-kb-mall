import { getShoppingCarList } from '~/api/product.js'

const SHOPPING_CAR_STORE_ID = 'shoppingCar'

export type ShoppingCarType = {
	carNumber: number,
	carList: []
}

export const useShoppingCarStore = defineStore(SHOPPING_CAR_STORE_ID, {
	state: (): ShoppingCarType => {
		return {
			carNumber: 0,
			carList: []
		}
	},
	getters: {
		getCarNumber():number {
			return this.carNumber
		}
	},
	actions: {
		async getShoppingCarListAction() {
			const { result, execute } = await getShoppingCarList()
		}
	},
	persist: {
		storage: persistedState.localStorage
	}
})