<template>
  <ClientOnly>
    <div>
      <!-- 以下是待上传的文件列表 -->
      <template v-if="selectedFiles && selectedFiles.length > 0">
        <template v-if="'card' === mode">
          <!-- 卡片形式的视图 -->
          <ul class="flex flex-row">
            <li
              :class="['group relative hover:cursor-pointer', CARD_ITEM_SIZE_MAP[size]]"
              v-for="(item, index) in selectedFiles"
              :key="index">
							<template v-if="item.preview">
								<NuxtImg :src="item.preview" class="w-full h-full" v-if="isImage"></NuxtImg>
								<UIcon v-else></UIcon>
							</template>
							<!-- 上传图片的进度条 -->
							<UProgress v-else size="md" animation="carousel" class=""></UProgress>
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
                class="absolute top-0 right-[-5px]"
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
              <div class="flex flex-row gap-2 flex-1">
                <NuxtImg
                  :src="item.preview"
									class="rounded-sm w-[40px] h-[40px]"
                  v-if="isImage"></NuxtImg>
                <UIcon v-else></UIcon>
                <p>
									<div>{{ item.name }}</div>
									<div>{{ item.size }}</div>
								</p>
              </div>
              <div class="flex flex-col gap-2 flex-1">
                <UButton
                  icon="i-ri-eye-line"
                  variant="link"
                  :label="$t('upload.preview')"
                  @click="onBrowse(index)"></UButton>
                <UButton
                  icon="i-ri-download-2-fill"
                  v-if="isCanDownload"
                  variant="link"
                  :label="$t('upload.download')"
                  @click="onDownload(index)"></UButton>
                <UButton
                  icon="i-ri-close-circle-fill"
                  @click="onDelete(index)"
                  variant="link"
                  v-if="isEditable"
                  :label="$t('upload.delete')"></UButton>
              </div>
            </li>
          </ul>
        </template>
      </template>
      <UButton
        v-if="!isAutoUpload && selectedFiles.length > 0"
				color="gray"
        :loading="isLoading"
        @click="finalUploadAction"
        >{{ $t('resources.upload') }}</UButton
      >
      <!-- 以下是待操作的选择文件上传视图 -->
      <div class="relative">
        <input
          ref="input"
          type="file"
					class="hidden"
          :accept="accept"
          multiple
          @change="onHandleFileChange" />
        <slot></slot>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
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
  // 选择文件后的动作
  const onHandleFileChange = (event: any) => {
    const files = Array.from(event.target.files) as File[]
		if(files.length > 0){
			selectedFiles.value = files.map((item) => {
				const fileInfo: FileType = {
					name: item.name,
					size: (item.size / 1024).toFixed(2) + 'KB',
					type: item.type,
					preview: ''
				}
				if(item.type.startsWith('image/')){
					const reader = new FileReader()
					reader.onload = e => {
						//@ts-ignore
						fileInfo.preview = e.target?.result
					}
					reader.readAsDataURL(item)
				}
				return fileInfo
			})
		}else{
			selectedFiles.value = []
		}
  }
  // 预览资源
  const onBrowse = (index: number) => {}
  // 下载资源
  const onDownload = (index: number) => {}
  // 删除资源
  const onDelete = (index: number) => {}
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
    selectedFiles.value.forEach((file) => {
      formData.append('files', file)
    })
    uploadFilesAction && uploadFilesAction(formData)
  }
</script>
