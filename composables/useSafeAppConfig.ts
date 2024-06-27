export interface AppConfig{
	readonly appName: string,
	readonly keywords: string,
	primaryColor: string,
	defaultLanguage: string
}

// 对外暴露app的自定义属性，且不能直接修改，需要修改的话，则通过这个函数返回的changXXX方法来进行修改
export const useSafeAppConfig = () => {
	const appConfig = useAppConfig() as AppConfig
	const frozenConfig = Object.freeze(appConfig)	// 不可直接修改的app配置对象
	const changeTheme = (color: string) => {
		appConfig.primaryColor = color
	}
	const changeLanguage = (lang: string) => {
		appConfig.defaultLanguage = lang
	}
	return {
		config: frozenConfig,
		changeTheme,
		changeLanguage
	}
}