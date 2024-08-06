<template>
  <ClientOnly>
    <div
      class="flex gap-2"
      :class="['card' === mode ? 'flex-row' : 'flex-col']">
      <!-- 以下是待上传的文件列表 -->
      <template v-if="selectedFiles && selectedFiles.length > 0">
        <template v-if="'card' === mode">
          <!-- 卡片形式的视图 -->
          <ul class="inline-flex flex-row gap-2">
            <li
              :class="[
                'group relative hover:cursor-pointer',
                CARD_ITEM_SIZE_MAP[size],
              ]"
              v-for="(item, index) in selectedFiles"
              :key="index">
              <NuxtImg
                :src="item.preview"
                class="w-full h-full rounded-md"
                v-if="isImage"></NuxtImg>
              <UIcon v-else></UIcon>
              <!-- 图片操作 -->
              <div
                class="group-hover:flex hidden flex-row items-center justify-center gap-3 absolute left-0 top-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)]">
                <UIcon
                  name="i-ri-eye-line"
                  v-if="isImage"
                  @click="onBrowse(index)"></UIcon>
                <UIcon
                  name="i-ri-download-2-fill"
                  v-if="isCanDownload"
                  @click="onDownload(index)"></UIcon>
              </div>

              <UIcon
                class="absolute z-10 top-[-5px] right-[-5px] text-primary"
                name="i-ri-close-circle-fill"
                @click="onDelete(index)"
                v-if="isEditable"></UIcon>
            </li>
          </ul>
        </template>
        <template v-else-if="'list' === mode">
          <!-- 列表形式的视图 -->
          <ul class="flex flex-col gap-2 p-2 w-full">
            <li
              class="flex flex-row items-center hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50"
              v-for="(item, index) in selectedFiles"
              :key="index">
              <div class="flex flex-row gap-2 flex-[2]">
                <NuxtImg
                  :src="item.preview"
                  class="rounded-sm w-[40px] h-[40px]"
                  v-if="isImage"></NuxtImg>
                <UIcon v-else></UIcon>
                <div>
                  <div>{{ item.name }}</div>
                  <div>{{ item.size }}</div>
                </div>
              </div>
              <div class="flex flex-row gap-2 flex-1">
                <UButton
                  icon="i-ri-eye-line"
                  variant="link"
									color="gray"
									size="xs"
                  :label="$t('upload.preview')"
                  @click="onBrowse(index)"></UButton>
                <UButton
                  icon="i-ri-download-2-fill"
                  v-if="isCanDownload"
									color="gray"
									size="xs"
                  variant="link"
                  :label="$t('upload.download')"
                  @click="onDownload(index)"></UButton>
                <UButton
                  icon="i-ri-close-circle-fill"
                  @click="onDelete(index)"
									size="xs"
                  variant="link"
                  v-if="isEditable"
                  :label="$t('upload.delete')"></UButton>
              </div>
            </li>
          </ul>
        </template>
      </template>
      <!-- 以下是待操作的选择文件上传视图 -->
      <div class="relative inline-block">
        <label
          for="fileInput"
          v-if="'card' === mode"
          class="border border-solid rounded-md border-gray-50 flex justify-center items-center"
          :class="[CARD_ITEM_SIZE_MAP[size]]">
          <UIcon name="i-heroicons-camera-16-solid"></UIcon>
        </label>
        <label
          v-else
          for="fileInput"
          class="relative z-10 rounded-md inline-block px-4 py-2 bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-400 hover:bg-gray-400 hover:cursor-pointer"
          >{{ $t('upload.choose') }}</label
        >
        <input
          id="fileInput"
          ref="input"
          class="absolute z-1 left-0 right-0 top-0 bottom-0 opacity-0 cursor-pointer"
          type="file"
          :accept="accept"
          multiple
          @change="onHandleFileChange" />
        <slot></slot>
      </div>
    </div>
  </ClientOnly>
  
</template>

