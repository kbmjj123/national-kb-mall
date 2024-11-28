<template>
  <UForm
    class="form-container space-y-4"
    :schema="loginSchema"
    :state="loginForm"
    @submit="onSubmit">
    <UFormGroup :label="$t('login.emalOrUsername')" required>
      <AppInput
        is-clearable
        size="xl"
        v-model="loginForm.emailOrUsername"
        variant="outline"></AppInput>
    </UFormGroup>
    <UFormGroup :label="$t('register.password')" required class="mt-3">
      <AppInput
        is-clearable
        is-toggle-type
        type="password"
        size="xl"
        v-model="loginForm.password"
        variant="outline"></AppInput>
    </UFormGroup>
    <UButton type="submit" size="xl" class="mt-5" block :loading="loading">{{
      $t('login.loginBtn')
    }}</UButton>
  </UForm>
</template>

<script lang="ts" setup>
  import { z } from 'zod'
  import type { FormSubmitEvent } from '#ui/types'
  import { useStore } from '~/store/useUserStore'

  const useUserStore = useStore()
  const { t } = useI18n()
  const loading = ref(false)

  const loginSchema = z.object({
    emailOrUsername: z.string(),
    password: z.string().min(8, t('register.passwordLimited')),
  })

  type LoginSchemaType = z.output<typeof loginSchema>
	
	const emit = defineEmits<{
		'on-success': []
	}>()

  const loginForm = reactive({
    emailOrUsername: '569751680@qq.com',
    password: 'abc123!@#$',
  })
  // const { execute, isLoading, data } = useLoading(useUserStore.loginAction(loginForm.emailOrUsername, loginForm.password, router))
  const onSubmit = async (event: FormSubmitEvent<LoginSchemaType>) => {
    loading.value = true
    const router = useRouter()
    const res = await useUserStore.loginAction(
      loginForm.emailOrUsername,
      loginForm.password,
      router
    )
    loading.value = false
		emit('on-success')
  }
</script>
