<template>
	<div v-html="productInfo?.detailContent"></div>
</template>

<script setup lang="ts">
import type { ProductInfoType } from '~/api/product'
defineProps<{
	productInfo?: ProductInfoType
}>()
</script>
