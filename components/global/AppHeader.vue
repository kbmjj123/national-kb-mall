<template>
  <header
    class="bg-white sticky top-0 flex justify-between items-center p-4 shadow-sm dark:shadow-black dark:bg-gray-900">
    <div class="flex items-center gap-4">
      <UButton
				class="lg:hidden"
        @click="isShowMenu = true"
        icon="i-heroicons-bars-3-16-solid"
        color="gray"
        variant="ghost"
        ></UButton>
      <AppIcon></AppIcon>
    </div>
		<HeadMenu mode="horizontal"></HeadMenu>
    <div class="flex items-center gap-3 text-lg">
      <ToggleLanguage></ToggleLanguage>
      <ToggleColor></ToggleColor>
      <UButton
        icon="i-heroicons-magnifying-glass"
        color="gray"
        variant="ghost"
        aria-label="Theme"></UButton>
			<ShoppingCar></ShoppingCar>
    </div>
  </header>
  <!-- 以下是移动端展示的菜单 -->
  <USlideover v-model="isShowMenu" side="left">
    <div class="p-4 flex-1">
      <UButton
        color="gray"
        variant="ghost"
        size="sm"
        icon="i-heroicons-x-mark-20-solid"
        class="flex absolute end-5 top-5 z-10"
        square
        padded
        @click="isShowMenu = false" />
			<HeadMenu></HeadMenu>
      <Placeholder class="h-full" />
    </div>
  </USlideover>
</template>

<script setup lang="ts">
  const isShowMenu = ref(false)
  
</script>
