// https://nuxt.com/docs/api/configuration/nuxt-config
import envConfig from './loadEnv.mjs'
export default defineNuxtConfig({
  devtools: { enabled: true },
  debug: true,
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxt/content',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vite-pwa/nuxt',
    'nuxt-svgo',
    "@nuxt/ui",
    "@nuxtjs/seo"
  ],
  components: {
    global: true,
    dirs: ['~/components/global']
  },
  app: {
    
  },
  imports: {
    dirs: ['store']
  },
  runtimeConfig: {
    public: {
      baseUrl: envConfig['NUXT_PUBLIC_BASE_URL'],
			common: envConfig['NUXT_PUBLIC_COMMON'],
			useMock: envConfig['NUXT_PUBLIC_USE_MOCK']
    }
  },
	// 多语言支持
	i18n: {
		locales: [
			{ code: 'en', iso: 'en', name: 'English' },
			{ code: 'zh', iso: 'zh-CN', name: '中文' }
		],
		defaultLocale: 'zh',
		vueI18n: './i18n.config.ts'
	},
	// 数据持久化配置
	piniaPersistedstate: {
		cookieOptions: {
			sameSite: 'strict'
		}
	}
})