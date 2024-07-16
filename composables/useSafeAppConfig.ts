type LinkType = {
	titleKey: string,
	links: {
		key: string,
		link: string,
		target: string
	}[]
}

export interface AppConfig{
	readonly appName: string,
	readonly keywords: string,
	readonly footerLinks: LinkType[],
	[index: string]: any
}

// 对外暴露app的自定义属性，且不能直接修改，需要修改的话，则通过这个函数返回的changXXX方法来进行修改
export const useSafeAppConfig = () => {
	const appConfig = reactive(useAppConfig()) as AppConfig
	const frozenConfig = readonly(appConfig)	// 不可直接修改的app配置对象
	
	
	return {
		config: frozenConfig
	}
}