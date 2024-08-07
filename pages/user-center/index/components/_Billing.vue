<template>
  <AsyncDataWrapper
    :is-loading="isGettingBilling"
    loading-ui-mode="form"
    @on-retry="() => getBillingAction()">
    <template #loading>
      <SkeletonForm :form-item-lines="5"></SkeletonForm>
    </template>
    <UCard>
      <template #header>
        <div class="flex flex-row justify-between items-center">
          <h3 class="font-bold text-lg">
            {{ $t('userCenter.billing.title') }}
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
				v-if="billingForm"
        :state="billingForm.data"
        :schema="billingSchema"
        @submit="onSubmit">
        <UFormGroup :label="$t('userCenter.details.firstName')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.details.firstNamePlaceholder')"
            v-model="billingForm.data.firstName"
            variant="outline"></AppInput>
        </UFormGroup>
        <UFormGroup :label="$t('userCenter.details.lastName')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.details.lastNamePlaceholder')"
            v-model="billingForm.data.lastName"
            variant="outline"></AppInput>
        </UFormGroup>
        <UFormGroup :label="$t('userCenter.billing.phone')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.billing.phonePlaceholder')"
            v-model="billingForm.data.phone"
            variant="outline"></AppInput>
        </UFormGroup>
        <UFormGroup :label="$t('userCenter.billing.company')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.billing.companyPlaceholder')"
            v-model="billingForm.data.company"
            variant="outline"></AppInput>
        </UFormGroup>
        <UFormGroup :label="$t('userCenter.billing.address1')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.billing.address1Placeholder')"
            v-model="billingForm.data.address1"
            variant="outline"></AppInput>
        </UFormGroup>
        <UFormGroup :label="$t('userCenter.billing.address2')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.billing.address2Placeholder')"
            v-model="billingForm.data.address2"
            variant="outline"></AppInput>
        </UFormGroup>
        <UFormGroup :label="$t('userCenter.billing.city')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.billing.cityPlaceholder')"
            v-model="billingForm.data.city"
            variant="outline"></AppInput>
        </UFormGroup>
        <UFormGroup :label="$t('userCenter.billing.state')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.billing.statePlaceholder')"
            v-model="billingForm.data.state"
            variant="outline"></AppInput>
        </UFormGroup>
        <UFormGroup :label="$t('userCenter.billing.country')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.billing.countryPlaceholder')"
            v-model="billingForm.data.country"
            variant="outline"></AppInput>
        </UFormGroup>
        <UFormGroup :label="$t('userCenter.billing.zip')">
          <AppInput
            is-clearable
            size="xl"
            :placeholder="$t('userCenter.billing.zipPlaceholder')"
            v-model="billingForm.data.zip"
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
            v-model="billingForm.data.email"
            variant="outline"></AppInput>
        </UFormGroup>
      </UForm>
    </UCard>
  </AsyncDataWrapper>
</template>

<script lang="ts" setup>
  import { z } from 'zod'
  import type { FormSubmitEvent } from '#ui/types'
  import { getBillingInfo, modifyBillingInfo } from '~/api/user'

  const billingSchema = z.object({
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
  type BillingType = z.output<typeof billingSchema>
  // const billingForm = reactive({
  //   firstName: '',
  //   lastName: '',
  //   phone: '',
  //   company: '',
  //   address1: '',
  //   address2: '',
  //   city: '',
  //   state: '',
  //   country: '',
  //   zip: '',
  //   email: '',
  // })
  const {
    data: billingForm,
    isLoading: isGettingBilling,
    execute: getBillingAction,
  } = useLoading(getBillingInfo)

  const { isLoading: isModifying, execute: modifyBillingAction } =
    useLoading(modifyBillingInfo)
  const onSubmit = (event: FormSubmitEvent<BillingType>) => {
    modifyBillingAction && modifyBillingAction(billingForm)
  }
  onMounted(() => {
    getBillingAction && getBillingAction()
  })
</script>

<style scoped></style>
