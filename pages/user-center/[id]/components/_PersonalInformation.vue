<template>
  <AsyncDataWrapper
    :is-loading="isUserInfoLoading"
    loading-ui-mode="form"
    @on-retry="() => getUserInfoAction()">
    <template #loading>
      <SkeletonForm :form-item-lines="2"></SkeletonForm>
    </template>
    <UCard>
      <h3 class="font-bold text-lg mb-3">
        {{ $t('userCenter.details.personalInformation') }}
      </h3>
      <UForm
        class="flex flex-col gap-3"
        :schema="userInfoSchema"
        :state="userInfoForm"
        @submit="onUpdateUserInfo">
        <div class="flex flex-col gap-3 md:flex-row">
          <UFormGroup
            class="flex-1"
            :label="$t('userCenter.details.firstName')">
            <AppInput
              is-clearable
              size="xl"
              :placeholder="$t('userCenter.details.firstNamePlaceholder')"
              v-model="userInfoForm.firstName"
              variant="outline"></AppInput>
          </UFormGroup>
          <UFormGroup class="flex-1" :label="$t('userCenter.details.lastName')">
            <AppInput
              is-clearable
              size="xl"
              :placeholder="$t('userCenter.details.lastNamePlaceholder')"
              v-model="userInfoForm.lastName"
              variant="outline"></AppInput>
          </UFormGroup>
        </div>

        <UFormGroup :label="$t('userCenter.details.email')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.details.emailPlaceholder')"
            v-model="userInfoForm.email"
            variant="outline"></AppInput>
        </UFormGroup>
      </UForm>
      <template #footer>
        <div class="text-right">
          <UButton
            type="submit"
            :loading="isLoading"
            :label="$t('userCenter.details.updateDetails')"></UButton>
        </div>
      </template>
    </UCard>
  </AsyncDataWrapper>
</template>

<script lang="ts" setup>
  import { z } from 'zod'
  import type { FormSubmitEvent } from '#ui/types'
  import { modifyUserInfo, getUserInfo } from '~/api/user'
  const { t } = useI18n()

  const userInfoSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(t('register.invalidEmail')),
  })

  type UserInfoSchemaType = z.output<typeof userInfoSchema>

  const userInfoForm = reactive({
    firstName: '',
    lastName: '',
    email: '',
  })

  const { isLoading, execute } = useLoading(modifyUserInfo)
  const onUpdateUserInfo = (event: FormSubmitEvent<UserInfoSchemaType>) => {
    execute && execute(userInfoForm)
  }
  const {
    isLoading: isUserInfoLoading,
    execute: getUserInfoAction,
    data: userInfo,
  } = useLoading(getUserInfo)
  onMounted(() => {
    getUserInfoAction && getUserInfoAction()
  })
</script>
