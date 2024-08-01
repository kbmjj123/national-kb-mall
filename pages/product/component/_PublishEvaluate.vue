<template>
  <UForm
    class="rounded-2xl p-4 border border-solid border-gray-300 flex flex-col gap-4"
    :state="reviewsForm">
    <p>{{ $t('product.reviewsTip') }}</p>
    <Rating></Rating>
    <UFormGroup :label="$t('product.yourExperience')">
      <UTextarea v-model="reviewsForm.content" resize></UTextarea>
    </UFormGroup>
    <UFormGroup v-model="reviewsForm.email" :label="$t('product.yourEmail')">
      <AppInput></AppInput>
    </UFormGroup>
		<UFormGroup :label="$t('product.reviewsPic')">
			<UploadFiles></UploadFiles>
		</UFormGroup>
    <UButton
      block
      :loading="isLoading"
      @click="onSubmitReview"
      :label="$t('product.submit')"></UButton>
  </UForm>
</template>

<script setup lang="ts">
  import { type EvaluateTtype, publishEvaluate } from '~/api/product'

  const props = defineProps<{
    slug: string
  }>()

  const reviewsForm = reactive({
    title: '',
    content: '',
    email: '',
    score: 5,
    imageList: [],
  })

  const { isLoading, execute } = useLoading(() =>
    publishEvaluate(props.slug, reviewsForm)
  )

  const onSubmitReview = () => {
    execute && execute(props.slug, reviewsForm)
  }
</script>
