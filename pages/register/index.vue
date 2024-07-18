<template>
	<div class="container">
		<div class="text-center p-12">
			<AppIcon size="sm"></AppIcon>
			<p class="mt-5 font-bold text-lg">{{ $t('register.title') }}</p>
			<p class="mt-1 text-base">{{ $t('register.alreadyHasAccount') }}<NuxtLink to="/login" class="text-primary">{{ $t('register.pleaseLogin') }}</NuxtLink></p>
		</div>
		<UForm class="form-container space-y-4" :schema="registerSchema" :state="registerForm" @submit="onSubmit">
			<UFormGroup :label="$t('register.email')" name="email" required>
				<UInput size="xl" v-model="registerForm.email" variant="outline"></UInput>
			</UFormGroup>
			<UFormGroup :label="$t('register.account')" name="account" class="mt-3" required>
				<UInput size="xl" v-model="registerForm.account" variant="outline"></UInput>
			</UFormGroup>
			<UFormGroup :label="$t('register.password')" name="password" class="mt-3" required>
				<UInput size="xl" v-model="registerForm.password" variant="outline" type="password" placeholder=""></UInput>
			</UFormGroup>
			<UButton type="submit" size="xl" class="mt-3" block>{{ $t('register.registerBtn') }}</UButton>
		</UForm>
	</div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { register } from '~/api/user'
const { t } = useI18n()

const registerSchema = z.object({
	email: z.string().email(t('register.invalidEmail')),
	account: z.string(),
	password: z.string().min(8, t('register.passwordLimited'))
})

type RegisterSchemaType = z.output<typeof registerSchema>

const registerForm = reactive({
	email: '', 
	account: '',
	password: ''
})

const onSubmit = async (event: FormSubmitEvent<RegisterSchemaType>) => {
	
}
</script>