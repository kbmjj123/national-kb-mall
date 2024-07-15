<template>
	<UModal>
		<UCard>
			<template #header>{{ title }}</template>
			<template #footer>
				
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
		}
	},
	setup(props){
		const { t } = useI18n()
		const title = props.title || t('modalTip.title')
		return {
			title
		}
	}
})
</script>
