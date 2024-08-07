<template>
  <ClientOnly>
    <p class="flex flex-row justify-between gap-3">
      <UButton
				:icon="isInWishList ? 'i-ri-heart-3-fill' : 'i-ri-heart-3-line'"
        :label="isInWishList ? $t('product.addToWishlist') : $t('product.removeFromWishlist')"
        size="2xs"
				:color="isInWishList ? 'primary' : 'gray'"
				:loading="isLoading"
        variant="link"
        @click="() => execute(slug)"></UButton>
      <slot></slot>
    </p>
  </ClientOnly>
</template>

<script setup lang="ts">
  import { addToWishList } from '~/api/wishlist'
  const props = defineProps<{
    slug: string,
		isInWishList?: boolean
  }>()
	const { isLoading, execute } = useLoading(addToWishList)

</script>
