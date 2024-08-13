<template>
	<UCard>
    <template #header>
      <div class="flex flex-row justify-between items-center">
        <h3 class="font-bold text-lg">
          {{ $t('order.confirm.selectShippingMethod') }}
        </h3>
      </div>
    </template>
    <UForm :state="shippingForm" class="grid grid-cols-1 gap-3 md:grid-cols-2">
      <UFormGroup>
        <CardRadioButton v-for="(item, index) in shippingList" :key="index" v-bind="item"></CardRadioButton>
      </UFormGroup>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
const { t } = useI18n()
const shippingForm = reactive({
	shippingMethod: ''
})
const shippingList = ref([
	{
		type: 'normal-shipping',
		desc: t('order.confirm.standardShipping'),
		checked: true,
		title: `${t('money')}10.00`
	},
	{
		type: 'express-shipping',
		desc: t('order.confirm.expressShipping'),
		checked: false,
		title: `${t('money')}25.00`
	}
])
</script>
