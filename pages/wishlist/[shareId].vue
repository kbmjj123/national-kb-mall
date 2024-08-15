<template>
  <div class="container">
    <ul class="flex flex-col gap-2">
      <li
        class="flex flex-row items-center gap-3 p-2 rounded-md hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500"
        v-for="(item, index) in targetProductList"
        :key="index">
        <UCheckbox v-model="item.checked"></UCheckbox>
        <NuxtImg
          class="w-[60px] h-[60px] rounded-md"
          :src="item.masterPicture"></NuxtImg>
        <div class="flex-1 flex flex-col">
          <div class="flex flex-row flex-1 justify-between">
            <p
              class="line-clamp-1 text-sm text-ellipsis h-4 leading-4 font-bold">
              {{ item.name }}
            </p>
            <NumberInput v-model="item.quantity"></NumberInput>
          </div>
          <div class="flex flex-row flex-1 justify-between">
            <span>{{ $t('money') }}{{ item.price }}</span>
            <p class="flex flex-row items-center">
              <UButton
                variant="link"
                color="gray"
                size="2xs"
                :loading="item.isMovingToWishList"
                @click="item.onMovingToWishList"
                :label="$t('shoppingCart.moveToWishlist')"></UButton>
            </p>
          </div>
        </div>
      </li>
    </ul>
    <!-- 底部悬浮按钮，可用于一同checkout -->
    <section class="sticky left-0 right-0 bottom-0">
			<UButton color="gray" :label="$t('shoppingCart.checkout')" @click="onSettled"></UButton>
		</section>
  </div>
</template>

<script setup lang="ts">
  import {
    type WishProductType,
    getWishListByShareIdSSR,
    addToWishList,
  } from '~/api/wishlist'
  const route = useRoute()
  const shareId = route.params.shareId as string
  const { data: productListInfo } = await getWishListByShareIdSSR(shareId)
  type ShareProductType = WishProductType & {
    checked: boolean
    isMovingToWishList: boolean,
		onMovingToWishListAction: Function
  }
	//@ts-ignore
  const targetProductList: ComputedRef<Array<ShareProductType>> = computed(
    () => {
      return productListInfo?.value?.data?.map((item) => {
				const { isLoading, execute: onMovingToWishListAction } = useLoading(addToWishList)
        return {
          ...item,
          checked: false,
          isMovingToWishList: isLoading.value,
          onMovingToWishList: () => {
						onMovingToWishListAction && onMovingToWishListAction()
					},
        }
      })
    }
  )
	// 结算动作
	const onSettled = () => {
		let productList = targetProductList.value.filter(item => item.checked).map(item => ({
			id: item.id,
			quantity: item.quantity
		}))
		if(productList.length > 0){
			navigateTo({
				path: '/order/confirm',
				query: {
					productList: JSON.stringify(productList)
				}
			})
		}
	}
</script>
