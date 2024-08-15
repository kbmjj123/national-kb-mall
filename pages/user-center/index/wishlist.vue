<template>
  <div class="relative">
    <UCard v-if="wishListInfo">
      <template #header>
        <div class="flex flex-row items-center justify-between">
          <h3>{{ $t('userCenter.frame.wishlist') }}</h3>
          <div class="flex flex-row items-center gap-3">
            <UButton
              color="gray"
              size="xs"
							@click="showSelectFlag=!showSelectFlag"
              icon="i-heroicons-share"
              :label="$t('userCenter.wishlist.share')"
              variant="ghost"></UButton>
            <UButton
              icon="i-heroicons-plus-small"
              color="gray"
							size="xs"
              variant="ghost"
              :label="$t('userCenter.wishlist.addGroup')"
              @click="showEditFlag = true"
              aria-label="Theme"></UButton>
            <span class="text-xs">{{
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
          <WishListItem
            :item-info="element"
						:showSelectFlag="showSelectFlag"
            @on-edit-group="onEditGroup(element.id)"></WishListItem>
        </template>
      </draggable>
      <!-- 新增分组视图 -->
      <EditGroupModal v-model="showEditFlag"></EditGroupModal>
    </UCard>
		<!-- 固定于底部的用于分享的视图 -->
		<section v-if="showSelectFlag" class="flex flex-row-reverse gap-4 mt-4 ring-1 ring-gray-200 rounded-lg dark:ring-gray-800 sticky bottom-0 left-0 right-0 p-3 bg-white shadow-sm dark:shadow-black dark:bg-gray-900">
			<Sharing></Sharing>
			<p>{{ $t('userCenter.wishlist.shareTo') }}</p>
		</section>
  </div>
</template>

<script setup lang="ts">
  import draggable from 'vuedraggable'
  import EditGroupModal from './components/_EditGroupModal.vue'
  import WishListItem from './components/_WishListItem.vue'
  import {
    type WishProductType,
    getWishList,
    publishTempWishList,
  } from '~/api/wishlist'

  const drag = ref(false)
  const showEditFlag = ref(false)
  const currentEditId = ref('')
	const showSelectFlag = ref(false)
  const {
    isLoading,
    execute: getWishListAction,
    data: wishListInfo,
  } = useLoading(getWishList)
  onMounted(() => {
    getWishListAction && getWishListAction()
  })
  // 编辑分组
  const onEditGroup = (id: string) => {
    currentEditId.value = id
    showEditFlag.value = true
  }
</script>

<style scoped>
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
</style>
