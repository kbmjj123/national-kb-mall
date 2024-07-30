<template>
  <ul class="grid gap-3 auto-resize grid-cols-min-200" v-if="productList">
    <NuxtLink
      to="/product/x123"
      v-for="(item, index) in productList"
      :key="index">
      <li class="flex flex-col relative gap-y-2 hover:cursor-pointer">
        <NuxtImg class="aspect-9-10 rounded-md" loading="lazy" placeholder :src="item.masterPicture"></NuxtImg>
        <Rating></Rating>
        <p class="line-clamp-2 text-ellipsis h-8 leading-4 font-bold">
          {{ item.name }}
        </p>
        <p class="flex gap-2">
          <span class="line-through text-gray-300 dark:text-gray-400"
            >{{ $t('money') }}{{ item.marketPrice }}</span
          >
          <span>{{ $t('money') }}{{ item.price }}</span>
        </p>
      </li>
    </NuxtLink>
  </ul>
</template>

<script setup lang="ts">
  import { type ProductInfoType } from '~/api/product'

  const { productList } = defineProps<{
    productList: ProductInfoType[] | undefined
  }>()
</script>

<style scoped>
  .aspect-9-10 {
    aspect-ratio: 9 / 10;
  }
</style>
