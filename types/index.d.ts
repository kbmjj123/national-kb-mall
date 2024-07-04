// declare module '#app' {
	interface NuxtApp {
		$api: Function
	}
// }

declare module 'nuxt/schema' {
	// 服务端运行时变量的配置
	interface RuntimeConfig{
		
	}
	// 客户端+服务端运行时变量的声明
	interface PublicRuntimeConfig {
		readonly baseUrl: string;
		readonly common: string;
		readonly useMock: boolean;
	}
	// 在类型中声明自定义的appConfig属性
	interface AppConfigInput {
		readonly appName: string,
		primaryColor: string,
		defaultLanguage: string
	}
}

export {}