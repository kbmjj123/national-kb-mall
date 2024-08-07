<template>
  <UCard>
    <template #header>
      <div class="flex flex-row items-center justify-between">
        <h3>{{ $t('userCenter.frame.wishlist') }}</h3>
				<div class="flex flex-row items-center gap-3">
					<EditWishListGroup></EditWishListGroup>
					<span class="text-base">{{ $t('userCenter.wishlist.items', { num: 2 }) }}</span>
				</div>
      </div>
    </template>
    <ul>
      <li class="flex flex-row items-center py-3 gap-3">
        <NuxtImg flex="w-[60px] h-[60px] rounded-md"></NuxtImg>
        <div class="flex flex-col gap-2 flex-1">
          <p>XXX</p>
          <p>
            <span>划线价</span>
            <span>销售价</span>
          </p>
        </div>
        <UButton
          icon="i-heroicons-x-mark-20-solid"
          color="gray"
          variant="ghost"
          @click="onRemoveFromWishList"
          aria-label="Theme"></UButton>
      </li>
    </ul>
  </UCard>
</template>

<script setup lang="ts">
	import EditWishListGroup from './components/_EditWishListGroup.vue'
  import { getWishList, removeFromWishList } from '~/api/wishlist'
  const onRemoveFromWishList = () => {}

	const { isLoading, execute: getWishListAction, data: wishListInfo } = useLoading(getWishList)
	onMounted(() => {
		getWishListAction && getWishListAction()
	})
</script>
