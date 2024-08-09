<template>
  <UCard v-if="wishListInfo">
    <template #header>
      <div class="flex flex-row items-center justify-between">
        <h3>{{ $t('userCenter.frame.wishlist') }}</h3>
        <div class="flex flex-row items-center gap-3">
          <UButton
            icon="i-heroicons-plus-small"
            color="gray"
            variant="ghost"
            :label="$t('userCenter.wishlist.addGroup')"
            @click="showEditFlag = true"
            aria-label="Theme"></UButton>
          <span class="text-base">{{
            $t('userCenter.wishlist.items', { num: 2 })
          }}</span>
        </div>
      </div>
    </template>
    <!-- 以下是嵌套的可拖动的分组信息 -->
    <draggable
      :list="wishListInfo.data"
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
        <WishListItem :item-info="element"></WishListItem>
      </template>
    </draggable>
		<!-- 新增分组视图 -->
		<EditGroupModal v-model="showEditFlag"></EditGroupModal>
  </UCard>
</template>

<script setup lang="ts">
  import draggable from 'vuedraggable'
  import EditGroupModal from './components/_EditGroupModal.vue'
  import WishListItem from './components/_WishListItem.vue'
  import { getWishList } from '~/api/wishlist'

  const drag = ref(false)
	const showEditFlag = ref(false)
  const {
    isLoading,
    execute: getWishListAction,
    data: wishListInfo,
  } = useLoading(getWishList)
  onMounted(() => {
    getWishListAction && getWishListAction()
  })
</script>

<style scoped>
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
</style>
