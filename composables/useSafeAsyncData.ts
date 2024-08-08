import sha256 from 'crypto-js/sha256'

type RequestType = {
	url: string,
	method: string,
	params?: any
}

export const useSafeAsyncData = async <DataT>(request: () => Promise<DataT>, requestInfo: RequestType) => {
	const { url, method, params = {} } = requestInfo
	const requestCacheKey = sha256(`${url}-${method}-${JSON.stringify(params)}`).toString()
	const { data, status, error } = useAsyncData<DataT>(requestCacheKey, request)
	const isLoading = ref(status.value === 'pending')
	const isError = ref(error)
	return {
		data, isLoading, isError
	}
}