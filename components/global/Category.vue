<template>
  <ul class="container grid gap-2 auto-resize">
    <li
      class="relative group hover:cursor-pointer"
      v-for="(item, index) in categoryInfo?.data"
      :key="index">
      <NuxtImg :src="item.cover" class="object-cover rounded-md"></NuxtImg>
      <p
        class="group-hover:bg-gradient-to-b pt-2 from-transparent to-gray-50-transparent absolute left-0 right-0 bottom-0 text-center font-bold p-2 text-2xl">
        {{ item.name }}
      </p>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { getCategoryListSSR } from '~/api/product'
  const { data: categoryInfo } = await getCategoryListSSR()
</script>

<style scoped>
  .auto-resize {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
	.to-gray-50-transparent{
		--tw-gradient-to: rgba(var(--color-gray-50) / 0.5) var(--tw-gradient-to-position);
	}
</style>
