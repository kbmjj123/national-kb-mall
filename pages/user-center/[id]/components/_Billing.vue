<template>
  <UCard>
    <h3 class="font-bold text-lg mb-3">
      {{ $t('userCenter.billing.title') }}
    </h3>
    <UForm class="grid grid-cols-1 gap-3 md:grid-cols-2">
      <UFormGroup :label="$t('userCenter.details.firstName')">
        <AppInput
          is-clearable
          size="xl"
          :placeholder="$t('userCenter.details.firstNamePlaceholder')"
          v-model="billingForm.firstName"
          variant="outline"></AppInput>
      </UFormGroup>
      <UFormGroup :label="$t('userCenter.details.lastName')">
        <AppInput
          is-clearable
          size="xl"
          :placeholder="$t('userCenter.details.lastNamePlaceholder')"
          v-model="billingForm.lastName"
          variant="outline"></AppInput>
      </UFormGroup>
      <UFormGroup class="col-span-2" :label="$t('userCenter.details.email')">
        <AppInput
          is-clearable
          size="xl"
          :placeholder="$t('userCenter.details.emailPlaceholder')"
          v-model="billingForm.email"
          variant="outline"></AppInput>
      </UFormGroup>
    </UForm>
    <template #footer>
      <div class="text-right">
        <UButton :label="$t('userCenter.details.updateDetails')"></UButton>
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
  const billingForm = reactive({
    firstName: '',
    lastName: '',
    phone: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    email: '',
  })
</script>

<style scoped>
</style>