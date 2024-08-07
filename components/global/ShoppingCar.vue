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
          <Button
            color="gray"
            square
            padded
						:loading="isCleanLoading"
            @click="onClear"
            variant="ghost"
						class="flex absolute right-8 top-5 z-10"
            size="sm"
            icon="i-heroicons-trash"></Button>
          <h3 class="font-bold text-base">{{ $t('shoppingCart.name') }}</h3>
        </div>
      </template>
      <div class="relative overflow-auto">
        <ul class="flex flex-col gap-2">
          <li
            class="flex flex-row items-center gap-2 p-2 rounded-md hover:cursor-pointer hover:bg-gray-500"
            v-for="(item, index) in carList?.data"
            :key="index">
            <UCheckbox v-model="item.checked"></UCheckbox>
            <NuxtImg
              class="w-[60px] h-[60px] rounded-md"
              :src="item.masterPicture"></NuxtImg>
            <div class="flex-1 flex flex-col justify-between">
              <p
                class="line-clamp-1 text-base text-ellipsis h-4 leading-4 font-bold">
                {{ item.name }}
              </p>
              <p class="flex flex-row justify-between items-end">
                <span>{{ item.price }}</span>
                <NumberInput v-model="item.quantity"></NumberInput>
              </p>
            </div>
          </li>
        </ul>

        <!-- 空视图 -->
        <div v-if="0 === carList?.data?.length && !isLoading">
          我是空视图效果
        </div>
        <Spin v-if="isLoading"></Spin>
      </div>
      <template #footer>
				<UButton color="gray" block size="md" @click="onSettled" :disabled="0 === waitToCheckoutAmount">
					{{ $t('shoppingCart.checkout') }}{{ $t('money') }}{{ waitToCheckoutAmount }}
				</UButton>
			</template>
    </UCard>
  </USlideover>
</template>

<script setup lang="ts">
	import { getShoppingCarList, cleanProductInCar } from '~/api/shoppingCar'
  const isShowShoppingCar = ref(false)
  const { isLoading, data: carList, execute } = useLoading(getShoppingCarList)
  watch(isShowShoppingCar, (newVal) => {
    if (newVal && (!carList.value || 0 === carList.value?.data?.length)) {
      execute &&
        execute({}, null, (res: any) => {
          res.data = res.data?.map((item: any) => ({
            ...item,
            checked: false,
          }))
        })
    }
  })
	// 待结算金额
	const waitToCheckoutAmount = computed(() => {
		const selectedArray = carList.value?.data.filter(item => item.checked) || []
		return useSumBy(selectedArray, item => Number(item.price)) || 0
	})
  const { isLoading: isCleanLoading, execute: cleanProductAction } =
    useLoading(cleanProductInCar)
  // 清空购物车商品列表
  const onClear = () => {
    cleanProductAction && cleanProductAction()
  }
	// 结算
	const onSettled = () => {
		isShowShoppingCar.value = false
		// 将相关的信息收集起来，并跳转到确认订单页面
		const selectedArray = carList.value?.data.filter(item => item.checked) || []
		navigateTo({
			path: '/order/confirm',
			query: {
				productList: JSON.stringify(selectedArray.map(item => ({
					id: item.id,
					quantity: item.quantity
				})))
			}
		})
	}
</script>
