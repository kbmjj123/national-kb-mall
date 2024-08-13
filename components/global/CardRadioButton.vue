<template>
	<UCard class="flex flex-row items-center gap-2">
		<UIcon v-if="icon" :name="icon" class="w-5 h-5"></UIcon>
		<div class="flex-1 flex flex-col justify-evenly gap-2">
			<p v-if="desc">{{ desc }}</p>
			<div class="font-bold">{{ title }}</div>
		</div>
		<URadio v-model="checked" class="ml-auto"></URadio>
	</UCard>
</template>

<script setup lang="ts">
export type CardRadioProps = {
	icon?: string,
	title: string,
	desc?: string,
	checked?: boolean
}
defineProps<CardRadioProps>()
</script>
