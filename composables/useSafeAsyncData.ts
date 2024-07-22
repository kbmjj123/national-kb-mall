
export const useSafeAsyncData = <DataT>({request, url = '' ,params = {}}) => {
	const requestCacheKey = `${url}-${JSON.stringify(params)}`	// 统一的针对每个请求生成的缓存key
	return useAsyncData<DataT>(requestCacheKey, request)
}