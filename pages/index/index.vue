<template>
  <div class="h-[1000px]">
    我是首页
		{{ $t('welcome') }}
    <UButton>我是按钮</UButton>
  </div>
</template>

<script setup lang="ts">
  useSeoMeta({
    title: '我是首页',
    description: '我是页面的描述',
    keywords: '关键词一，关键测人',
  })
  
</script>
