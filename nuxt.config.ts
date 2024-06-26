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
    head: {
      viewport: 'width=device-width,initial-scale=1',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '我是来自于描述' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    }
  },
  imports: {
    dirs: ['store']
  },
  runtimeConfig: {
    public: {
      baseUrl: envConfig['NUXT_PUBLIC_BASE_URL'],
			common: envConfig['NUXT_PUBLIC_COMMON']
    }
  }
})