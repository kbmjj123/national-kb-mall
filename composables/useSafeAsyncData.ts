import type { FetchOptions } from './useKbFetch'

export const useSafeAsyncData = <DataT, DataE>(request) => {
	const requestCacheKey = `${url}-${JSON.stringify(params)}`	// 统一的针对每个请求生成的缓存key
	return useAsyncData<DataT, DataE>(requestCacheKey, request)
}