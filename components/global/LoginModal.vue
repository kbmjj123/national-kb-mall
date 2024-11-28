<template>
	<UModal>
		<UCard :ui="{ footer: { padding: 'p-0 sm:px-0' } }">
			<LoginForm @on-success="onLoginSuccess"></LoginForm>
		</UCard>
	</UModal>
</template>

<script setup lang="ts">
	export type LoginProps = {
		callback: Function
	}

	const {} = defineProps<{
		callback: Function
	}>()

	// 登录成功的回调
	const onLoginSuccess = () => {
		alert('我是登录成功后的回调')
	}
</script>