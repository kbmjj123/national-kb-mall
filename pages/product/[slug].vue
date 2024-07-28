<template>
  <div class="container" v-if="productInfo">
    <UBreadcrumb :links="breadcrumbList" class="my-4" />
    <!-- 商品信息左右视图 -->
    <section class="flex flex-col md:flex-row">
			<!-- 左侧图片视图区域 -->
      <div class="flex flex-col relative flex-1 gap-4">
        <NuxtImg class="w-full aspect-square" :src="productInfo?.data.masterPicture"></NuxtImg>
        <ul class="flex flex-row flex-nowrap gap-2">
          <li class="" v-for="(item, index) in productInfo?.data.descPic" :key="index">
						<NuxtImg :src="item" class="rounded-sm"></NuxtImg>
					</li>
        </ul>
				<!-- 优惠相关 -->
				<ul class="flex flex-col gap-2 absolute top-2 right-2">
					<li class="px-2 py-1 rounded-sm bg-red-200 text-white">-10%</li>
				</ul>
      </div>
			<!-- 右/下侧产品信息区域 -->
			<section class="flex-1">
				<div class="flex flex-row">
					<h3 class="font-bold text-lg">{{ productInfo?.data.name }}</h3>
					<span class="flex flex-row gap-2">
						<span class="overline text-gray-400">{{ productInfo?.data.marketPrice }}</span>
						<span class="font-bold text-base">{{ productInfo?.data.price }}</span>
					</span>
				</div>
				<p class="flex flex-row gap-3">
					<span>{{ t('product.availability') }}:</span>
					<span></span>
				</p>
				<p class="flex flex-row gap-3">
					<span>{{ t('product.sku') }}:</span>
					<span></span>
				</p>
				<!-- 商品介绍 -->
				<p class="py-6"></p>
				<!-- 加入购物车 -->
				<div class="flex flex-row p-2 g-2">
					<UInput class="flex-1"></UInput>
					<UButton color="gray" class="flex-3" :label="$t('product.addToCart')"></UButton>
				</div>
				<!-- 所属分类视图 -->
				<p class="flex flex-row gap-3">
					<span>{{ t('product.category') }}:</span>
					<span></span>
				</p>
				<!-- 添加到愿望清单，分享 -->
				<p class="flex flex-row gap-3">
					<UButton :label="$t('product.addToWishlist')"></UButton>
					<UButton :label="$t('product.share')"></UButton>
				</p>
			</section>
    </section>
    <!-- 内容与评价切换的tab -->
    <ul class="flex flex-row gap-4 mt-8">
      <li
        @click="onChangeTab(Description)"
        class="relative hover:cursor-pointer px-4 py-6 hover:after:block after:hidden after:content-[''] after:absolute after:w-10 after:h-0.5 after:bg-current after:bottom-0 after:left-[50%] after:translate-x-[-50%]">
        {{ $t('product.details') }}
      </li>
      <li
        @click="onChangeTab(Evaluate)"
        class="relative hover:cursor-pointer px-4 py-6 hover:after:block after:hidden after:content-[''] after:absolute after:w-10 after:h-0.5 after:bg-current after:bottom-0 after:left-[50%] after:translate-x-[-50%]">
        {{ $t('product.evaluates') }}(0)
      </li>
    </ul>
    <keep-alive>
      <component :is="activeTab"></component>
    </keep-alive>
		<!-- 底部推荐商品 -->
		<AppTitle :title="$t('product.guessYouLike')"></AppTitle>
		<LazyAsyncDataWrapper :is-loading="isGettingRecommend">
			<template #loading>
				<SkeletonGrid></SkeletonGrid>
			</template>
			<ProductCell :product-list="recommendProductInfo.data.list"></ProductCell>
		</LazyAsyncDataWrapper>
  </div>
</template>
<script setup lang="ts">
	import { getProductList, getProductDetailSSR } from '~/api/product'
  import Description from './_Description.vue'
  import Evaluate from './_Evaluate.vue'
  const activeTab = ref(Description)
	

  const { t } = useI18n()
  const route = useRoute()
  const slug = route.params.slug as string

  //! 生成顶部面包屑视图所需数据
  const breadcrumbList = computed(() => {
    return [
      { label: t('homeIndex'), to: '/' },
      { label: '分类名称' },
      { label: '产品名称' },
    ]
  })
  // 与tab选项卡相关的
  const onChangeTab = (component: any) => {
    activeTab.value = component
  }
	debugger
	const { data: productInfo } = await getProductDetailSSR(slug)
	
	console.info('--->' + productInfo)
	console.info(productInfo.value?.data)
	// 获取猜你喜欢相关的
	const { isLoading: isGettingRecommend, data: recommendProductInfo } = useLoading(getProductList)
</script>
