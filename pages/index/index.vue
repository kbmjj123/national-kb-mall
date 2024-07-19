<template>
  <AppCarousel></AppCarousel>
  <div class="container">
    <BrandArea></BrandArea>
    <AppTitle
      :title="$t('index.categoryInShop')"
      :button-info="{
        text: $t('index.browseAll'),
        link: '/category',
        target: '_target',
      }"></AppTitle>
    <Category></Category>
    <PlatformDescription></PlatformDescription>
  </div>
</template>

<script setup lang="ts">
  import BrandArea from './_BrandArea.vue'
  import PlatformDescription from './_PlatformDescription.vue'
  useSeoMeta({
    title: '我是首页',
    description: '我是页面的描述',
    keywords: '关键词一，关键测人',
  })
</script>
