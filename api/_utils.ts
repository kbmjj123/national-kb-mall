import type { BasicResponseModel } from "./types"

export const wrapServiceRequest = <DataT extends BasicResponseModel>(method = 'post', url = '', params = {}) => {
	return {
		request: useKbFetch[method],
		url,
		params
	}
}