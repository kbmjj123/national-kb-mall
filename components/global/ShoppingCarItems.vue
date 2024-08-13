<template>
  <ul class="flex flex-col gap-2">
    <li
      class="flex flex-row items-center gap-3 p-2 rounded-md hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500"
      v-for="(item, index) in cartList"
      :key="index">
      <UCheckbox v-model="item.checked"></UCheckbox>
      <NuxtImg
        class="w-[60px] h-[60px] rounded-md"
        :src="item.masterPicture"></NuxtImg>
      <div class="flex-1 flex flex-col">
        <div class="flex flex-row flex-1 justify-between">
          <p class="line-clamp-1 text-sm text-ellipsis h-4 leading-4 font-bold">
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
</template>

<script setup lang="ts">
	import { type CarProductType } from '~/api/shoppingCar'
	defineProps<{
		cartList: Array<CarProductType>
	}>()
</script>
