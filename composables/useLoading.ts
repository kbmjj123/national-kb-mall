import { ref, type Ref } from 'vue'
import type { BasicResponseModel } from '~/api/types'
import { HttpResult } from '~/enum/http-code'

type LoadingResult<T> = {
	isLoading: Ref<boolean>,
	execute: Function,
	data: Ref<T>,
	error?: Ref<any>
}

export const useLoading = <T extends BasicResponseModel & { data: any }>(promise: (params: any) => Promise<T>): LoadingResult<T> => {
	const isLoading = ref(false)
	const data = ref<T>() as Ref<T>
	const error = ref()
	const execute = (params: any, successCallback?: Function, transformBefore?: Function) => {
		isLoading.value = true
		promise(params).then(res => {
			transformBefore && transformBefore(res)
			data.value = res
			if(HttpResult.SUCCESS === res.status){
				successCallback && successCallback(res.data)
			}
		}).catch(err => {
			error.value = err
		}).finally(() => {
			isLoading.value = false
		})
	}
	return {
		isLoading, execute, data, error
	}
}