<template>
	<UModal>
		<UCard :ui="{footer: { padding: 'p-0 sm:px-0' }}">
			<template #header><span class="font-bold">{{ title }}</span></template>
			{{ content }}
			<template #footer>
				<div class="flex">
					<div @click="onOk" class="flex-1 py-4 text-center cursor-pointer rounded-bl-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600">{{ cancelTxt }}</div>
					<div class="w-[1px] h-auto bg-gray-300 dark:bg-gray-800"></div>
					<div @click="onCancel" class="flex-1 py-4 text-center font-bold rounded-br-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">{{ okTxt }}</div>
				</div>
			</template>
		</UCard>
	</UModal>
</template>

<script lang="ts">
export default defineComponent({
	props: {
		title: {
			type: String,
			default: ''
		},
		okTxt: {
			type: String,
			default: ''
		},
		cancelTxt: {
			type: String,
			default: ''
		},
		content: {
			type: String,
			default: ''
		}
	},
	setup(props, { emit }){
		const modal = useModal()
		const { t } = useI18n()
		const title = props.title || t('modalTip.title')
		const okTxt = props.okTxt || t('modalTip.okTxt')
		const cancelTxt = props.cancelTxt || t('modalTip.cancelTxt')
		const content = props.content
		const onCancel = () => {
			modal.close()
			emit('onCancel')
		}
		const onOk = () => {
			modal.close()
			emit('onOk')
		}
		return {
			title,
			okTxt,
			cancelTxt,
			content,
			onOk,
			onCancel
		}
	}
})
</script>
