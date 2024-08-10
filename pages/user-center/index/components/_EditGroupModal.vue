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
      <AsyncDataWrapper :is-loading="isLoadingGroupInfo">
        <template #loading>
          <SkeletonForm :form-item-lines="3"></SkeletonForm>
        </template>
        <UForm
          class="flex flex-col gap-4"
          :state="groupForm"
          :schema="groupSchema"
          @submit="onSubmit">
          <UFormGroup :label="$t('userCenter.wishlist.groupName')">
            <AppInput
              is-clearable
              v-model="groupForm.name"
              :placeholder="$t('userCenter.wishlist.groupNameTip')"></AppInput>
          </UFormGroup>
          <UFormGroup :label="$t('userCenter.wishlist.recommendGroup')">
            <div class="flex flex-row gap-3">
              <UButton
                v-for="(item, index) in recommendGroupInfo?.data"
                :key="index"
                variant="ghost">
                {{ item }}
              </UButton>
            </div>
          </UFormGroup>
          <UFormGroup :label="$t('userCenter.wishlist.remark')">
            <AppInput is-clearable v-model="groupForm.remark"></AppInput>
          </UFormGroup>
        </UForm>
      </AsyncDataWrapper>
      <template #footer>
        <div class="flex flex-row gap-4 justify-around">
          <UButton
            color="gray"
            :label="$t('modalTip.cancelTxt')"
            @click="model = false"></UButton>
          <UButton
            type="submit"
            color="white"
            :label="$t('modalTip.okTxt')"
            @click=""></UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
  import { z } from 'zod'
  import type { FormSubmitEvent } from '#ui/types'
  import {
    getRecommendGroupNameList,
    editWishListGroup,
    getGroupInfo,
  } from '~/api/wishlist'

  const model = defineModel({
    type: Boolean,
    required: true,
  })
  const props = defineProps<{
    id?: string
  }>()
  const groupForm = reactive({
    id: '',
    name: '',
    remark: '',
  })
  const groupSchema = z.object({
    name: z.string().min(4),
  })
  type GroupSchema = z.output<typeof groupSchema>
  // 获取分组信息
  const {
    isLoading: isLoadingGroupInfo,
    execute: getGroupInfoAction,
    data: groupInfo,
  } = useLoading(getGroupInfo)
  // 获取推荐分组名称列表
  const {
    isLoading: isGettingRecommendGroupList,
    execute: getRecommendGroupList,
    data: recommendGroupInfo,
  } = useLoading(getRecommendGroupNameList)
  watch(model, (newVal) => {
    if (newVal) {
      if (props.id) {
        getGroupInfoAction && getGroupInfoAction(props.id)
      }
      // if (0 === recommendGroupInfo.value?.data?.length) {
      getRecommendGroupList && getRecommendGroupList()
      // }
    }
  })
  // 新增/编辑分组
  const onSubmit = (event: FormSubmitEvent<GroupSchema>) => {}
</script>
