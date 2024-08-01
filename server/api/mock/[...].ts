import type { EventHandlerRequest, H3Event } from 'h3'
import { parse } from 'url'
import finalMockObj from '~/mock/index'
import { resultFailed } from '~/mock/_utils'

export default defineEventHandler((event: H3Event<EventHandlerRequest>) => {
	const { pathname } = parse(event.node.req.url || '', true)
	const query = getQuery(event)
	const method = event.method
	const key = `${pathname}-${method.toLowerCase()}`
	const response = finalMockObj[key]
	if(response){
		return finalMockObj[key]()
	}else{
		return resultFailed(null, { message: '接口服务不存在，请联系管理员' })
	}
})