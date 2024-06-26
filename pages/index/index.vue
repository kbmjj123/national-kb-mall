<template>
  <div>我是首页</div>
</template>
  
<script setup lang='ts'>
  import { login } from '~/api/user'
	const { result, execute } = login('13728009642', 'zgl123')
	onMounted(() => {
		execute && execute()
	})
	const { publicConfig } = useSafeRuntimeConfig()
	console.info(publicConfig)
	
</script>
  