<template>
  <UInput
    v-model="modalValue"
    autocomplete="off"
    :ui="{ icon: { trailing: { pointer: '' } } }"
    v-bind="finalAttrs"
		:type="inputType"
		>
    <template #leading v-if="$slots.leading">
      <slot name="leading"></slot>
    </template>
    <template #trailing>
      <span class="flex flex-row gap-x-1">
        <UButton
          v-if="isToggleType"
          color="gray"
          variant="link"
          :icon="'text' === inputType ? 'i-heroicons-eye-slash' :'i-heroicons-eye'"
          :padded="false" 
					@click="onToggleType"/>

        <UButton
          v-if="isClearable"
					v-show="modalValue && modalValue.length > 0"
          color="gray"
          variant="link"
					@click="modalValue = ''"
          icon="i-heroicons-x-mark-20-solid"
          :padded="false" />
        <slot name="trailing"></slot>
      </span>
    </template>
  </UInput>
</template>

<script setup lang="ts">
  type InputType = {
    isClearable?: boolean
    isToggleType?: boolean
  }
  withDefaults(defineProps<InputType>(), {
    isClearable: false,
    isToggleType: false,
  })
  const modalValue = defineModel({
    type: String,
  })
	let { type = 'text', ...finalAttrs } = useAttrs() // 获取在input中设置的类型(默认是text)
	const inputType = ref(type)
	
	const onToggleType = () => {
		if('text' === inputType.value){
			inputType.value = 'password'
		} else {
			inputType.value = 'text'
		}
	}
</script>
