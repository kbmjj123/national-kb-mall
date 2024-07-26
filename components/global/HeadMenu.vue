<template>
  <ul :class="['vertical' === mode ? 'flex flex-col' : 'flex-row hidden lg:flex']">
    <li
      v-for="(item, index) in menuList"
      :key="index"
      :class="[
        'px-4',
        'hover:cursor-pointer',
        'menu-item',
        'vertical' === mode ? 'py-4 gap-y-3' : 'gap-x-2',
      ]">
      <NuxtLink>
        {{ item }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
	const { locale } = useI18n()
  withDefaults(
    defineProps<{
      mode?: 'vertical' | 'horizontal'
    }>(),
    {
      mode: 'vertical',
    }
  )

  const menuList = computed(() => {
    const nuxtApp = useNuxtApp()
    const targetMsg = nuxtApp.$i18n.messages.value
    // @ts-ignore
    return targetMsg[locale.value]['menu']
  })
</script>

<style>
  .menu-item:hover {
    text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.7);
  }
  .dark .menu-item:hover {
    text-shadow: 1px 1px 6px rgba(255, 255, 255, 0.7);
  }
</style>
