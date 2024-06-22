// declare module '#app' {
	interface NuxtApp {
		$api: Function
	}
// }

declare module 'nuxt/schema' {
	// 在类型中声明自定义的appConfig属性
	interface AppConfigInput {
		readonly appName: string,
		primaryColor: string,
		defaultLanguage: string
	}
}

export {}