<template>
  <ClientOnly>
    <p class="flex flex-row justify-between gap-3">
      <UButton
        :icon="isInWishList?.data ? 'i-ri-heart-3-fill' : 'i-ri-heart-3-line'"
        :label="
          isInWishList?.data
            ? $t('product.removeFromWishlist')
            : $t('product.addToWishlist')
        "
        v-if="1 === groupListInfo?.data?.length"
        size="2xs"
        :color="isInWishList?.data ? 'primary' : 'gray'"
        :loading="isLoading"
        variant="link"
        @click="() => addToWishListAction(slug)"></UButton>
      <UPopover v-else mode="click" overlay :popper="{ arrow: true }" @update:open="onUpdateOpen">
        <UButton
          :icon="isInWishList?.data ? 'i-ri-heart-3-fill' : 'i-ri-heart-3-line'"
          :label="
            isInWishList?.data
              ? $t('product.removeFromWishlist')
              : $t('product.addToWishlist')
          "
          size="2xs"
          :color="isInWishList?.data ? 'primary' : 'gray'"
          :loading="isLoading"
          variant="link"
          ></UButton>
        <template #panel>
          <!-- 愿望清单分组视图 -->
          <section class="flex flex-col">
            <ul>
              <li
                class="flex flex-row justify-between items-center py-3 px-2 hover:cursor-pointer rounded-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-400 hover:text-gray-900 dark:hover:text-white"
                v-for="(item, index) in groupListInfo?.data"
                @click="onAddToWishListAction(item, slug)"
                :key="index">
                {{ item.name }}
                <UIcon name="i-ic-round-keyboard-arrow-right"></UIcon>
              </li>
            </ul>
          </section>
        </template>
      </UPopover>
      <slot></slot>
    </p>
  </ClientOnly>
</template>

<script setup lang="ts">
  import {
    addToWishList,
    checkIfInWishList,
    getWishListGroupList,
		type OnlyWishListGroupType
  } from '~/api/wishlist'
  const props = defineProps<{
    slug: string
  }>()
	// 将商品加入至愿望清单
  const { isLoading, execute: addToWishListAction } = useLoading(addToWishList)
	const onAddToWishListAction = (groupItem: OnlyWishListGroupType, slug: string) => {
		addToWishListAction && addToWishListAction({ slug, groupId: groupItem.id })
	}
  // 检查当前商品是否已加入愿望清单列表中
  const { data: isInWishList, execute: checkIfInWishListAction } =
    useLoading(checkIfInWishList)

  // 仅获取愿望清单分组列表
  const {
    isLoading: isLoadingGroupInfo,
    data: groupListInfo,
    execute: getWishListGroupListAction,
  } = useLoading(getWishListGroupList)
  onMounted(() => {
    checkIfInWishListAction && checkIfInWishListAction(props.slug)
  })
	// 愿望清单被hover的回调
	const onUpdateOpen = (open: boolean) => {
		if(open){
			if(!groupListInfo.value?.data || groupListInfo.value?.data.length === 0){
				getWishListGroupListAction && getWishListGroupListAction()
			}
		}
	}
</script>
