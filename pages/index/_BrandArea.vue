<template>
	<div class="container flex gap-2 justify-center mt-2">
		<NuxtLink to="/" v-for="(item, index) in brandInfo?.data" :key="index">
			<NuxtImg :src="item.icon"></NuxtImg>
		</NuxtLink>
		
	</div>
</template>

<script setup lang="ts">
	import { getBrandListSSR } from '~/api/decorate'
	const { data: brandInfo } = await getBrandListSSR()
	
</script>
