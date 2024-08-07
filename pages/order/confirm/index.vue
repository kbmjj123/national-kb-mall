<template>
	我是确认订单页面
	{{ waitToCheckoutList }}
</template>

<script setup lang="ts">
	const route = useRoute()
	const { productList } = route.query
	const waitToCheckoutList = JSON.parse(productList as string)

</script>