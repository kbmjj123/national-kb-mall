<template>
  <AppCarousel></AppCarousel>
  <div class="container">
    <BrandArea></BrandArea>
    <AppTitle
      :title="$t('index.categoryInShop')"
      :button-info="{
        text: $t('index.browseAll'),
        link: '/product/list',
        target: '_target',
      }"></AppTitle>
    <Category></Category>
    <PlatformDescription></PlatformDescription>
    <AppTitle
      :title="$t('index.popularProduct')"
      :button-info="{
        text: $t('index.browseAll'),
        link: '/product/list',
      }"></AppTitle>
    <ProductCell :product-list="productListInfo?.data.list || []" class="pb-8"></ProductCell>
  </div>
</template>

<script setup lang="ts">
  import BrandArea from './_BrandArea.vue'
  import PlatformDescription from './_PlatformDescription.vue'
  import { getProductListSSR } from '~/api/product'
  useSeoMeta({
    title: '我是首页',
    description: '我是页面的描述',
    keywords: '关键词一，关键测人',
  })
  const { data: productListInfo } = await getProductListSSR({
    pageIndex: 1,
    pageSize: 16,
    total: 0,
  })
</script>
