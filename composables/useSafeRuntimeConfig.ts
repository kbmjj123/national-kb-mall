
const runtimeConfig = useRuntimeConfig()	// 获取原始的运行时配置
export const useSafeRuntimeConfig = () => {
	return Object.freeze(runtimeConfig)
}