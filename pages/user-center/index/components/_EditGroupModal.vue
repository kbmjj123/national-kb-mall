<template>
  <UModal v-model="model">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }">
      <template #header>
        <h3>{{ $t('userCenter.wishlist.editTitle') }}</h3>
      </template>
      <UForm :state="groupInfo.data">
        <UFormGroup :label="$t('userCenter.wishlist.belongGroup')">
          <USelect></USelect>
        </UFormGroup>
        <UFormGroup :label="$t('userCenter.wishlist.groupName')">
          <AppInput
            is-clearable
            :placeholder="$t('userCenter.wishlist.groupNameTip')"></AppInput>
        </UFormGroup>
        <UFormGroup :label="$t('userCenter.wishlist.recommendGroup')">
          <UButton v-for="(item, index) in recommendGroupInfo?.data">
            {{ item }}
          </UButton>
        </UFormGroup>
        <UFormGroup :label="$t('userCenter.wishlist.remark')">
          <AppInput is-clearable></AppInput>
        </UFormGroup>
      </UForm>
      <template #footer>
        <div class="flex flex-row gap-4">
          <UButton color="gray" :label="$t('modalTip.cancelTxt')" @click="model=false"></UButton>
          <UButton color="white" :label="$t('modalTip.okTxt')" @click=""></UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
  import {
    getRecommendGroupNameList,
    editWishListGroup,
    getGroupInfo,
  } from '~/api/wishlist'

  const model = defineModel({
    type: Boolean,
    required: true,
  })
	// 获取分组信息
  const {
    isLoading: isLoadingGroupInfo,
    execute: getGroupInfoAction,
    data: groupInfo,
  } = useLoading(getGroupInfo)
	// 获取推荐分组名称列表
  const {
    isLoading,
    execute: getRecommendGroupList,
    data: recommendGroupInfo,
  } = useLoading(getRecommendGroupNameList)
	// 新增/编辑分组
  watch(model, (newVal) => {
    if (newVal) {
      if (0 === recommendGroupInfo.value?.data?.length) {
        getRecommendGroupList && getRecommendGroupList()
      }
    }
  })
	
</script>
