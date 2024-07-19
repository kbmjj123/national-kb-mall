<template>
  <div :style="{'backgroundImage': 'url(' + currentBg + ')'}" class="py-8 bg-opacity-10 w-full">
    <UCarousel
			ref="carouselRef"
      v-slot="{ item }"
      :items="carouselList"
      :ui="{ item: 'basis-full' }"
			indicators
      class="overflow-hidden">
      <article class="container flex items-center justify-between" draggable="false">
        <div>
					<h3 class="text-2xl">{{ item.title }}</h3>
					<h4 class="text-lg">{{ item.description }}</h4>
					<h6>{{ item.detail }}</h6>
				</div>
				<img :src="item.cover" class="md:w-80 sm:w-48">
      </article>
    </UCarousel>
  </div>
</template>

<script setup lang="ts">
  import { type CarouselType, getCarouselList } from '~/api/decorate'

	const carouselRef = ref()
  const carouselList = ref<Array<CarouselType>>([])
	let res = await getCarouselList()
	carouselList.value = res.data

	const currentBg = computed(() => {
		if(carouselRef.value){
			const currentIndex = carouselRef.value.page
			return carouselList.value[currentIndex].bgImage
		}
		return ''
	})

</script>
