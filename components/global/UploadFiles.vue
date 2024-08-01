<template>
  <ClientOnly>
    <div class="flex flex-col items-center">
      <label
        for="file-input"
        class="cursor-pointer bg-[#007bff] text-white py-[10px] px-[20px] mb-[10px]">
        <input
          type="file"
          id="file-input"
          class="hidden"
					accept="image/png, image/jpeg"
          multiple
          @change="handleFileChange" />
        <span>Upload Files</span>
      </label>
      <div v-if="selectedFiles.length" class="flex flex-col items-center">
        <p>已选择的文件:</p>
        <ul>
          <li v-for="(file, index) in selectedFiles" :key="index">
            {{ file.name }}
          </li>
        </ul>
        <UButton :loading="isLoading" @click="finalUploadAction">{{ $t('resources.upload') }}</UButton>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
  import { uploadFiles } from '~/api/resources'
	const toast = useToast()
	const { t } = useI18n()
  const selectedFiles = ref([])

  const handleFileChange = (event: any) => {
    selectedFiles.value = Array.from(event.target.files)
  }
  const { isLoading, execute: uploadFilesAction } = useLoading(uploadFiles)
	const finalUploadAction = () => {
		if (!selectedFiles.value.length) {
      toast.add({ title: t('resources.selectFileEmptyTip'), id: 'modal-empty-tip' })
      return
    }
    const formData = new FormData()
    selectedFiles.value.forEach((file) => {
      formData.append('files', file)
    })
		uploadFilesAction && uploadFilesAction(formData)
	}
</script>
