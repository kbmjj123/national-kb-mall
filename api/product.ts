
export type ProductInfoType = {}

export const getProductList = () => {}

export const getProductDetail = () => {}

// 获取购物车列表数据
export const getShoppingCarList = () => {
	return useKbFetch.get('/shoppingCar/list', {})
}