<template>
  <div class="container flex flex-col gap-4 md:flex-row pt-3 flex-1">
    <ul ref="ulElement"
      class="self-start bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800 rounded-lg shadow px-4 py-5 sm:p-6 sticky ul-top z-10 flex flex-row flex-wrap gap-4 md:flex-col">
      <li>
        <NuxtLink
          class="flex items-center gap-2 rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-400"
          :to="'/user-center/details'">
          <UIcon name="i-heroicons-information-circle"></UIcon>
          <span>{{ $t('userCenter.frame.myDetails') }}</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          class="flex items-center gap-x-2 rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-400"
          :to="'/user-center/orders'">
          <UIcon name="i-heroicons-shopping-bag"></UIcon>
          <span>{{ $t('userCenter.frame.orders') }}</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          class="flex items-center gap-2 rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-400"
          :to="'/user-center/wishlist'">
          <UIcon name="i-heroicons-clipboard-document-list"></UIcon>
          <span>{{ $t('userCenter.frame.wishlist') }}</span>
        </NuxtLink>
      </li>
			<li>
        <NuxtLink
          class="flex items-center gap-2 rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-400"
          :to="'/user-center/downloads'">
          <UIcon name="i-heroicons-archive-box-arrow-down"></UIcon>
          <span>{{ $t('userCenter.frame.downloads') }}</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          class="flex items-center gap-2 rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-400">
          <UIcon
            name="i-heroicons-arrow-right-start-on-rectangle-16-solid"></UIcon>
          <span>{{ $t('userCenter.frame.logout') }}</span>
        </NuxtLink>
      </li>
    </ul>
    <section class="flex-1 pb-4">
      <NuxtPage></NuxtPage>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router'

	const ulElement = ref()
	const ulTop = ref('0px')
	onMounted(() => {
		if(ulElement.value){
			const { top } = ulElement.value.getBoundingClientRect()
			ulTop.value = `${top}px`
			console.info(ulTop.value)
		}
	})
</script>

<style scoped>
.ul-top{
	top: v-bind(ulTop);
}
</style>