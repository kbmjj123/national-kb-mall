// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  debug: true,
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },
  build: {
    // this issue appear at: https://github.com/prazdevs/pinia-plugin-persistedstate/issues/236
    transpile: ['pinia-plugin-persistedstate'],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/image',
    'nuxt-icon',
    '@nuxt/content',
    '@pinia/nuxt', // needed
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-jsonld',
    '@vite-pwa/nuxt',
    'nuxt-simple-sitemap',
    'nuxt-og-image',
    'nuxt-svgo'
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
      apiHost: process.env.NUXT_PUBLIC_API
    }
  }
})
