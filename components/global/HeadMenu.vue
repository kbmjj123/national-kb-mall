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
      <NuxtLink :to="item.link" :target="item.target">
        {{ item.title }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
	const { t } = useI18n()
  withDefaults(
    defineProps<{
      mode?: 'vertical' | 'horizontal'
    }>(),
    {
      mode: 'vertical',
    }
  )

  const menuList = computed(() => {
		const { config } = useSafeAppConfig()
		let headerLinks = config.headerLinks.map(item => ({
			...item,
			title: t(`header.${item.key}`)
		}))
    return headerLinks
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
