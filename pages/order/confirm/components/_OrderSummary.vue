<template>
  <AsyncDataWrapper :is-loading="loading">
    <template #loading>
      <SkeletonOrderSummary></SkeletonOrderSummary>
    </template>
    <div
      class="w-full md:w-[300px] lg:w-[400px] self-start bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800 rounded-lg shadow px-4 py-5 sm:p-6 sticky ul-top z-10 flex flex-col flex-wrap gap-4 md:flex-col">
      <h3>{{ $t('order.confirm.orderSummary') }}</h3>
      <!-- 以下是商品列表 -->
      <ShoppingCarItems :cart-list="orderInfo?.data?.productList"></ShoppingCarItems>
      <div class="flex flex-row justify-between text-sm font-bold">
        <label>{{ $t('order.confirm.subtotal') }}</label>
        <span>{{ $t('money') }}{{ 100.0 }}</span>
      </div>
      <div class="flex flex-row justify-between text-sm font-bold">
        <label>{{ $t('order.confirm.shipping') }}</label>
        <span>{{ $t('money') }}{{ 10.0 }}</span>
      </div>
      <div class="flex flex-row justify-between text-lg font-bold">
        <label>{{ $t('order.confirm.total') }}</label>
        <span>{{ $t('money') }}{{ 10.0 }}</span>
      </div>
      <UButton :label="$t('order.confirm.checkout')" block @click="onSubmitOrder" size="lg"></UButton>
    </div>
  </AsyncDataWrapper>
</template>

<script lang="ts" setup>
  import { previewOrder, makeOrder } from '~/api/order'
  const route = useRoute()
  const { productList } = route.query
  const waitToCheckoutList = JSON.parse(productList as string)
  // 预览订单
  const {
    isLoading: loading,
    execute: getPreviewOrder,
    data: orderInfo,
  } = useLoading(previewOrder)
  onMounted(() => {
    getPreviewOrder && getPreviewOrder({ params: waitToCheckoutList })
  })
	// 下单动作
	const { isLoading: isSubmitting, execute: submitOrder } = useLoading(makeOrder)
	const onSubmitOrder = () => {

	}
</script>
