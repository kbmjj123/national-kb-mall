import type { WrapArrayResponseModel } from './types'

export type FileType = {
	fileName: string,
	url: string,
	id: string
}

export const uploadFiles = (formData: any): Promise<WrapArrayResponseModel<FileType>> => {
	return useKbFetch.put('/resources/files/upload', { data: formData })
}