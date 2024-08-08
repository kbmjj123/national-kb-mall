<template>
  <UButton
    icon="i-heroicons-shopping-cart"
    color="gray"
    @click="isShowShoppingCar = true"
    variant="ghost"
    aria-label="Theme"></UButton>
  <!-- 以下是购物车 -->
  <USlideover v-model="isShowShoppingCar" side="right">
    <UCard
      class="flex flex-col flex-1"
      :ui="{
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }">
      <template #header>
        <div class="flex items-center h-8">
          <UButton
            color="gray"
            variant="ghost"
            size="sm"
            icon="i-heroicons-x-mark-20-solid"
            class="flex absolute right-5 top-5 z-10"
            square
            padded
            @click="isShowShoppingCar = false" />
          <UButton
            color="gray"
            square
            padded
            :loading="isCleanLoading"
            @click="onClear"
            variant="ghost"
            class="flex absolute right-16 top-5 z-10"
            size="sm"
            icon="i-heroicons-trash"></UButton>
          <h3 class="font-bold text-base">
            {{ $t('shoppingCart.name')
            }}<span v-if="carList?.data?.list?.length"
              >({{ carList?.data?.list.length }})</span
            >
          </h3>
        </div>
      </template>
      <!-- 购物车列表 -->
      <div class="relative">
        <ul class="flex flex-col gap-2">
          <li
            class="flex flex-row items-center gap-3 p-2 rounded-md hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500"
            v-for="(item, index) in carList?.data?.list"
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
                  <span class="mx-1">|</span>
                  <UButton
                    icon="i-heroicons-trash"
                    size="2xs"
                    :loading="item.isRemovingFromCar"
                    @click="item.onRemoveingFromCar"
                    color="gray"
                    variant="link"></UButton>
                </p>
              </div>
            </div>
          </li>
        </ul>
        <!-- 失效商品视图 -->
        <template v-if="carList?.data?.list2?.length > 0">
          <div
            class="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-500">
            <h4>{{ $t('shoppingCart.expiredProduct') }}</h4>
            <UButton
              color="gray"
              square
              padded
              :loading="isCleanExpired"
              @click="onCleanExpired"
              variant="ghost"
              size="sm"
              icon="i-heroicons-trash"></UButton>
          </div>
          <ul class="">
            <li
              v-for="(item, index) in carList?.data?.list2"
              :key="index"
              class="flex flex-row items-center gap-3 p-2 relative">
              <NuxtImg
                class="w-[60px] h-[60px] rounded-md"
                :src="item.masterPicture"></NuxtImg>
              <div class="flex-1 flex flex-col justify-between">
                <p
                  class="line-clamp-1 text-sm text-ellipsis h-4 leading-4 font-bold">
                  {{ item.name }}
                </p>
                <p class="flex flex-row justify-between items-end">
                  <span>{{ $t('money') }}{{ item.price }}</span>
                </p>
              </div>
              <!-- 失效的角标 -->
              <div
                class="absolute z-[1] p-1 top-[50%] translate-y-[-50%] right-0 rotate-[45deg] text-current bg-[rgba(255, 0, 0, 0.8)]">
                <span class="relative z-10 text-sm">{{
                  $t('shoppingCart.invalid')
                }}</span>
                <i
                  class="z-[1] clip-path rounded-md absolute bg-gray-500 left-0 right-0 top-0 bottom-0 opacity-[0.9]"></i>
              </div>
            </li>
          </ul>
        </template>
        <!-- 空视图 -->
        <div
          v-if="
            0 === carList?.data?.list?.length &&
            0 === carList?.data?.list2?.length &&
            !isLoading
          ">
          我是空视图效果
        </div>
        <Spin v-if="isLoading"></Spin>
      </div>
      <!-- 底部的结算 -->
      <template #footer>
        <UButton
          color="gray"
          block
          size="md"
          @click="onSettled"
          :disabled="0 === waitToCheckoutAmount">
          {{ $t('shoppingCart.checkout') }}{{ $t('money')
          }}{{ waitToCheckoutAmount }}
        </UButton>
      </template>
    </UCard>
  </USlideover>
</template>

<script setup lang="ts">
  import {
    getShoppingCarList,
    cleanProductInCar,
    clearExpiredProductInCarList,
    removeFromShoppingCar,
    moveToWishList,
    type CarProductType,
  } from '~/api/shoppingCar'
  const isShowShoppingCar = ref(false)

  // 获取购物车列表
  const { isLoading, data: carList, execute } = useLoading(getShoppingCarList)
  watch(isShowShoppingCar, (newVal) => {
    if (newVal && (!carList.value || 0 === carList.value?.data?.list?.length)) {
      execute &&
        execute({}, null, (res: any) => {
          res.data.list = res.data?.list?.map((item: CarProductType) => {
            // 从购物车中移除商品
            const {
              isLoading: isRemovingFromCar,
              execute: removeFromShoppingCarAction,
            } = useLoading(removeFromShoppingCar)
            const onRemoveFromShoppingCar = () => {
              removeFromShoppingCarAction &&
                removeFromShoppingCarAction(item.carId)
            }
            // 将购物车中的商品移动至愿望清单中
            const {
              isLoading: isMovingToWishList,
              execute: moveToWishListAction,
            } = useLoading(moveToWishList)
            const onMoveToWishList = () => {
              moveToWishListAction && moveToWishListAction(item.carId)
            }
            return {
              ...item,
              checked: false, // 追加是否选中的标识
              isRemovingFromCar: isRemovingFromCar, // 是否正在从购物车中移除的标识
              onRemoveingFromCar: onRemoveFromShoppingCar,
              isMovingToWishList: isMovingToWishList, // 是否正在迁移至愿望清单的标识
              onMovingToWishList: onMoveToWishList,
            }
          })
        })
    }
  })
  // 待结算金额
  const waitToCheckoutAmount = computed(() => {
    const selectedArray =
      carList.value?.data?.list?.filter((item) => item.checked) || []
    return useSumBy(selectedArray, (item) => Number(item.price)) || 0
  })
  const { isLoading: isCleanLoading, execute: cleanProductAction } =
    useLoading(cleanProductInCar)
  // 清空购物车商品列表
  const onClear = () => {
    cleanProductAction && cleanProductAction()
  }
  const { isLoading: isCleanExpired, execute: cleanExpiredProductAction } =
    useLoading(clearExpiredProductInCarList)
  // 清空失效商品动作
  const onCleanExpired = () => {
    cleanExpiredProductAction && cleanExpiredProductAction()
  }
  // 结算
  const onSettled = () => {
    isShowShoppingCar.value = false
    // 将相关的信息收集起来，并跳转到确认订单页面
    const selectedArray =
      carList.value?.data?.list?.filter((item) => item.checked) || []
    navigateTo({
      path: '/order/confirm',
      query: {
        productList: JSON.stringify(
          selectedArray.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          }))
        ),
      },
    })
  }
</script>
