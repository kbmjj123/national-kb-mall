<template>
	<div>
		<h3>{{ $t('order.confirm.contactInfo') }}</h3>
		<p>{{ $t('register.alreadyHasAccount') }}<NuxtLink>{{ $t('register.pleaseLogin') }}</NuxtLink></p>
		<UForm :state="contactForm">
			<UFromGroup :label="$t('register.email')">
				<AppInput is-clearable v-model="contactForm.account" :placeholder="$t('userCenter.details.emailPlaceholder')"></AppInput>
			</UFromGroup>
			<UFromGroup class="flex flex-row">{{ $t('register.createNewAccount') }}<UCheckbox></UCheckbox></UFromGroup>
			<UFromGroup :label="$t('order.confirm.emailCode')">
				<AppInput :placeholder="$t('order.confirm.emailCodeHolder')"></AppInput>
			</UFromGroup>
			<UFromGroup :label="$t('register.password')">
				<AppInput is-clearable></AppInput>
			</UFromGroup>
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
