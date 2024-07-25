<template>
  <div
    class="flex flex-col gap-4 bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800 rounded-lg shadow px-4 py-5 sm:p-6">
    <USkeleton class="h-6 w-[120px]"></USkeleton>
    <div class="flex gap-4" v-for="(item, index) in formItemLines" :key="index">
      <USkeleton class="h-4 w-[100px]"></USkeleton>
      <USkeleton class="h-4 flex-1"></USkeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      formItemLines?: number
    }>(),
    {
      formItemLines: 1,
    }
  )
</script>
