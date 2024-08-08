import type { EventHandlerRequest, H3Event } from 'h3'
import { parse } from 'url'
import finalMockObj from '~/mock/index'
import { resultFailed } from '~/mock/_utils'

const delay = (ms: number) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const sleep = async () => {
  console.log("等待2秒...");
  await delay(2000);  // 延迟 2 秒
  console.log("2秒后执行的操作");
}


export default defineEventHandler((event: H3Event<EventHandlerRequest>) => {
	const { pathname } = parse(event.node.req.url || '', true)
	const query = getQuery(event)
	const method = event.method
	const key = `${pathname}-${method.toLowerCase()}`
	const response = finalMockObj[key]
	if(response){
		sleep()
		return finalMockObj[key]()
	}else{
		return resultFailed(null, { message: '接口服务不存在，请联系管理员' })
	}
})