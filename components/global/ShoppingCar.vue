<template>
  <UButton
    icon="i-ph-shopping-cart-bold"
    color="gray"
    @click="isShowShoppingCar = true"
    variant="ghost"
    aria-label="Theme"></UButton>
  <!-- 以下是购物车愿望清单 -->
  <USlideover v-model="isShowShoppingCar" side="right">
    <UCard
      class="flex flex-col flex-1"
      :ui="{
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }">
      <template #header>
        <div class="flex items-center h-8">
          <UButton
            color="gray"
            variant="ghost"
            size="sm"
            icon="i-heroicons-x-mark-20-solid"
            class="flex absolute right-5 top-5 z-10"
            square
            padded
            @click="isShowShoppingCar = false" />

          <h3>愿望清单</h3>
        </div>
      </template>

      <Placeholder class="h-full" />

      <template #footer>
        <Placeholder class="h-8" />
      </template>
    </UCard>
  </USlideover>
</template>

<script setup lang="ts">
  const isShowShoppingCar = ref(false)
</script>
