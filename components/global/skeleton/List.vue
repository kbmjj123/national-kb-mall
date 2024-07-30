<template>
	<ul class="flex flex-col gap-4">
		<li v-for="(item, index) in 10" :key="index" class="flex flex-row gap-3">
			<USkeleton class="rounded-full w-20 h-20"></USkeleton>
			<div class="flex flex-col gap-2">
				<USkeleton class="w-full h-5"</USkeleton>
				<USkeleton class="w-6/12 h-3"></USkeleton>
				<USkeleton class="w-6/12 h-3"></USkeleton>
			</div>
		</li>
	</ul>
</template>

<script setup lang="ts">

</script>