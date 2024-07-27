<template>
  <AsyncDataWrapper
    :is-loading="isUserInfoLoading"
    loading-ui-mode="form"
    @on-retry="() => getUserInfoAction()">
    <template #loading>
      <SkeletonForm :form-item-lines="2"></SkeletonForm>
    </template>
    <UCard>
      <template #header>
        <div class="flex flex-row justify-between items-center">
          <h3 class="font-bold text-lg">
            {{ $t('userCenter.details.personalInformation') }}
          </h3>
          <UButton
            type="submit"
            color="gray"
            :loading="isLoading"
            :label="$t('userCenter.details.updateDetails')"></UButton>
        </div>
      </template>
      <UForm
        class="grid grid-cols-1 gap-3 md:grid-cols-2"
        :schema="userInfoSchema"
        :state="userInfoForm"
        @submit="onUpdateUserInfo">
        <section
          class="flex flex-col justify-center items-center col-span-1 md:col-span-2 p-4">
          <div class="relative group rounded-full hover:cursor-pointer">
            <UAvatar
              src="https://avatars.githubusercontent.com/u/1559584?v=4"
              icon="i-heroicons-photo"
              size="2xl"
              alt="Avatar"></UAvatar>
            <UIcon class="absolute left-[50%] top-[50%] translate-x-[-50%] w-7 h-7 hidden group-hover:block" name="i-heroicons-camera-16-solid"></UIcon>
          </div>
        </section>
        <UFormGroup :label="$t('userCenter.details.firstName')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.details.firstNamePlaceholder')"
            v-model="userInfoForm.firstName"
            variant="outline"></AppInput>
        </UFormGroup>
        <UFormGroup :label="$t('userCenter.details.lastName')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.details.lastNamePlaceholder')"
            v-model="userInfoForm.lastName"
            variant="outline"></AppInput>
        </UFormGroup>

        <UFormGroup
          :label="$t('userCenter.details.email')"
          class="col-span-1 md:col-span-2">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.details.emailPlaceholder')"
            v-model="userInfoForm.email"
            variant="outline"></AppInput>
        </UFormGroup>
      </UForm>
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
