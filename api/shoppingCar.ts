

// 获取购物车列表数据
export const getShoppingCarList = () => {
	return useKbFetch.get('/product/shoppingCar/list', {})
}