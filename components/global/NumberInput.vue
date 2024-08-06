<template>
  <div class="flex items-center p-2">
    <UButton
      icon="i-heroicons-minus-16-solid"
      color="gray"
      variant="ghost"
      @click="onClickMinus"></UButton>
    <UInput
      v-model="model"
      type="number"
      class="text-center w-10 border border-solid rounded-md border-gray-100"
      variant="none"></UInput>
    <UButton
      icon="i-heroicons-plus-16-solid"
      color="gray"
      variant="ghost"
      @click="onClickAdd"></UButton>
  </div>
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
