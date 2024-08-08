<template>
  <div class="bg-opacity-10 w-full">
    <UCarousel
			ref="carouselRef"
      v-slot="{ item }"
      :items="carouselInfo?.data || []"
      :ui="{ item: 'basis-full', indicators: { active: 'bg-gray-500 dark:bg-gray-400' } }"
			indicators
      class="overflow-hidden">
      <article class="relative flex items-center w-full h-[420px] lg:h-[560px] xl:h-[640px]" draggable="false">
				<img class="z-0 absolute object-cover w-full h-[420px] lg:h-[560px] xl:h-[640px]" :src="item.cover">
        <div class="container z-10">
					<h3 class="text-3xl font-bold md:mb-4 md:text-4xl lg:text-6xl">{{ item.title }}</h3>
					<h4 class="text-lg font-bold md:mb-4 lg:text-3xl">{{ item.description }}</h4>
					<h6 class="max-w-sm mb-8 text-md font-light lg:max-w-md text-balance">{{ item.detail }}</h6>
					<UButton :label="$t('index.shopNow')" to="/product/xxx" target="_blank" color="black" size="xl"></UButton>
				</div>
      </article>
    </UCarousel>
  </div>
</template>

<script setup lang="ts">
  import { getCarouselListSSR } from '~/api/decorate'

	const carouselRef = ref()
	const { data: carouselInfo } = await getCarouselListSSR()

</script>
