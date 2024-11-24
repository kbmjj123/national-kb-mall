
export const useImgLink = (src: any) => {
	const { publicConfig } = useSafeRuntimeConfig()
	const value = toValue(src) as string
	if(value.startsWith('http')){
		return value
	}else{
		return `${publicConfig.imgUrl}${value}`
	}
}