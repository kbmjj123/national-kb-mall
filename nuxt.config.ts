// https://nuxt.com/docs/api/configuration/nuxt-config
import envConfig from './loadEnv.mjs'

import { readFileSync } from 'node:fs'
import { resolve } from 'path'
const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'))

export default defineNuxtConfig({
	devtools: { enabled: true },
	debug: true,
	modules: [
		'@nuxtjs/i18n',
		'@nuxt/image',
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt',
		'@nuxt/ui',
		['@nuxtjs/google-fonts', {
			families: {
				Roboto: true,
				'Josefin+Sans': true,
				Lato: [100, 300],
				Raleway: {
					wght: [100, 400],
					ital: [100]
				},
				Inter: '200..700',
				'Crimson Pro': {
					wght: '200..900',
					ital: '200..700',
				}
			},
			display: 'swap'
		}],
		// '@vite-pwa/nuxt',
		// 'nuxt-svgo',
		// "@nuxtjs/seo"
	],
	css: [
		'~/assets/css/scrollbars.css'
	],
	components: {
		global: true,
		dirs: ['~/components/global']
	},
	imports: {
		dirs: ['store']
	},
	runtimeConfig: {
		public: {
			appVerion: pkg.version,
			author: pkg.author,
			baseUrl: envConfig['NUXT_PUBLIC_BASE_URL'],
			common: envConfig['NUXT_PUBLIC_COMMON'],
			useMock: envConfig['NUXT_PUBLIC_USE_MOCK']
		}
	},
	// 多语言支持
	i18n: {
		locales: [
			{ code: 'en', iso: 'en', name: 'English', icon: 'i-flag-us-4x3' },
			{ code: 'zh-CN', iso: 'zh-CN', name: '简体中文', icon: 'i-flag-cn-4x3' },
			{ code: 'zh-TW', iso: 'zh-TW', name: '繁體中文', icon: 'i-flag-tw-4x3' },
		],
		defaultLocale: 'zh-CN',
		vueI18n: './i18n.config.ts'
	},
	// 数据持久化配置
	piniaPersistedstate: {
		cookieOptions: {
			sameSite: 'strict'
		}
	},
	// 配置使用的图标库
	ui: {
		icons: ['heroicons', 'flag', 'ic', 'ri', 'svg-spinners']
	}
})