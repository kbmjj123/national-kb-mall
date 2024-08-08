<template>
  <UButton
    icon="i-heroicons-plus-small"
    color="gray"
    variant="ghost"
		@click="showEditFlag = true"
    aria-label="Theme"></UButton>
	<UModal v-model="showEditFlag">
		<UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
			<template #header>
				<h3>{{ $t('userCenter.wishlist.editTitle') }}</h3>
			</template>
			<UForm>
				<UFormGroup :label="$t('userCenter.wishlist.belongGroup')">
					<USelect></USelect>
				</UFormGroup>
				<UFormGroup :label="$t('userCenter.wishlist.groupName')">
					<AppInput is-clearable :placeholder="$t('userCenter.wishlist.groupNameTip')"></AppInput>
				</UFormGroup>
				<UFormGroup :label="$t('userCenter.wishlist.recommendGroup')">
					<URadioGroup :options="groupOptions">

					</URadioGroup>
				</UFormGroup>
			</UForm>
			<template #footer>

			</template>
		</UCard>
	</UModal>
</template>

<script setup lang="ts">
	import { getRecommendGroupNameList, editWishListGroup } from '~/api/wishlist'
  const showEditFlag = ref(false)
	const { isLoading, execute, data: recommendGroupInfo } = useLoading(getRecommendGroupNameList)
	const groupOptions = computed(() => {
		return {}
	})
	watch(showEditFlag, (newVal: boolean) => {
		if(newVal){
			if(0 === recommendGroupInfo?.length){
				execute && execute()
			}
		}
	})
</script>
