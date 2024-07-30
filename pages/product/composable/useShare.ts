import type { ProductInfoType } from '~/api/product'

export const useShare = (productInfo: ProductInfoType) => {
	const shareChannelList = computed(() => {
		if(productInfo){
			
		}
	})
	return {
		shareChannelList
	}
}