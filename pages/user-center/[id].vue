<template>
  <div class="container flex flex-col gap-4 md:flex-row pt-3">
    <ul
      class="bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800 rounded-lg shadow px-4 py-5 sm:p-6 sticky top-0 flex flex-row flex-wrap gap-4 md:flex-col">
      <li>
        <NuxtLink
          class="flex items-center gap-2 rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-400"
          :to="'/user-center/' + id + '/details'">
          <UIcon name="i-heroicons-information-circle"></UIcon>
          <span>{{ $t('userCenter.frame.myDetails') }}</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          class="flex items-center gap-x-2 rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-400"
          :to="'/user-center/' + id + '/orders'">
          <UIcon name="i-heroicons-shopping-bag"></UIcon>
          <span>{{ $t('userCenter.frame.orders') }}</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          class="flex items-center gap-2 rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-400"
          :to="'/user-center/' + id + '/downloads'">
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
    <section class="flex-1">
      <NuxtPage></NuxtPage>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router'
  const route = useRoute()
  const id = route.params.id
</script>
