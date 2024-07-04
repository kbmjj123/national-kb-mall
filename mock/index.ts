import user from "./modules/user";
import product from "./modules/product";
import order from "./modules/order";

const finalMockList = [
	...user,
	...product,
	...order
]
const finalMockObj: {[index: string]: any} = {}

finalMockList.forEach(item => {
	const key = `${item.url}-${item.method}`
	finalMockObj[key] = item.response
})

export default finalMockObj