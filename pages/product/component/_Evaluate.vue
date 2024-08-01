<template>
  <ClientOnly>
    <div class="flex flex-col gap-20 md:flex-row">
      <!-- 评价主视图 -->
      <div class="flex flex-col gap-4 sm:w-full md:w-[35%]">
        <h2>{{ $t('product.customerReviews') }}</h2>
        <div>
          <Rating></Rating>
          <span>{{ $t('product.reviewsNum', { num: 5 }) }}</span>
        </div>
        <div
          class="flex flex-row items-center gap-2"
          v-for="(item, index) in 5"
          :key="index">
          <span>{{ 5 - index }}✨</span>
          <UProgress size="lg" :value="100 - index * 10"></UProgress>
        </div>
        <h2>{{ $t('product.shareYourThoughts') }}</h2>
        <p>{{ $t('product.shareThoughtsDesc') }}</p>
        <UButton
          block
          color="gray"
          @click="isShowPublishEvaluateFlag = !isShowPublishEvaluateFlag"
          size="lg"
          :label="$t('product.writeAReview')"></UButton>
        <Transition name="fade" v-if="isShowPublishEvaluateFlag">
          <PublishEvaluate :slug="productInfo?.slug"></PublishEvaluate>
        </Transition>
      </div>
      <!-- 评价cell列表 -->
      <div class="flex-1">
        <EvaluateCell
          :evaluate-list="evaluateList?.data?.list"
          :is-loading="isLoading"></EvaluateCell>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
  import EvaluateCell from './_EvaluateCell.vue'
  import PublishEvaluate from './_PublishEvaluate.vue'
  import {
    type ProductInfoType,
    getEvaluateList,
    publishEvaluate,
  } from '~/api/product'
  const isShowPublishEvaluateFlag = ref(false)
  const props = defineProps<{
    productInfo: ProductInfoType
  }>()
  const params = reactive({
    pageIndex: 1,
    pageSize: 20,
    total: 0,
  })
  const {
    isLoading,
    execute,
    data: evaluateList,
  } = useLoading(() => getEvaluateList(props.productInfo?.slug, params))
  onMounted(() => {
    execute && execute()
  })
</script>
