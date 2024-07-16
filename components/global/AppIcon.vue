<template>
	<NuxtLink class="inline-flex items-center gap-1" to="/">
		<img src="~/assets/icons/ic_app_icon.png" :class="appIconSize"></img>
		<span class="text-current font-bold" :class="['text-current', 'font-bold', appTitleSize]">KB商城</span>
	</NuxtLink>
</template>

<script setup lang="ts">
const SIZE_MAP = {
	'xs': 'w-8',
	'sm': 'w-10',
	'md': 'w-12',
	'lg': 'w-14',
	'xl': 'w-16'
}
const FONT_SIZE_MAP = {
	'xs': 'text-xs',
	'sm': 'text-sm',
	'md': 'text-base',
	'lg': 'text-lg',
	'xl': 'text-xl'
}
interface Props {
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}
const { size } = withDefaults(defineProps<Props>(), {
	size: 'xs'
})
const appIconSize = computed(() => {
	return `${SIZE_MAP[size]}` || 'w-8'
})
const appTitleSize = computed(() => {
	return `${FONT_SIZE_MAP[size]}` || 'text-lg'
})
</script>
