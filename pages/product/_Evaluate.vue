<template>
	<div>
		评价组件
	</div>
</template>

<script setup lang="ts">
import type { ProductInfoType } from '~/api/product'
defineProps<{
	productInfo?: ProductInfoType
}>()
</script>
