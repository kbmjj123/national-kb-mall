<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
  // 仅在全局范围配置基本的站点信息
  const { config } = useSafeAppConfig()
  useHead({
    title: config.appName,
    titleTemplate: (title) => {
      const targetTitle = title as string
      return targetTitle ? `${targetTitle} - ${config.appName}` : targetTitle
    },
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent',
      },
      { name: 'keywords', content: config.keywords },
    ],
  })
</script>
