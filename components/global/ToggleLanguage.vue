<template>
	<USelectMenu size="xs" :modalValue="currentLocale" leading :leadingIcon="currentLocale?.icon" :options="locales" @change="onToggleLacale" option-attribute="name">
		<template #label>
			<span>{{ currentLocale?.name }}</span>
		</template>
		<template #option="{ option: item }">
			<UIcon :name="item.icon" class="w-5 h-5"></UIcon>
			<span>{{ item.name }}</span>
		</template>
	</USelectMenu>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const currentLocale = ref(locales.value.find(item => item.code === locale.value))
const onToggleLacale = (event: any) => {
	setLocale(event.code)
	currentLocale.value = event
}
</script>
