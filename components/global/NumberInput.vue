<template>
  <UButtonGroup size="sm" orientation="horizontal">
    <UButton
      icon="i-heroicons-minus-16-solid"
      color="white"
			size="xs"
      variant="ghost"
      @click="onClickMinus"></UButton>
    <UInput
      v-model="model"
      type="number"
			size="2xs"
      class="text-center w-16"
      variant="none"></UInput>
    <UButton
      icon="i-heroicons-plus-16-solid"
      color="white"
			size="xs"
      variant="ghost"
      @click="onClickAdd"></UButton>
  </UButtonGroup>
</template>

<script setup lang="ts">
  const model = defineModel({
    type: Number,
    default: 0,
  })
  const props = withDefaults(
    defineProps<{
      min?: number
      step?: number
      max?: number
    }>(),
    {
      min: 1,
      step: 1,
    }
  )
  const onClickMinus = () => {
    if (model.value === props.min) {
      return
    }
    model.value -= props.min
  }
  const onClickAdd = () => {
    if (model.value === props.max) {
      return
    }
    model.value += props.step
  }
</script>
