<template>
	<div class="container">
		<div class="text-center p-12">
			<AppIcon size="sm"></AppIcon>
			<p class="mt-5 font-bold text-lg">{{ $t('register.title') }}</p>
			<p class="mt-1 text-base">{{ $t('register.alreadyHasAccount') }}<NuxtLink to="/login" class="text-primary">{{ $t('register.pleaseLogin') }}</NuxtLink></p>
		</div>
		<UForm class="form-container space-y-4" :schema="registerSchema" :state="signupForm">
			<UFormGroup :label="$t('register.password')" name="password" class="mt-3" required>
				<PwdInput size="xl" v-model="signupForm.password" variant="outline" type="password" placeholder=""></PwdInput>
			</UFormGroup>
			<UFormGroup :label="$t('register.confirmPassword')" name="confirmPassword" class="mt-3" required>
				<PwdInput size="xl" v-model="signupForm.confirmPassword" variant="outline" type="password" placeholder=""></PwdInput>
			</UFormGroup>
			<UButton type="submit" @click="onSubmit" :loading="isLoading" size="xl" class="mt-3" block>{{ $t('register.registerBtn') }}</UButton>
		</UForm>
	</div>
</template>

<script lang="ts" setup>
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { register, type UserInfoType } from '~/api/user'
const { t } = useI18n()
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
import { useStore } from '~/store/useUserStore'

const { isLoading, execute, error } = useLoading(register)

const registerSchema = z.object({
	password: z.string().min(8, t('register.passwordLimited')),
	confirmPassword: z.string().min(8, t('register.passwordLimited'))
})

type RegisterSchemaType = z.output<typeof registerSchema>

const signupForm = reactive({
	password: '',
	confirmPassword: ''
})
const onSubmit = async (event: FormSubmitEvent<RegisterSchemaType>) => {
	execute && execute({
		password: signupForm.password,
		token: route.query.token
	}, (res: UserInfoType) => {
		const { email } = res
		const userStore = useStore()
		const router = useRouter()
		userStore.loginAction(email, signupForm.password, router)
	})
}
</script>