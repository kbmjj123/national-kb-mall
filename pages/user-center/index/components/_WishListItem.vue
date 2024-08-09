<template>
  <!-- 渲染一级元素 -->
  <li class="flex flex-col">
    <div
      class="flex flex-row items-center p-1 justify-between bg-gray-50 dark:bg-gray-400">
      <h4>{{ itemInfo.name }}</h4>
      <div class="flex flex-row gap-2">
        <UButton
          color="gray"
          size="xs"
          icon="i-ri-edit-2-line"
          variant="ghost"></UButton>
        <UButton
          color="gray"
          size="xs"
          icon="i-heroicons-trash"
          variant="ghost"></UButton>
      </div>
    </div>
    <draggable
			class="p-2"
      :list="itemInfo.children"
      :animation="200"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
      :component-data="{
        tag: 'ul',
        type: 'transition-group',
        name: !drag ? 'flip-list' : null,
      }">
      <template #item="{ element }">
        <li
          class="flex flex-row items-center py-3 gap-3">
          <NuxtImg
            :src="element.masterPicture"
            class="w-[60px] h-[60px] rounded-md"></NuxtImg>
          <div class="flex flex-col gap-2 flex-1">
            <p>{{ element.name }}</p>
            <p>
              <span>{{ $t('money') }}{{ element.marketPrice }}</span>
              <span>{{ $t('money') }}{{ element.price }}</span>
            </p>
          </div>
          <UButton
            icon="i-heroicons-trash"
            color="gray"
            size="2xs"
            :loading="isLoading"
            variant="ghost"
            @click="onRemoveFromWishList"
            aria-label="Theme"></UButton>
        </li>
      </template>
    </draggable>
  </li>
  <!-- 渲染二级元素 -->
</template>

<script setup lang="ts">
	import draggable from 'vuedraggable'
  import { type WishListGroupType, removeFromWishList } from '~/api/wishlist'
  defineProps<{
    itemInfo: WishListGroupType
  }>()
  const drag = ref(false)
  const { isLoading, execute } = useLoading(removeFromWishList)
  const onRemoveFromWishList = () => {
    execute && execute()
  }
</script>
