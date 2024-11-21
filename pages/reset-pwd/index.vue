<template>
	<div class="container">
		<div class="text-center p-12">
			<AppIcon size="sm"></AppIcon>
			<p class="mt-5 font-bold text-lg">{{ $t('reset.title') }}</p>
		</div>
		<UForm class="form-container space-y-4" :schema="resetSchema" :state="resetForm" @submit="onSubmit">
			<UFormGroup :label="$t('register.password')" name="password" class="mt-3" required>
				<PwdInput size="xl" v-model="resetForm.password" variant="outline" type="password" placeholder=""></PwdInput>
			</UFormGroup>
			<UFormGroup :label="$t('register.confirmPassword')" name="confirmPassword" class="mt-3" required>
				<PwdInput size="xl" v-model="resetForm.confirmPassword" variant="outline" type="password" placeholder=""></PwdInput>
			</UFormGroup>
			<UButton type="submit" :loading="isLoading" size="xl" class="mt-3" block>{{ $t('reset.resetBtn') }}</UButton>
		</UForm>
	</div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { resetPwd, type UserInfoType } from '~/api/user'
import { useRoute } from 'vue-router';
import { useStore } from '~/store/useUserStore'

const { t } = useI18n()

const resetSchema = z.object({
	password: z.string().min(8, t('register.passwordLimited')),
	confirmPassword: z.string().min(8, t('register.passwordLimited'))
})
type ResetSchemaType = z.output<typeof resetSchema>
const resetForm = reactive({
	password: '',
	confirmPassword: ''
})

const { execute, isLoading } = useLoading(resetPwd)

const onSubmit = async (event: FormSubmitEvent<ResetSchemaType>) => {
	const route = useRoute()
	execute && execute({ password: resetForm.password, token: route.query.token }, (res: UserInfoType) => {
		const { email } = res
		const userStore = useStore()
		const router = useRouter()
		userStore.loginAction(email, resetForm.password, router)
	})
}

</script>