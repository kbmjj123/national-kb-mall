<template>
  <ClientOnly>
    <p class="flex flex-row justify-between gap-3">
      <UButton
				:icon="isInWishList.data ? 'i-ri-heart-3-fill' : 'i-ri-heart-3-line'"
        :label="isInWishList.data ? $t('product.addToWishlist') : $t('product.removeFromWishlist')"
        size="2xs"
				:color="isInWishList.data ? 'primary' : 'gray'"
				:loading="isLoading"
        variant="link"
        @click="() => execute(slug)"></UButton>
      <slot></slot>
    </p>
  </ClientOnly>
</template>

<script setup lang="ts">
  import { addToWishList, checkIfInWishList } from '~/api/wishlist'
  const props = defineProps<{
    slug: string
  }>()
	const { isLoading, execute } = useLoading(addToWishList)
	const { data: isInWishList, execute: checkIfInWishListAction } = useLoading(checkIfInWishList)
	onMounted(() => {
		checkIfInWishListAction && checkIfInWishListAction(props.slug)
	})

</script>
