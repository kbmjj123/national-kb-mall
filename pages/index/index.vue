<template>
  <div>
    我是首页
    <UButton>我是按钮</UButton>
    <UButton
      :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      color="gray"
      variant="ghost"
      aria-label="Theme"
      @click="isDark = !isDark">123
      </UButton
    >
  </div>
</template>

<script setup lang="ts">
  useSeoMeta({
    title: '我是首页',
    description: '我是页面的描述',
    keywords: '关键词一，关键测人',
  })
  const colorMode = useColorMode()
  console.info(colorMode)
  const isDark = computed({
    get() {
      return colorMode.value === 'dark'
    },
    set() {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    },
  })
</script>
