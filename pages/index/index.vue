<template>
  <div>我是首页</div>
</template>
  
<script setup lang='ts'>
	useSeoMeta({
		title: '我是首页',
		description: '我是页面的描述',
		keywords: '关键词一，关键测人'
	})

  import { login } from '~/api/user'
	const { result, execute } = login('13728009642', 'zgl123')
	onMounted(() => {
		execute && execute()
	})
	const { publicConfig } = useSafeRuntimeConfig()
	console.info(publicConfig)
	
</script>
  