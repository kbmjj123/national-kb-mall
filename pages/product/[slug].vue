<template>
	<UBreadcrumb :links="[{ label: 'Home', to: '/' }, { label: 'Navigation' }, { label: 'Breadcrumb' }]" />
	我是商品详情页面{{ slug }}
	<keep-alive>
		<component :is="activeTab"></component>
	</keep-alive>
</template>
<script setup lang="ts">
	import Description from './_Description.vue'
	import Evaluate from './_Evaluate.vue'
	const activeTab = Description
	
	const route = useRoute()
	const slug = route.params.slug as string
</script>