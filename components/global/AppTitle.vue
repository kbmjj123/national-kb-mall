<template>
  <div class="flex flex-row items-center justify-between p-2">
    <h3 class="font-bold">{{ title }}</h3>
    <slot v-if="$slots.default"></slot>
    <UButton
      v-else
      :label="buttonInfo?.text"
      :target="buttonInfo?.target"
      :to="buttonInfo?.link"
			variant="link"
      @click="buttonInfo?.action"></UButton>
  </div>
</template>

<script setup lang="ts">
  const { title, buttonInfo } = defineProps<{
    title?: string
    buttonInfo?: {
      text: string
      link?: string
      target?: string
      action?: Function
    }
  }>()
</script>
