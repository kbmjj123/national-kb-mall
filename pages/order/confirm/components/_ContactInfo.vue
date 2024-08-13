<template>
	<div>
		<h3>{{ $t('order.confirm.contactInfo') }}</h3>
		<p>{{ $t('register.alreadyHasAccount') }}<NuxtLink>{{ $t('register.pleaseLogin') }}</NuxtLink></p>
		<UForm :state="contactForm">
			<UFromGroup :label="$t('register.email')">
				<AppInput is-clearable v-model="contactForm.account" :placeholder="$t('userCenter.details.emailPlaceholder')"></AppInput>
			</UFromGroup>
			<p>{{ $t('register.createNewAccount') }}<UCheckbox></UCheckbox></p>
			<UFormGroup :label="$t('order.confirm.emailCode')">
				<AppInput :placeholder="$t('order.confirm.emailCodeHolder')"></AppInput>
			</UFormGroup>
			<UFormGroup :label="$t('register.password')">
				<AppInput is-clearable></AppInput>
			</UFormGroup>
		</UForm>
	</div>
</template>

<script setup lang="ts">
const contactForm = reactive({
	account: '',
	emailCode: '',
	password: ''
})
</script>
