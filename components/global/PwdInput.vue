<template>
	<UInput type="password">
		<template #trailing>
			<UButton 
				color="gray"
				variant="link"
				type="password"
				:icon="showPwdFlag? 'i-ri-eye-close-line' : 'i-ri-eye-line'"
				:padded="false"
				:ui="{ icon: { trailing: { pointer: '' } } }"
				@click="showPwdFlag=!showPwdFlag"
			></UButton>
		</template>
	</UInput>
</template>

<script setup lang="ts">

const showPwdFlag = ref(false)


</script>
