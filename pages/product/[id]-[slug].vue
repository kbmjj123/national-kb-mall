<template>
  <div class="container" v-if="productInfo?.data">
    <UBreadcrumb :links="breadcrumbList" class="my-4" />
    <!-- 商品信息左右视图 -->
    <section class="flex flex-col md:flex-row gap-20">
      <!-- 左侧图片视图区域 -->
      <div class="flex flex-col relative flex-1 gap-4">
        <NuxtImg
          class="w-full aspect-square"
          :src="useImgLink(productInfo?.data.masterPicture)"></NuxtImg>
        <ul class="flex flex-row flex-nowrap gap-2">
          <li
            class="w-1/6 hover:cursor-pointer"
            v-for="(item, index) in productInfo?.data.descPic"
            :key="index">
            <NuxtImg :src="useImgLink(item)" class="rounded-sm"></NuxtImg>
          </li>
        </ul>
        <!-- 优惠相关 -->
        <ul class="flex flex-col gap-2 absolute top-2 right-2">
          <li class="px-2 py-1 rounded-sm bg-red-200 text-white text-xs">
            -10%
          </li>
        </ul>
      </div>
      <!-- 右/下侧产品信息区域 -->
      <section class="flex-1">
        <div class="flex flex-row">
          <h3 class="font-bold text-lg">{{ productInfo?.data.productName }}</h3>
          <span class="flex flex-row gap-2">
            <span class="line-through text-gray-400"
              >{{ $t('money') }}{{ productInfo?.data.marketPrice }}</span
            >
            <span class="font-bold text-base"
              >{{ $t('money') }}{{ productInfo?.data.price }}</span
            >
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
        <AddToShoppingCar :id="id"></AddToShoppingCar>
        <!-- 所属分类视图 -->
        <p class="flex flex-row gap-3">
          <span>{{ t('product.category') }}:</span>
          <span></span>
        </p>
        <!-- 添加到愿望清单，分享 -->
        <AddToWishList :id="id">
          <Sharing></Sharing>
        </AddToWishList>
      </section>
    </section>
    <!-- 内容与评价切换的tab -->
    <ul
      class="flex flex-row gap-4 mt-10 mb-4 relative after:content-[''] after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-gray-300 after:absolute">
      <li
        @click="onChangeTab(Description)"
        class="relative hover:cursor-pointer px-4 py-4 hover:after:block after:hidden after:content-[''] after:absolute after:w-10 after:h-0.5 after:bg-current after:bottom-0 after:left-[50%] after:translate-x-[-50%]">
        {{ $t('product.details') }}
      </li>
      <li
        @click="onChangeTab(Evaluate)"
        class="relative hover:cursor-pointer px-4 py-4 hover:after:block after:hidden after:content-[''] after:absolute after:w-10 after:h-0.5 after:bg-current after:bottom-0 after:left-[50%] after:translate-x-[-50%]">
        {{ $t('product.evaluates') }}(0)
      </li>
    </ul>
    <keep-alive>
      <component
        :is="activeTab"
        :product-info="{ ...productInfo?.data, id }"></component>
    </keep-alive>
    <!-- 底部推荐商品 -->
    <AppTitle :title="$t('product.guessYouLike')"></AppTitle>
    <LazyAsyncDataWrapper :is-loading="isGettingRecommend">
      <template #loading>
        <SkeletonGrid></SkeletonGrid>
      </template>
      <ProductCell
        :product-list="recommendProductInfo?.data.list"></ProductCell>
    </LazyAsyncDataWrapper>
  </div>
</template>
<script setup lang="ts">
  import type { BreadcrumbLink } from '#ui/types'
  import {
    getProductList,
    getProductDetailSSR,
    checkIfInCollection,
  } from '~/api/product'
  import Description from './component/_Description.vue'
  import Evaluate from './component/_Evaluate.vue'
  import AddToShoppingCar from './component/_AddToShoppingCar.vue'
  import AddToWishList from './component/_AddToWishList.vue'
  import { useStore } from '~/store/useUserStore'
  const activeTab = shallowRef(Description)
  const userStore = useStore()

  const { t } = useI18n()
  const route = useRoute()
	// 从链接中获取id以及slug
  const id = route.params.id as string
	const slug = route.params.slug as string

  // 与tab选项卡相关的
  const onChangeTab = (component: any) => {
    activeTab.value = component
  }
  const { data: productInfo } = await getProductDetailSSR(id)
  useSeoMeta({
    title: `${productInfo.value?.data.productName}`,
    description: `商品详情-${productInfo.value?.data.productName}`,
    keywords: '关键词一，关键测人',
  })
  //! 生成顶部面包屑视图所需数据
  const breadcrumbList: ComputedRef<BreadcrumbLink[]> = computed(() => {
    let targetCateList = [{ label: t('homeIndex'), to: '/', target: '_blank' }]
    if (
      productInfo.value?.data.cates &&
      productInfo.value?.data.cates.length > 0
    ) {
      targetCateList.push(
        ...productInfo.value?.data.cates.map((item) => ({
          label: item.title,
          to: `/category?id=${item.id}`,
          target: '_blank',
        }))
      )
    }
    if (productInfo.value?.data.productName) {
      targetCateList.push({
        label: productInfo.value?.data.productName,
        to: '',
        target: '',
      })
    }
    return targetCateList
  })
  //! 生成分享相关的配置

  // 收藏相关
  const {
    isLoading: isCheckCollection,
    execute: checkIfInCollectionAction,
    data: isInCollectionData,
  } = useLoading(checkIfInCollection)

  // 获取猜你喜欢相关的
  const {
    isLoading: isGettingRecommend,
    execute: getRecommendProductList,
    data: recommendProductInfo,
  } = useLoading(getProductList)
  onMounted(() => {
	// 检查商品是否被收藏
    userStore.isLogin &&
      checkIfInCollectionAction &&
      checkIfInCollectionAction({
        productId: productInfo.value?.data.id,
      })
    getRecommendProductList &&
      getRecommendProductList({
        pageIndex: 1,
        pageSize: 16,
        total: 0,
      })
  })
</script>
