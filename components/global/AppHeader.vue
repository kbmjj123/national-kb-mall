<template>
  <div class="sticky top-0 z-50">
      <header
        ref="header"
        class="bg-white shadow-sm dark:shadow-black dark:bg-gray-900">
        <div class="container flex justify-between items-center py-4">
          <div class="flex items-center gap-4">
            <UButton
              class="lg:hidden"
              @click="isShowMenu = true"
              icon="i-heroicons-bars-3-16-solid"
              color="gray"
              variant="ghost"></UButton>
            <AppIcon></AppIcon>
          </div>
          <HeadMenu mode="horizontal"></HeadMenu>
          <div class="flex items-center gap-3 text-lg">
						<ClientOnly>
							<AppInput
								is-clearable
								icon="i-heroicons-magnifying-glass"
								:placeholder="$t('index.searchHolder')"
								:class="headerClasses"></AppInput>
						</ClientOnly>
            <ToggleLanguage></ToggleLanguage>
            <ToggleColor></ToggleColor>
            <UButton
              icon="i-heroicons-magnifying-glass"
              color="gray"
              class="inline-flex lg:hidden"
              variant="ghost"
              @click="onToggleSearchInput"
              aria-label="Theme"></UButton>
            <UButton
              icon="i-heroicons-user"
              color="gray"
              to="/user-center/u888/details"
              variant="ghost"
              aria-label="Theme"></UButton>
            <ShoppingCar></ShoppingCar>
          </div>
        </div>
      </header>
      <!-- 以下是search输入框的overlay -->
      <div
        @click="onToggleSearchInput"
        class="fixed fixed-search left-0 right-0 bottom-0 inset-0 transition-opacity bg-gray-200/75 dark:bg-gray-800/75"
        v-show="isShowSearch"></div>
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
        </div>
      </USlideover>
  </div>
</template>

<script setup lang="ts">
  import { tryOnMounted, useWindowSize } from '@vueuse/core'
  const isShowMenu = ref(false)
  const isShowSearch = ref(false)
  const header = ref()
  const headerHeight = ref('0px')
  const { width } = useWindowSize() // 1024
  tryOnMounted(() => {
    if (header.value) {
      headerHeight.value = `${header.value.offsetHeight + 1}px`
    }
  })
  const headerClasses = computed(() => {
    if (width.value > 1024) {
      // 大屏幕-->搜索按钮入口默认是正常展示的
      return 'hidden lg:inline-block'
    } else {
      // 小屏幕-->搜素按钮是悬浮在header下方的
      if (isShowSearch.value) {
        // 点击了搜索按钮入口
        return `fixed block fixed-search left-0 right-0 z-10 p-2 bg-white shadow-sm dark:shadow-black dark:bg-gray-900`
      } else {
        return 'hidden'
      }
    }
  })
  // 展示搜索输入框
  const onToggleSearchInput = () => {
    isShowSearch.value = !isShowSearch.value
  }
</script>

<style scoped>
  .fixed-search {
    top: v-bind(headerHeight);
  }
</style>
