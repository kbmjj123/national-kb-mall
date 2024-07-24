<template>
	我是商品详情页面{{ slug }}
</template>
<script setup lang="ts">
	const route = useRoute()
	const slug = route.params.slug as string
</script>