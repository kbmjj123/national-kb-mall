<template>
	<div class="file-uploads">
		<label for="file-input">
			<input
				type="file"
				id="file-input"
				class="file-input"
				@change="onHandleFileChange"
			/>
		</label>
		<div v-if="selectedFile" class="file-info">
			<p>选中的文件：{{ selectedFile.name }}</p>
			<button @click="onUploadFile">上传</button>
		</div>
	</div>
</template>

<script setup lang="ts">

const selectedFile = ref(null)
const onUploadFile = () => {
	if(!selectedFile.value){

	}
}
const onHandleFileChange = (event) => {
	selectedFile.value = event.target.files[0]
}
</script>
