<template>
  <UCard>
    <h3 class="font-bold text-lg mb-3">{{ $t('userCenter.details.personalInformation') }}</h3>
    <UForm>
      <UFormGroup :label="$t('userCenter.details.firstName')" required>
        <AppInput
          is-clearable
          size="xl"
          :placeholder="$t('userCenter.details.firstNamePlaceholder')"
          v-model="userInfoForm.firstName"
          variant="outline"></AppInput>
      </UFormGroup>
			<UFormGroup :label="$t('userCenter.details.lastName')" required class="my-3">
        <AppInput
          is-clearable
          size="xl"
          :placeholder="$t('userCenter.details.lastNamePlaceholder')"
          v-model="userInfoForm.lastName"
          variant="outline"></AppInput>
      </UFormGroup>
			<UFormGroup :label="$t('userCenter.details.email')" required>
        <AppInput
          is-clearable
          size="xl"
          :placeholder="$t('userCenter.details.emailPlaceholder')"
          v-model="userInfoForm.email"
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
  const userInfoForm = reactive({
    firstName: '',
    lastName: '',
    email: '',
  })
</script>
