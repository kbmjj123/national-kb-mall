<template>
  <div class="relative">
    <!-- 统一的loading效果 -->
    <template v-if="isLoading">
      <slot name="loading" v-if="$slots.loading"></slot>
      <div v-else>加载中，请稍后...</div>
    </template>
    <!-- 这个是默认的内容插槽 -->
    <slot v-else></slot>
    <!-- 统一的异常效果 -->
    <template v-if="isError">
      <slot name="error" v-if="$slots.error"></slot>
      <div v-else class="flex flex-col items-center justify-center gap-4 p-6">
				<NuxtImg src="~/assets/icons/system/ic-error.png" class="w-10"></NuxtImg>
        <UButton :label="$t('retry')" @click="emit('on-retry')"></UButton>
      </div>
    </template>
    <!-- 空数据的插槽 -->
    <template v-if="isEmpty">
      <slot name="empty" v-if="$slots.empty"></slot>
      <div v-else class="flex flex-col items-center justify-center gap-4 p-6">
				<NuxtImg src="~/assets/icons/system/ic-empty.png" class="w-10"></NuxtImg>
			</div>
    </template>
  </div>
</template>

<script setup lang="ts">
  type Props = {
    isLoading?: boolean
    isError?: boolean
    isEmpty?: boolean
    data?: any
  }

  withDefaults(defineProps<Props>(), {
    isLoading: false,
    isError: false,
    isEmpty: false,
    data: null,
  })

  const emit = defineEmits<{
    'on-retry': []
  }>()
</script>
