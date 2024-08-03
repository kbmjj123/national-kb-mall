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
    <ProductCell
      :product-list="productListInfo?.data.list || []"
      class="pb-8"></ProductCell>
    <!-- 底部加载更多的视图 -->
    <ClientOnly>
      <div class="flex flex-row-reverse mt-4">
        <UPagination
          v-model="params.pageIndex"
          :page-count="5"
          :max="5"
          :total="params.total"
          show-last
          show-first />
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
  import BrandArea from './_BrandArea.vue'
  import PlatformDescription from './_PlatformDescription.vue'
  import { getProductList, getProductListSSR } from '~/api/product'
  useSeoMeta({
    title: '我是首页',
    description: '我是页面的描述',
    keywords: '关键词一，关键测人',
  })
  const params = reactive({
    pageIndex: 1,
    pageSize: 16,
    total: 0,
  })
  const { data: productListInfo } = await getProductListSSR(params)
	const { isLoading, execute: getProductListByPage } = useLoading(() => getProductList(params))
	watch(params, (newVal) => {
		getProductListByPage && getProductListByPage(params)
	}, { deep: true })

</script>
