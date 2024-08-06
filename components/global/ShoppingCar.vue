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
          <h3>{{ $t('shoppingCart.name') }}</h3>
        </div>
      </template>
      <div class="relative">
        <section class="" v-for="(item, index) in carList.data.list" :key="index">
          <NuxtImg class="" :src="item.masterPicture"></NuxtImg>
          <p class="line-clamp-1 text-ellipsis h-4 leading-4 font-bold">
            {{ item.name }}
          </p>
					<p class="flex flex-row justify-between">
						<span>{{ item.price }}</span>
						<NumberInput v-model="item.quantity"></NumberInput>
					</p>
        </section>
        <!-- 空视图 -->
        <div v-if="0 === carList.data.list.length && !isLoading">我是空视图效果</div>
				<Spin v-if="isLoading"></Spin>
      </div>
      <template #footer>
        <Placeholder class="h-8" />
      </template>
    </UCard>
  </USlideover>
</template>

<script setup lang="ts">
  const isShowShoppingCar = ref(false)
  import { getShoppingCarList } from '~/api/shoppingCar'
  const { isLoading, data: carList, execute } = useLoading(getShoppingCarList)
  onMounted(() => {
		execute && execute()
	})
</script>
