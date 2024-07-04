export interface PublicRunTimeConfig {
	readonly baseUrl: string;
	readonly common: string;
	readonly useMock: boolean;
}

export const useSafeRuntimeConfig = () => {
	const publicRuntimeConfig = useRuntimeConfig().public	// 获取原始的运行时配置
	return {
		publicConfig: Object.freeze(publicRuntimeConfig),
		runTimeConfig: Object.freeze(useRuntimeConfig())
	}
}