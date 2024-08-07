<template>
  <ClientOnly>
    <p class="flex flex-row gap-3">
      <UButton
        :label="$t('product.addToWishlist')"
        size="2xs"
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
