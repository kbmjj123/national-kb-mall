<template>
	<UCard>
		<template #header>
      <div class="flex flex-row justify-between items-center">
        <h3 class="font-bold text-lg">
          {{ $t('order.confirm.paymentOptions') }}
        </h3>
      </div>
    </template>
		<UForm :state="payForm">
			<UFormGroup>
				
			</UFormGroup>
			<UFormGroup :label="$t('order.confirm.orderNode')">
				<UTextarea v-model="payForm.orderNote" variant="outline" :placeholder="$t('order.confirm.orderNoteTip')"></UTextarea>
			</UFormGroup>
		</UForm>
	</UCard>
</template>

<script setup lang="ts">
const payForm = reactive({
	payMethod: '',
	orderNote: ''
})
</script>
