import user from "./modules/user";
import product from "./modules/product";
import order from "./modules/order";

const MOCK_TARGET = '/api/mock'

const finalMockList = [
	...user,
	...product,
	...order
]
const finalMockObj: {[index: string]: any} = {}

finalMockList.forEach(item => {
	const key = `${MOCK_TARGET}${item.url}-${item.method}`
	finalMockObj[key] = item.response
})

export default finalMockObj