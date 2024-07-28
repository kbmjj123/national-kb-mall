import sha256 from 'crypto-js/sha256'

export const useSafeAsyncData = async <DataT>(request: () => Promise<DataT>) => {
	debugger
	const requestCacheKey = sha256(request.toString()).toString()
	const { data, status, error } = useAsyncData<DataT>(requestCacheKey, request)
	const isLoading = ref(status.value === 'pending')
	const isError = ref(error)
	return {
		data, isLoading, isError
	}
}