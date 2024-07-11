import type { EventHandlerRequest, H3Event } from 'h3'
import { parse } from 'url'
import finalMockObj from '~/mock/index'

export default defineEventHandler((event: H3Event<EventHandlerRequest>) => {
	const { pathname } = parse(event.node.req.url || '', true)
	const query = getQuery(event)
	const method = event.method
	const key = `${pathname}-${method}`
	const response = finalMockObj[key]
	if(response){
		return finalMockObj[key]()
	}else{
		return {
			error: '无效请求'
		}
	}
})