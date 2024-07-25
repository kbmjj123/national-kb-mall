<template>
	<AppHeader ref="appHeader"></AppHeader>
	<div class="bg-[#F2F3F5] dark:bg-gray-900 pb-4 content-body flex flex-col">
		<slot></slot>
	</div>
	<AppFooter ref="appFooter"></AppFooter>
</template>

<script setup lang="ts">
import { useWindowSize, tryOnMounted } from '@vueuse/core'
const appHeader = ref()
const appFooter = ref()
const minContentHeight = ref('')
tryOnMounted(() => {
	const { height } = useWindowSize()
	let headHeight = 0, footHeight = 0
	if(appHeader.value){
		headHeight = appHeader.value.$el.offsetHeight
	}
	if(appFooter.value){
		footHeight = appFooter.value.$el.offsetHeight
	}
	minContentHeight.value = `${height.value - headHeight - footHeight}px`
})

</script>

<style scoped>
.content-body{
	min-height: v-bind(minContentHeight);
}
</style>