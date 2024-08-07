<template>
  <ClientOnly>
    <div class="flex flex-row p-2 gap-2" ref="addToCarNode">
      <UInput class="flex-1" type="number" v-model="quantity"></UInput>
      <UButton
        color="black"
        :loading="isLoading"
        block
        class="flex-[3]"
        @click="onAddToCar"
        :label="$t('product.addToCart')"></UButton>
    </div>
  </ClientOnly>
  <div
    class="container flex-row p-2 gap-2 fixed left-0 right-0 bottom-0 z-10 bg-white"
    :class="[isAddToCarNodeVisible ? 'hidden' : 'flex']">
    <UInput class="flex-1" type="number" v-model="quantity"></UInput>
    <UButton
      color="black"
      :loading="isLoading"
      block
      class="flex-[3]"
      @click="onAddToCar"
      :label="$t('product.addToCart')"></UButton>
  </div>
</template>

<script setup lang="ts">
	import { useElementVisibility } from '@vueuse/core'
  import { addToShoppingCar } from '~/api/shoppingCar'
	const addToCarNode = ref(null)
	const isAddToCarNodeVisible = useElementVisibility(addToCarNode)
  const quantity = ref(1)
  const props = defineProps<{
    slug: string
  }>()

  const { isLoading, execute } = useLoading(addToShoppingCar)
  const onAddToCar = () => {
    execute &&
      execute({
        slug: props.slug,
        quantity: quantity.value,
      })
  }
</script>