<script setup lang="ts">
	import { api as viewApi } from 'v-viewer'
  import { uploadFiles, type FileType } from '~/api/resources'
  const toast = useToast()
  const { t } = useI18n()

  // 配置的仅支持图标浏览
  const ONLY_PREVIEW_ICON_MAP = {
    word: 'i-ri-file-word-2-line',
    ppt: 'i-ri-file-ppt-2-line',
    excel: 'i-ri-file-excel-2-line',
    pdf: 'i-ri-file-pdf-2-line',
  }
  // 所支持的文件枚举类型清单
  type SupportFileType =
    | 'image'
    | 'office'
    | 'png'
    | 'jpg'
    | 'jpeg'
    | 'txt'
    | 'pdf'
    | 'audit'
    | 'video'
    | 'doc'
    | 'ppt'
    | 'excel'

  export type Props = {
    format?: SupportFileType | SupportFileType[] // 所支持的文件类型
    isDragable?: boolean // 是否支持选择文件拖动
    isAutoUpload?: boolean // 是否自动上传文件
    isCanDownload?: boolean // 已上传的文件是否支持下载功能
    isCanPreview?: boolean // 是否可以预览-->将采用v-viewer来预览
    isEditable?: boolean // 是否可以编辑-->也就是是否可以删除动作
    isAutoGenerateName?: boolean // 是否自动生成上传的文件名称
    mode?: 'card' | 'list' // 展示形式，card代表的卡片形式，list代表的列表形式
    businessPath?: string // 支持用户配置的业务路径配置，默认是根目录
    action?: string // 配置的上传文件的action
    headers?: Record<string, string> // 配置的上传文件时所对应的自定义请求头
    objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' // 配置的图片文件填充方式
    maxSize?: number // 限制的可上传的文件大小，单位kb
    data?: Record<string, any> // 上传文件时的额外参数
    size?: 'xs' | 'md' | 'lg' | 'xl' | '2xl' // 视图的大小尺寸
  }
  const CARD_ITEM_SIZE_MAP: Record<string, string> = {
    xs: 'w-[58px] h-[58px]',
    md: 'w-[80px] h-[80px]',
    lg: 'x-[100px] h-[100px]',
    xl: 'x-[120px] h-[120px]',
    '2xl': 'x-[150px] h-[150px]',
  }
  const File_MAP: Record<string, string> = {
    image: 'image/*',
    office: 'application/*',
    txt: 'text/plain',
    pdf: 'application/pdf',
    audit: 'audio/*',
    video: 'video/*',
    doc: '.doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ppt: '.ppt, .pptx, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation',
    excel:
      '.xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  }
  const props = withDefaults(defineProps<Props>(), {
    format: 'image',
    maxSize: 5 * 1024,
    mode: 'card',
    size: 'xs',
  })

  const emits = defineEmits<{
    'on-before-upload': []
    'on-uploading': []
    'on-upload-success': []
    'on-upload-failed': []
    'on-upload-file-success': []
    'on-upload-file-failed': []
    'on-preview': []
    'on-remove': []
  }>()
  const selectedFiles = ref<Array<FileType>>([])

  const accept = computed(() => {
    if (typeof props.format === 'string') {
      return File_MAP[props.format]
    } else {
      return props.format.toString()
    }
  })
	
  // 资源是否为图片格式
  const isImage = computed(() => {
    if (typeof props.format === 'string') {
      return ['image', 'jpeg', 'jpg', 'png'].includes(props.format)
    } else {
      const supplorList = props.format as SupportFileType[]
      return (
        supplorList.includes('image') ||
        supplorList.includes('jpeg') ||
        supplorList.includes('jpg') ||
        supplorList.includes('png')
      )
    }
  })
	// 非图片资源的仅展示一图标logo
	const onlyIcon = (item: FileType) => {
		
	}
  // 选择文件后的动作
  const onHandleFileChange = (event: any) => {
    const files = Array.from(event.target.files) as File[]
    if (files.length > 0) {
      files.forEach((item) => {
        const fileInfo: FileType = {
          name: item.name,
          size: (item.size / 1024).toFixed(2) + 'KB',
          type: item.type,
          preview: '',
          file: item,
        }
        if (item.type.startsWith('image/')) {
          const reader = new FileReader()
          reader.onload = (e) => {
            //@ts-ignore
            fileInfo.preview = e.target?.result
            selectedFiles.value.push(fileInfo)
          }
          reader.readAsDataURL(item)
        } else {
          selectedFiles.value.push(fileInfo)
        }
      })
    }
  }
  // 预览资源
  const onBrowse = (index: number) => {
		viewApi({
			options: {
				toolbar: true,
				url: 'preview',
				initialViewIndex: index
			},
			images: selectedFiles.value
		})
	}
  // 下载资源
  const onDownload = (index: number) => {
    const targetItem = selectedFiles.value[index]
    if (targetItem.url) {
      const element = document.createElement('a')
      if (targetItem.type.startsWith('image') || targetItem.type === 'blob') {
        fetch(targetItem.url)
          .then((res) => res.blob())
          .then((blob) => {
            const blobUrl = URL.createObjectURL(blob)
            element.href = blobUrl
            element.download = '' // 文件名称
            document.body.appendChild(element)
            element.click()
            document.removeChild(element)
            URL.revokeObjectURL(blobUrl) // 释放内存
          })
      } else {
        // 其他类型则直接使用URL
        element.href = targetItem.url
        element.download = '' // 文件名称
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
      }
    }
  }
  // 删除资源
  const onDelete = (index: number) => {
    selectedFiles.value.splice(index, 1)
  }
  const { isLoading, execute: uploadFilesAction } = useLoading(uploadFiles)
  //! 最终的上传文件动作
  const finalUploadAction = () => {
    if (!selectedFiles.value.length) {
      toast.add({
        title: t('resources.selectFileEmptyTip'),
        id: 'modal-empty-tip',
      })
      return
    }
    const formData = new FormData()
    selectedFiles.value.forEach((item) => {
      item.file && formData.append('files', item.file)
    })
    uploadFilesAction && uploadFilesAction(formData)
  }
</script>
