import { type BasicResponseModel } from '~/api/types'

type MethodType = 'get' | 'post' | 'put' | 'delete' | 'patch';

export type MockMethod = {
	url: string,
	method?: MethodType,
	response: () => any | any
}