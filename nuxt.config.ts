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
    '@vite-pwa/nuxt'
  ]
})
