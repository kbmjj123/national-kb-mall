<template>
  <div
    class="flex items-center justify-between py-3 border-t border-gray-100 border-solid">
    <span class="">KB-Mall v{{ appVerion }} - by {{ author }}</span>
    <span class="flex gap-x-1">
      <UButton
        v-for="(item, index) in socialList"
        :key="index"
        color="gray"
        variant="ghost"
        :icon="item.icon"
        :to="item.link"></UButton>
    </span>
  </div>
</template>

<script setup lang="ts">
  const { socialList } = useSafeAppConfig().config
	const { appVerion, author } = useSafeRuntimeConfig().publicConfig
</script>
