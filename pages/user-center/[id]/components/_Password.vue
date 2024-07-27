<template>
  <UCard>
    <template #header>
      <div class="flex flex-row justify-between items-center">
        <h3 class="font-bold text-lg">
          {{ $t('userCenter.changePwd.title') }}
        </h3>
        <UButton
          type="submit"
          :loading="isSettingPwd"
          :label="$t('userCenter.details.updateDetails')"></UButton>
      </div>
    </template>
    <UForm :state="pwdInfoForm" class="grid grid-cols-1 gap-3 md:grid-cols-2">
      <UFormGroup :label="$t('userCenter.changePwd.newPassword')">
        <AppInput
          size="xl"
          variant="outline"
          v-model="pwdInfoForm.newPassword"
          is-clearable
          is-toggle-type
          :placeholder="$t('userCenter.changePwd.passwordHolder')"></AppInput>
      </UFormGroup>
      <UFormGroup :label="$t('userCenter.changePwd.confirmNewPassword')">
        <AppInput
          size="xl"
          variant="outline"
          v-model="pwdInfoForm.confirmPassword"
          is-clearable
          is-toggle-type
          :placeholder="$t('userCenter.changePwd.passwordHolder')"></AppInput>
      </UFormGroup>
    </UForm>
  </UCard>
</template>

<script lang="ts" setup>
  import { setPwdInfo } from '~/api/user'
  import { z } from 'zod'
  const pwdSchema = z.object({
    newPassword: z.string(),
    confirmPassword: z.string(),
  })
  type PwdSchemaStype = z.output<typeof pwdSchema>

  const pwdInfoForm = reactive({
    newPassword: '',
    confirmPassword: '',
  })

  const { isLoading: isSettingPwd, execute: setPwdInfoAction } =
    useLoading(setPwdInfo)
  const onSubmit = () => {
    setPwdInfoAction && setPwdInfoAction(pwdInfoForm)
  }
</script>
