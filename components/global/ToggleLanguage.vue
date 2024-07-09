<template>
	<USelect v-model="locale" :options="locales" :onChange="onToggleLacale" option-attribute="name">
		<template #leading>
			<UIcon name="i-flag-cn-4x3" class="w-5 h-5"></UIcon>
		</template>
	</USelect>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const currentLocale = computed(() => {
	return locales.value.find(item => item.code === locale.value)
})
const onToggleLacale = (event) => {
	console.info(event)
}
</script>
