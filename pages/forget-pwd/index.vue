<template>
	<div class="container">
		<div class="text-center p-12">
			<AppIcon size="sm"></AppIcon>
			<p class="mt-5 font-bold text-lg">{{ $t('reset.title') }}</p>
		</div>
		<UForm class="form-container space-y-4" :schema="resetSchema" :state="resetForm" @submit="onSubmit">
			<UFormGroup :label="$t('login.emalOrUsername')" name="email" required>
				<UInput size="xl" v-model="resetForm.email" variant="outline"></UInput>
			</UFormGroup>
			
			<UButton type="submit" :loading="isLoading" size="xl" class="mt-3" block>{{ $t('register.registerBtn') }}</UButton>
		</UForm>
	</div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { resetPwd } from '~/api/user'
const { t } = useI18n()

const resetSchema = z.object({
	email: z.string().email(t('register.invalidEmail')),
})
type ResetSchemaType = z.output<typeof resetSchema>
const resetForm = reactive({
	email: ''
})

const { execute, isLoading } = useLoading(resetPwd)

const onSubmit = async (event: FormSubmitEvent<ResetSchemaType>) => {
	execute && execute(resetForm, (res: any) => {
		console.info(res)
	})
}

</script>