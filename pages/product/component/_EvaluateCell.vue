<template>
  <AsyncDataWrapper :isLoading="isLoading">
		<template #loading>
			<SkeletonList></SkeletonList>
		</template>
    <ul class="flex flex-col gap-10">
      <li v-for="(item, index) in evaluateList" :key="index" class="flex flex-col gap-4 pb-4 border-b border-solid border-gray-200 dark:border-gray-500">
        <div class="flex flex-row gap-3">
          <UAvatar size="xl" :src="item.avatar"></UAvatar>
          <section class="flex flex-col gap-1">
            <div class="flex flex-row">
              <h3>{{ item.userName }}</h3>
              <span>-{{ item.publishDate }}</span>
            </div>
            <Rating></Rating>
            <p>{{ item.title }}</p>
          </section>
        </div>
				<p v-if="item.content">{{ item.content }}</p>
				<!-- 评价图片 -->
				<ul v-if="item.imageList && item.imageList.length > 0" class="flex flex-row gap-2">
					<li v-for="(image, imgIndex) in item.imageList" :key=imgIndex>
						<NuxtImg lazy class="w-[60px] aspect-square" :src="image"></NuxtImg>
					</li>
				</ul>
      </li>
    </ul>
  </AsyncDataWrapper>
</template>

<script setup lang="ts">
  import type { EvaluateTtype } from '~/api/product'
  defineProps<{
    evaluateList: Array<EvaluateTtype>,
		isLoading: boolean
  }>()
</script>
