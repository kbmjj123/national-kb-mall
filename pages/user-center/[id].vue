<template>
  <div class="container flex flex-col gap-4 md:flex-row pt-3">
    <UCard class="">
      <ul class="flex flex-row flex-wrap gap-4 md:flex-col">
        <li>
          <NuxtLink
            class="flex items-center gap-1 rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-400"
            :to="'/user-center/' + id + '/details'">
            <UIcon name="i-heroicons-information-circle"></UIcon>
            <span>{{ $t('userCenter.frame.myDetails') }}</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            class="flex items-center gap-1 rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-400"
            :to="'/user-center/' + id + '/orders'">
            <UIcon name="i-heroicons-shopping-bag"></UIcon>
            <span>{{ $t('userCenter.frame.orders') }}</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            class="flex items-center gap-1 rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-400"
            :to="'/user-center/' + id + '/downloads'">
            <UIcon name="i-heroicons-archive-box-arrow-down"></UIcon>
            <span>{{ $t('userCenter.frame.downloads') }}</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            class="flex items-center gap-1 rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-400">
            <UIcon
              name="i-heroicons-arrow-right-start-on-rectangle-16-solid"></UIcon>
            <span>{{ $t('userCenter.frame.logout') }}</span>
          </NuxtLink>
        </li>
      </ul>
    </UCard>
    <UCard class="flex-1">
      <NuxtPage></NuxtPage>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router'
  const route = useRoute()
  const id = route.params.id
</script>
