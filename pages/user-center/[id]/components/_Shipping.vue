<template>
  <AsyncDataWrapper
    :is-loading="isGettingShipping"
    loading-ui-mode="form"
    @on-retry="() => getShippingAction()">
    <template #loading>
      <SkeletonForm :form-item-lines="5"></SkeletonForm>
    </template>
    <UCard>
      <template #header>
        <div class="flex flex-row justify-between items-center">
          <h3 class="font-bold text-lg">
            {{ $t('userCenter.shipping.title') }}
          </h3>
          <UButton
            type="submit"
            color="gray"
            :loading="isModifying"
            :label="$t('userCenter.details.updateDetails')"></UButton>
        </div>
      </template>
      <UForm
        class="grid grid-cols-1 gap-3 md:grid-cols-2"
        v-if="shippingForm"
        :state="shippingForm.data"
        :schema="shippingFormSchema"
        @submit="onSubmit">
        <UFormGroup :label="$t('userCenter.details.firstName')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.details.firstNamePlaceholder')"
            v-model="shippingForm.data.firstName"
            variant="outline"></AppInput>
        </UFormGroup>
        <UFormGroup :label="$t('userCenter.details.lastName')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.details.lastNamePlaceholder')"
            v-model="shippingForm.data.lastName"
            variant="outline"></AppInput>
        </UFormGroup>
        <UFormGroup :label="$t('userCenter.billing.phone')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.billing.phonePlaceholder')"
            v-model="shippingForm.data.phone"
            variant="outline"></AppInput>
        </UFormGroup>
        <UFormGroup :label="$t('userCenter.billing.company')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.billing.companyPlaceholder')"
            v-model="shippingForm.data.company"
            variant="outline"></AppInput>
        </UFormGroup>
        <UFormGroup :label="$t('userCenter.billing.address1')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.billing.address1Placeholder')"
            v-model="shippingForm.data.address1"
            variant="outline"></AppInput>
        </UFormGroup>
        <UFormGroup :label="$t('userCenter.billing.address2')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.billing.address2Placeholder')"
            v-model="shippingForm.data.address2"
            variant="outline"></AppInput>
        </UFormGroup>
        <UFormGroup :label="$t('userCenter.billing.city')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.billing.cityPlaceholder')"
            v-model="shippingForm.data.city"
            variant="outline"></AppInput>
        </UFormGroup>
        <UFormGroup :label="$t('userCenter.billing.state')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.billing.statePlaceholder')"
            v-model="shippingForm.data.state"
            variant="outline"></AppInput>
        </UFormGroup>
        <UFormGroup :label="$t('userCenter.billing.country')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.billing.countryPlaceholder')"
            v-model="shippingForm.data.country"
            variant="outline"></AppInput>
        </UFormGroup>
        <UFormGroup :label="$t('userCenter.billing.zip')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.billing.zipPlaceholder')"
            v-model="shippingForm.data.zip"
            variant="outline"></AppInput>
        </UFormGroup>
        <!-- 最后的邮箱 -->
        <UFormGroup
          class="col-span-1 md:col-span-2"
          :label="$t('userCenter.details.email')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.details.emailPlaceholder')"
            v-model="shippingForm.data.email"
            variant="outline"></AppInput>
        </UFormGroup>
      </UForm>
    </UCard>
  </AsyncDataWrapper>
</template>

<script lang="ts" setup>
  import { z } from 'zod'
  import type { FormSubmitEvent } from '#ui/types'
  import { getShippingInfo, modifyShippingInfo } from '~/api/user'

  const shippingFormSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string(),
    company: z.string(),
    address1: z.string(),
    city: z.string(),
    address2: z.string(),
    state: z.string(),
    country: z.string(),
    zip: z.string(),
    email: z.string().email(),
  })
  type ShippingType = z.output<typeof shippingFormSchema>
  
  const {
    data: shippingForm,
    isLoading: isGettingShipping,
    execute: getShippingAction,
  } = useLoading(getShippingInfo)

  const { isLoading: isModifying, execute: modifyBillingAction } =
    useLoading(modifyShippingInfo)
  const onSubmit = (event: FormSubmitEvent<ShippingType>) => {
    modifyBillingAction && modifyBillingAction(shippingForm)
  }
  onMounted(() => {
    getShippingAction && getShippingAction()
  })
</script>
