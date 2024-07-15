<template>
	<UContainer class="mx-auto">
		<div class="text-center p-12">
			<AppIcon></AppIcon>
			<p class="mt-5 font-bold text-lg">{{ $t('login.loginTip') }}</p>
			<p class="mt-1 text-base">{{ $t('login.noHaveAccount') }}
				<NuxtLink to="/register" class="text-primary">{{ $t('login.signUp') }}</NuxtLink></p>
		</div>
		<UForm class="form-container space-y-4" :schema="loginSchema" :state="loginForm" @submit="onSubmit">
			<UFormGroup :label="$t('login.emalOrUsername')" required>
				<UInput size="xl" v-model="loginForm.emailOrUsername" variant="outline"></UInput>
			</UFormGroup>
			<UFormGroup :label="$t('register.password')" required class="mt-3">
				<UInput size="xl" v-model="loginForm.password" variant="outline"</UInput>
			</UFormGroup>
			<UButton type="submit" size="xl" class="mt-5" block :loading="loading">{{ $t('login.loginBtn') }}</UButton>
		</UForm>
	</UContainer>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { login } from '~/api/user'
const { t } = useI18n()
const loading = ref(false)

const loginSchema = z.object({
	emailOrUsername: z.string(),
	password: z.string().min(8, t('register.passwordLimited'))
})

type LoginSchemaType = z.output<typeof loginSchema>

const loginForm = reactive({
	emailOrUsername: 'kbmjj123@gmail.com',
	password: 'zgl99999999'
})
const onSubmit = async (event: FormSubmitEvent<LoginSchemaType>) => {
	loading.value = true
	const res = await login(loginForm.emailOrUsername, loginForm.password)
	loading.value = false
	console.info(res)
}

</script>